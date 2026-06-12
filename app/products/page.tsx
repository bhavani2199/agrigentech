'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/ui/Navbar';
import { supabase, type Product } from '@/lib/supabase/client';

type Tab = 'vegetables' | 'flowers';

const WA_BASE = 'https://wa.me/60102552554';

function ProductCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden" style={{ backgroundColor: '#fff', border: '1px solid #e8e0d0' }}>
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
  const priceLabel = product.price != null ? `RM ${Number(product.price).toFixed(2)} / ${product.unit ?? 'kg'}` : null;
  const initial = product.name.charAt(0).toUpperCase();

  return (
    <div
      className="flex flex-col rounded-2xl overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: '#fff',
        border: '1px solid #e8e0d0',
        borderRadius: 16,
        boxShadow: hovered ? '0 10px 28px rgba(26,58,34,0.13)' : '0 1px 4px rgba(26,58,34,0.06)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '1 / 1', backgroundColor: '#fff' }}>
        {product.image_url ? (
          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: '#f5f0e8' }}>
            <span style={{ fontFamily: 'var(--font-playfair), serif', fontSize: 48, fontWeight: 700, color: '#1a3a22', opacity: 0.55 }}>
              {initial}
            </span>
          </div>
        )}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor: hovered ? 'rgba(0,0,0,0.50)' : 'rgba(0,0,0,0)', transition: 'background-color 0.3s ease' }}
        >
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white"
            style={{
              backgroundColor: '#b8860b',
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'scale(1)' : 'scale(0.82)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
              pointerEvents: hovered ? 'auto' : 'none',
              whiteSpace: 'nowrap',
            }}
          >
            Chat with Us
          </a>
        </div>
      </div>
      <div className="flex flex-col gap-1" style={{ padding: 12 }}>
        <p
          className="truncate"
          style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: 14, fontWeight: 600, color: '#1a3a22', lineHeight: 1.4 }}
        >
          {product.name}
        </p>
        {priceLabel ? (
          <p style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: 13, fontWeight: 500, color: '#1a3a22' }}>
            {priceLabel}
          </p>
        ) : (
          <p style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: 13, fontWeight: 500, color: '#9a9a9a' }}>
            Price updated daily
          </p>
        )}
      </div>
    </div>
  );
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const search = searchParams.get('q') ?? '';

  const [activeTab, setActiveTab] = useState<Tab>('vegetables');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch products when active tab updates
  useEffect(() => {
    setLoading(true);
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

  // 2. Automatically toggle tab if search results exist in the alternative tab
  useEffect(() => {
    if (!search.trim()) return;

    const query = search.toLowerCase();
    
    const hasMatchesInCurrentTab = products.some(p => 
      p.name.toLowerCase().includes(query)
    );

    if (!hasMatchesInCurrentTab && !loading) {
      const alternateTab: Tab = activeTab === 'vegetables' ? 'flowers' : 'vegetables';

      supabase
        .from('products')
        .select('id, name')
        .eq('category', alternateTab)
        .then(({ data }) => {
          const hasMatchesInAlternateTab = data?.some(p => 
            p.name.toLowerCase().includes(query)
          );

          if (hasMatchesInAlternateTab) {
            setActiveTab(alternateTab);
          }
        });
    }
  }, [search, products, loading, activeTab]);

  // 3. Filter current products array for screen render
  const filtered = useMemo(() => {
    if (!search.trim()) return products;
    const q = search.toLowerCase();
    return products.filter((p) => p.name.toLowerCase().includes(q));
  }, [products, search]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f0e8' }}>
      <Navbar />

      {/* Hero Banner Section (Matches About Page Styling) */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{ minHeight: 340, backgroundColor: '#1a3a22' }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=1920)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.12,
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(26,58,34,0.7) 0%, rgba(26,58,34,0.55) 100%)' }}
        />
        <div className="relative z-10 mx-auto max-w-3xl px-6 pt-36 pb-20 text-center">
          <h1
            className="text-4xl font-bold text-white md:text-5xl"
            style={{ fontFamily: 'var(--font-playfair), serif', lineHeight: 1.2 }}
          >
            Our Products
          </h1>
          <div
            className="mx-auto my-4 rounded-full"
            style={{ width: 64, height: 3, backgroundColor: '#b8860b' }}
          />
          <p
            className="text-base md:text-lg"
            style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: 'rgba(245,240,232,0.85)' }}
          >
            Premium vegetables and cut flowers grown fresh from our Cameron Highlands farm
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-5 md:px-10 pt-12 pb-20">
        
        {/* Active search banner */}
        {search.trim() && (
          <p
            className="text-center mb-8 text-sm"
            style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: '#4a5c4e' }}
          >
            Showing results for <span style={{ color: '#1a3a22', fontWeight: 600 }}>"{search}"</span>
          </p>
        )}

        {/* Tabs */}
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

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : filtered.map((product) => <ProductCard key={product.id} product={product} />)
          }
        </div>

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <p className="text-center py-16 text-base" style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: '#4a5c4e' }}>
            {search.trim()
              ? `No products found for "${search}"`
              : 'No products available at the moment. Please check back soon.'}
          </p>
        )}
      </main>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={null}>
      <ProductsContent />
    </Suspense>
  );
}
