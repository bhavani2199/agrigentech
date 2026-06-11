'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, getAllProducts, updateProductPrice, Product } from '@/lib/supabase/client';
import { LogOut, FileDown, Check, Loader2, Leaf } from 'lucide-react';

type SaveState = 'idle' | 'saving' | 'saved' | 'error';

interface PriceRow extends Product {
  draftPrice: string;
  saveState: SaveState;
}

function formatDate(iso: string | null) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('en-MY', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [tab, setTab] = useState<'vegetables' | 'flowers'>('vegetables');
  const [rows, setRows] = useState<PriceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [exportLoading, setExportLoading] = useState(false);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const products = await getAllProducts();
      setRows(products.map(p => ({
        ...p,
        draftPrice: p.price !== null ? String(p.price) : '',
        saveState: 'idle',
      })));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.replace('/admin/login');
      else loadProducts();
    });
  }, [loadProducts, router]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.replace('/admin/login');
  }

  function setDraftPrice(id: string, value: string) {
    setRows(prev => prev.map(r => r.id === id ? { ...r, draftPrice: value } : r));
  }

  async function handleSave(id: string) {
    const row = rows.find(r => r.id === id);
    if (!row) return;
    const parsed = parseFloat(row.draftPrice);
    if (isNaN(parsed) || parsed < 0) {
      setRows(prev => prev.map(r => r.id === id ? { ...r, saveState: 'error' } : r));
      setTimeout(() => setRows(prev => prev.map(r => r.id === id ? { ...r, saveState: 'idle' } : r)), 2000);
      return;
    }
    setRows(prev => prev.map(r => r.id === id ? { ...r, saveState: 'saving' } : r));
    try {
      await updateProductPrice(id, parsed, row.unit ?? 'per kg');
      const now = new Date().toISOString();
      setRows(prev => prev.map(r =>
        r.id === id
          ? { ...r, price: parsed, price_updated_at: now, saveState: 'saved' }
          : r
      ));
      setTimeout(() => setRows(prev => prev.map(r => r.id === id ? { ...r, saveState: 'idle' } : r)), 2000);
    } catch {
      setRows(prev => prev.map(r => r.id === id ? { ...r, saveState: 'error' } : r));
      setTimeout(() => setRows(prev => prev.map(r => r.id === id ? { ...r, saveState: 'idle' } : r)), 2000);
    }
  }

  async function handleExportPDF() {
    setExportLoading(true);
    try {
      const { default: jsPDF } = await import('jspdf');
      const doc = new jsPDF({ unit: 'mm', format: 'a4' });
      const pageW = doc.internal.pageSize.getWidth();
      const margin = 18;
      const colW = [90, 35, 35];
      let y = margin;

      // Header block
      doc.setFillColor(26, 58, 34);
      doc.rect(0, 0, pageW, 38, 'F');

      doc.setFont('times', 'bold');
      doc.setFontSize(20);
      doc.setTextColor(184, 134, 11);
      doc.text('AGRIGENTECH SDN BHD', pageW / 2, 14, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(200, 220, 200);
      doc.text('No.18, Jalan Sekolah Kampung Raja, 39010 Tanah Rata, Cameron Highlands, Pahang, Malaysia', pageW / 2, 21, { align: 'center' });
      doc.text('sales@agrigentechsdnbhd.com  |  +6010-255 2554', pageW / 2, 26.5, { align: 'center' });

      doc.setFontSize(10);
      doc.setTextColor(245, 240, 232);
      doc.setFont('helvetica', 'bold');
      doc.text('DAILY PRICE LIST', pageW / 2, 34, { align: 'center' });

      y = 46;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(80, 80, 80);
      doc.text(`Date: ${new Date().toLocaleDateString('en-MY', { day: '2-digit', month: 'long', year: 'numeric' })}`, margin, y);
      y += 8;

      const vegetables = rows.filter(r => r.category === 'vegetables');
      const flowers = rows.filter(r => r.category === 'flowers');

      const drawSection = (title: string, items: PriceRow[]) => {
        // Section heading
        doc.setFillColor(245, 240, 232);
        doc.rect(margin, y, pageW - margin * 2, 8, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(26, 58, 34);
        doc.text(title.toUpperCase(), margin + 3, y + 5.5);
        y += 10;

        // Table header
        doc.setFillColor(26, 58, 34);
        doc.rect(margin, y, pageW - margin * 2, 7, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(245, 240, 232);
        doc.text('Product Name', margin + 3, y + 4.8);
        doc.text('Unit', margin + colW[0] + 3, y + 4.8);
        doc.text('Price (RM)', margin + colW[0] + colW[1] + 3, y + 4.8);
        y += 8;

        items.forEach((item, i) => {
          if (y > 265) {
            doc.addPage();
            y = margin;
          }
          const bg = i % 2 === 0 ? [255, 255, 255] : [250, 248, 244];
          doc.setFillColor(bg[0], bg[1], bg[2]);
          doc.rect(margin, y, pageW - margin * 2, 6.5, 'F');
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8);
          doc.setTextColor(40, 40, 40);
          doc.text(item.name, margin + 3, y + 4.3);
          doc.text(item.unit ?? '—', margin + colW[0] + 3, y + 4.3);
          const priceText = item.price !== null ? `RM ${item.price.toFixed(2)}` : 'Not set';
          doc.setTextColor(item.price !== null ? 40 : 180, item.price !== null ? 40 : 40, item.price !== null ? 40 : 40);
          doc.text(priceText, margin + colW[0] + colW[1] + 3, y + 4.3);
          y += 6.5;
        });
        y += 6;
      }

      drawSection('Vegetables', vegetables);
      drawSection('Flowers', flowers);

      // Footer
      doc.setFontSize(7.5);
      doc.setTextColor(160, 160, 160);
      doc.setFont('helvetica', 'italic');
      doc.text('Prices are subject to change without prior notice.', pageW / 2, doc.internal.pageSize.getHeight() - 10, { align: 'center' });

      doc.save(`Agrigentech_Price_List_${new Date().toISOString().slice(0, 10)}.pdf`);
    } finally {
      setExportLoading(false);
    }
  }

  const displayed = rows.filter(r => r.category === tab);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f0e8' }}>
      {/* Top bar */}
      <header
        className="sticky top-0 z-40 flex items-center justify-between px-5 md:px-8 py-3.5"
        style={{ backgroundColor: '#1a3a22', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div className="flex items-center gap-2.5">
          <Leaf size={20} strokeWidth={1.75} color="#b8860b" />
          <span
            className="text-base font-semibold"
            style={{ fontFamily: 'var(--font-playfair), serif', color: '#f5f0e8', letterSpacing: '0.05em' }}
          >
            Agrigentech Admin
          </span>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-150 hover:bg-white/10"
          style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: 'rgba(245,240,232,0.7)' }}
        >
          <LogOut size={15} strokeWidth={1.75} />
          Sign Out
        </button>
      </header>

      <main className="mx-auto max-w-5xl px-4 md:px-8 py-8">
        {/* Page heading + export */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
          <div>
            <h1
              className="text-2xl md:text-3xl font-bold"
              style={{ fontFamily: 'var(--font-playfair), serif', color: '#1a3a22' }}
            >
              Daily Price Management
            </h1>
            <p
              className="mt-0.5 text-sm"
              style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: '#6b7c6e' }}
            >
              Update wholesale prices for today
            </p>
          </div>

          <button
            onClick={handleExportPDF}
            disabled={exportLoading || loading}
            className="flex items-center gap-2 self-start sm:self-auto rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-150 hover:brightness-110 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              backgroundColor: '#b8860b',
              color: '#fff',
              fontFamily: 'var(--font-dm-sans), sans-serif',
              boxShadow: '0 2px 12px rgba(184,134,11,0.3)',
            }}
          >
            {exportLoading
              ? <Loader2 size={15} className="animate-spin" />
              : <FileDown size={15} strokeWidth={1.75} />}
            Export Price List PDF
          </button>
        </div>

        {/* Tabs */}
        <div
          className="flex rounded-xl p-1 mb-5 self-start w-fit"
          style={{ backgroundColor: '#e8e0d0' }}
        >
          {(['vegetables', 'flowers'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="rounded-lg px-5 py-2 text-sm font-medium capitalize transition-all duration-150"
              style={{
                fontFamily: 'var(--font-dm-sans), sans-serif',
                backgroundColor: tab === t ? '#fff' : 'transparent',
                color: tab === t ? '#1a3a22' : '#6b7c6e',
                boxShadow: tab === t ? '0 1px 4px rgba(0,0,0,0.12)' : 'none',
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Table */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: '1px solid #e0d8c8', backgroundColor: '#fff' }}
        >
          {loading ? (
            <div className="flex items-center justify-center py-20 gap-2.5" style={{ color: '#6b7c6e' }}>
              <Loader2 size={20} className="animate-spin" />
              <span style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: 14 }}>Loading products...</span>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ backgroundColor: '#f5f0e8', borderBottom: '1px solid #e0d8c8' }}>
                      {['Product Name', 'Unit', 'Current Price (RM)', 'Last Updated', 'Action'].map(h => (
                        <th
                          key={h}
                          className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-[0.1em]"
                          style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: '#6b7c6e' }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {displayed.map((row, i) => (
                      <tr
                        key={row.id}
                        style={{
                          backgroundColor: i % 2 === 0 ? '#fff' : '#faf8f4',
                          borderBottom: '1px solid #f0ebe0',
                        }}
                      >
                        <td
                          className="px-5 py-3.5 text-sm font-medium"
                          style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: '#1a3a22' }}
                        >
                          {row.name}
                        </td>
                        <td
                          className="px-5 py-3.5 text-sm"
                          style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: '#4a5c4e' }}
                        >
                          {row.unit}
                        </td>
                        <td className="px-5 py-3.5">
                          {row.price !== null ? (
                            <span
                              className="text-sm font-semibold"
                              style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: '#1a3a22' }}
                            >
                              RM {row.price.toFixed(2)}
                            </span>
                          ) : (
                            <span
                              className="text-sm"
                              style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: '#ef4444' }}
                            >
                              Not set
                            </span>
                          )}
                        </td>
                        <td
                          className="px-5 py-3.5 text-xs"
                          style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: '#9a8c74' }}
                        >
                          {formatDate(row.price_updated_at)}
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={row.draftPrice}
                              onChange={e => setDraftPrice(row.id, e.target.value)}
                              placeholder="0.00"
                              className="w-24 rounded-lg px-3 py-1.5 text-sm outline-none transition-all duration-150"
                              style={{
                                border: row.saveState === 'error' ? '1px solid #ef4444' : '1px solid #d4c8b0',
                                fontFamily: 'var(--font-dm-sans), sans-serif',
                                color: '#1a3a22',
                              }}
                              onFocus={e => { e.currentTarget.style.border = '1px solid #b8860b'; }}
                              onBlur={e => {
                                e.currentTarget.style.border =
                                  row.saveState === 'error' ? '1px solid #ef4444' : '1px solid #d4c8b0';
                              }}
                              onKeyDown={e => { if (e.key === 'Enter') handleSave(row.id); }}
                            />
                            <SaveButton state={row.saveState} onClick={() => handleSave(row.id)} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden divide-y" style={{ borderColor: '#f0ebe0' }}>
                {displayed.map(row => (
                  <div key={row.id} className="px-4 py-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p
                          className="text-sm font-semibold"
                          style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: '#1a3a22' }}
                        >
                          {row.name}
                        </p>
                        <p
                          className="text-xs mt-0.5"
                          style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: '#9a8c74' }}
                        >
                          {row.unit} · Updated {formatDate(row.price_updated_at)}
                        </p>
                      </div>
                      {row.price !== null ? (
                        <span
                          className="text-sm font-semibold"
                          style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: '#1a3a22' }}
                        >
                          RM {row.price.toFixed(2)}
                        </span>
                      ) : (
                        <span
                          className="text-xs font-medium"
                          style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: '#ef4444' }}
                        >
                          Not set
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={row.draftPrice}
                        onChange={e => setDraftPrice(row.id, e.target.value)}
                        placeholder="Enter price"
                        className="flex-1 rounded-lg px-3 py-2 text-sm outline-none"
                        style={{
                          border: '1px solid #d4c8b0',
                          fontFamily: 'var(--font-dm-sans), sans-serif',
                          color: '#1a3a22',
                        }}
                        onKeyDown={e => { if (e.key === 'Enter') handleSave(row.id); }}
                      />
                      <SaveButton state={row.saveState} onClick={() => handleSave(row.id)} />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

function SaveButton({ state, onClick }: { state: SaveState; onClick: () => void }) {
  const configs: Record<SaveState, { label: string; bg: string; icon: React.ReactNode }> = {
    idle:   { label: 'Save',    bg: '#1a3a22', icon: null },
    saving: { label: 'Saving', bg: '#2d5e38', icon: <Loader2 size={13} className="animate-spin" /> },
    saved:  { label: 'Saved',  bg: '#15803d', icon: <Check size={13} strokeWidth={2.5} /> },
    error:  { label: 'Error',  bg: '#ef4444', icon: null },
  };
  const c = configs[state];
  return (
    <button
      onClick={onClick}
      disabled={state === 'saving' || state === 'saved'}
      className="flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold text-white transition-all duration-150 hover:brightness-110 active:scale-95 disabled:cursor-not-allowed"
      style={{
        backgroundColor: c.bg,
        fontFamily: 'var(--font-dm-sans), sans-serif',
        minWidth: 64,
        justifyContent: 'center',
      }}
    >
      {c.icon}
      {c.label}
    </button>
  );
}
