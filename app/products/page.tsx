'use client';

import { useState, useEffect, useMemo } from 'react';
import Navbar from '@/components/ui/Navbar';
import { supabase, type Product } from '@/lib/supabase/client';
import { Search } from 'lucide-react';

type Tab = 'vegetables' | 'flowers';

const WA_BASE = 'https://wa.me/60102552554';

function ProductCardSkeleton() {
  return (
    <div
      className="flex flex-col rounded-2xl overflow-hidden"
      style={{ backgroundColor: '#fff', border: '1px solid #e8e0d0' }}
    >
      <div className="w-full animate-pulse" style={{ aspectRatio: '1 / 1', backgroundColor: '#e8e0d0' }} />
      <div className="flex flex-col p-4 gap-2.5">
        <div className="animate-pulse rounded h-5 w-3/4" style={{ backgroundColor: '#e8e0d0' }} />
        <div className="animate-pulse rounded h-4 w-1/3" style={{ backgroundColor: '#e8e0d0' }} />
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);

  const waLink = `${WA_BASE}?text=Hi%20Agrigentech%2C%20I%27d%20like%20to%20enquire%20about%20${encodeURIComponent(product.name)}`;
  const priceLabel = product.price != null
    ? `RM ${product.price.toFixed(2)} / ${product.unit ?? 'kg'}`
    : null;

  return (
    <div
      className="flex flex-col rounded-2xl overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: '#fff',
        border: '1px solid #e8e0d0',
        boxShadow: hovered ? '0 10px 28px rgba(26,58,34,0.13)' : '0 1px 4px rgba(26,58,34,0.06)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '1 / 1' }}>
        {product.image_url ? (
          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: '#2d5e38' }}>
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" opacity="0.3">
              <path d="M28 8C17 8 8 17 8 28s9 20 20 20 20-9 20-20S39 8 28 8zm0 36c-8.84 0-16-7.16-16-16S19.16 12 28 12s16 7.16 16 16-7.16 16-16 16z" fill="#f5f0e8" />
              <path d="M28 20a8 8 0 100 16 8 8 0 000-16z" fill="#f5f0e8" />
            </svg>
          </div>
        )}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            backgroundColor: hovered ? 'rgba(0,0,0,0.50)' : 'rgba(0,0,0,0)',
            transition: 'background-color 0.3s ease',
          }}
        >
          
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white"
            style={{
              backgroundColor: '#25d366',
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'scale(1)' : 'scale(0.82)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
              boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
              fontFamily: 'var(--font-dm-sans), sans-serif',
              letterSpacing: '0.02em',
              whiteSpace: 'nowrap',
              pointerEvents: hovered ? 'auto' : 'none',
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat with Us
          </a>
        </div>
      </div>

      <div className="flex flex-col p-4 gap-1">
        <p style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: 15, fontWeight: 600, color: '#1a3a22', lineHeight: 1.4 }}>
          {product.name}
        </p>
        {priceLabel ? (
          <p style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: 13, fontWeight: 600, color: '#b8860b' }}>
            {priceLabel}
          </p>
        ) : (
          <p style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: 13, fontWeight: 400, color: '#8a8a8a' }}>
            Price updated daily
          </p>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('vegetables');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    setSearch('');
    supabase
      .from('products')
      .select('*')
      .eq('category', activeTab)
      .order('name', { ascending: true })
      .then(({ data }) => {
        setProducts((data as Product[]) ?? []);
        setLoading(false);
      });
  }, [activeTab]);

  const filtered = useMemo(() => {
    if (!search.trim()) return products;
    const q = search.toLowerCase();
    return products.filter((p) => p.name.toLowerCase().includes(q));
  }, [products, search]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f0e8' }}>
      <Navbar />
      <main className="mx-auto max-w-7xl px-5 md:px-10 pt-28 pb-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{ fontFamily: 'var(--font-playfair), serif', color: '#1a3a22' }}>
            Our Products
          </h1>
          <div className="mx-auto mb-5" style={{ width: 72, height: 3, backgroundColor: '#b8860b', borderRadius: 999 }} />
          <p className="text-base md:text-lg max-w-xl mx-auto" style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: '#4a5c4e' }}>
            Premium vegetables and cut flowers grown fresh from our Cameron Highlands farm
          </p>
        </div>

        <div className="max-w-md mx-auto mb-7 relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#4a5c4e' }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-xl pl-10 pr-4 py-3 text-sm outline-none transition-colors duration-200"
            style={{ backgroundColor: '#fff', border: '1.5px solid #d4c9a8', color: '#1a3a22', fontFamily: 'var(--font-dm-sans), sans-serif' }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#1a3a22')}
            onBlur={(e) => (e.currentTarget.style.borderColor = '#d4c9a8')}
          />
        </div>

        <div className="flex justify-center mb-10">
          <div className="flex rounded-xl p-1 gap-1" style={{ backgroundColor: '#e8e0d0' }}>
            {(['vegetables', 'flowers'] as Tab[]).map((tab) => {
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                    backgroundColor: active ? '#b8860b' : 'transparent',
                    color: active ? '#fff' : '#1a3a22',
                    boxShadow: active ? '0 2px 8px rgba(184,134,11,0.3)' : 'none',
                  }}
                >
                  {tab === 'vegetables' ? 'Vegetables' : 'Cut Flowers'}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : filtered.map((product) => <ProductCard key={product.id} product={product} />)
          }
        </div>

        {!loading && filtered.length === 0 && (
          <p className="text-center py-16 text-base" style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: '#4a5c4e' }}>
            {search.trim() ? `No products found for "${search}"` : 'No products available at the moment. Please check back soon.'}
          </p>
        )}
      </main>
    </div>
  );
}
