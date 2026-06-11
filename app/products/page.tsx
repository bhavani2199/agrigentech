'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/ui/Navbar';
import { MessageCircle } from 'lucide-react';
import { supabase, type Product } from '@/lib/supabase/client';

const WHATSAPP_BASE = 'https://wa.me/60102552554';

type Tab = 'vegetables' | 'flowers';

function ProductCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden" style={{ backgroundColor: '#fff', border: '1px solid #e8e0d0' }}>
      <div className="w-full animate-pulse" style={{ height: 200, backgroundColor: '#e8e0d0' }} />
      <div className="flex flex-col p-5 gap-3">
        <div className="animate-pulse rounded-full h-5 w-24" style={{ backgroundColor: '#e8e0d0' }} />
        <div className="animate-pulse rounded h-6 w-3/4" style={{ backgroundColor: '#e8e0d0' }} />
        <div className="animate-pulse rounded h-4 w-full" style={{ backgroundColor: '#e8e0d0' }} />
        <div className="animate-pulse rounded-lg h-10 w-full mt-1" style={{ backgroundColor: '#e8e0d0' }} />
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const waLink = `${WHATSAPP_BASE}?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20${encodeURIComponent(product.name)}`;
  const isVeg = product.category === 'vegetables';

  return (
    <div
      className="product-card flex flex-col rounded-2xl overflow-hidden"
      style={{ backgroundColor: '#fff', border: '1px solid #e8e0d0' }}
    >
      {product.image_url ? (
        <img src={product.image_url} alt={product.name} className="w-full object-cover" style={{ height: 200 }} />
      ) : (
        <div
          className="w-full flex items-center justify-center"
          style={{ height: 200, backgroundColor: '#2d5e38' }}
          aria-hidden="true"
        >
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" opacity="0.35">
            <path d="M28 8C17 8 8 17 8 28s9 20 20 20 20-9 20-20S39 8 28 8zm0 36c-8.84 0-16-7.16-16-16S19.16 12 28 12s16 7.16 16 16-7.16 16-16 16z" fill="#f5f0e8" />
            <path d="M28 20a8 8 0 100 16 8 8 0 000-16z" fill="#f5f0e8" />
          </svg>
        </div>
      )}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <span
          className="self-start rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em]"
          style={isVeg
            ? { backgroundColor: 'rgba(26,58,34,0.10)', color: '#1a3a22' }
            : { backgroundColor: 'rgba(184,134,11,0.12)', color: '#8a6200' }}
        >
          {isVeg ? 'Vegetable' : 'Cut Flower'}
        </span>
        <h3
          className="text-lg font-semibold leading-snug"
          style={{ fontFamily: 'var(--font-playfair), serif', color: '#1a3a22' }}
        >
          {product.name}
        </h3>
        {product.description && (
          <p
            className="text-sm leading-relaxed flex-1"
            style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: '#4a5c4e' }}
          >
            {product.description}
          </p>
        )}
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium btn-scale"
          style={{ backgroundColor: '#1a3a22', color: '#f5f0e8', fontFamily: 'var(--font-dm-sans), sans-serif' }}
        >
          <MessageCircle size={16} strokeWidth={1.75} />
          Enquire on WhatsApp
        </a>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('vegetables');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f0e8' }}>
      <Navbar />

      <main className="mx-auto max-w-7xl px-5 md:px-10 pt-28 pb-20">
        {/* Page heading */}
        <div className="text-center mb-12">
          <h1
            className="text-4xl md:text-5xl font-bold mb-3"
            style={{ fontFamily: 'var(--font-playfair), serif', color: '#1a3a22' }}
          >
            Our Products
          </h1>
          <div className="mx-auto mb-5" style={{ width: 72, height: 3, backgroundColor: '#b8860b', borderRadius: 999 }} />
          <p
            className="text-base md:text-lg max-w-xl mx-auto"
            style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: '#4a5c4e' }}
          >
            Premium vegetables and cut flowers grown fresh from our Cameron Highlands farm
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="flex rounded-xl p-1 gap-1" style={{ backgroundColor: '#e8e0d0' }}>
            {(['vegetables', 'flowers'] as Tab[]).map((tab) => {
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 btn-scale"
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

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : products.map((product) => <ProductCard key={product.id} product={product} />)
          }
        </div>

        {!loading && products.length === 0 && (
          <p
            className="text-center py-16 text-base"
            style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: '#4a5c4e' }}
          >
            No products available at the moment. Please check back soon.
          </p>
        )}
      </main>
    </div>
  );
}
