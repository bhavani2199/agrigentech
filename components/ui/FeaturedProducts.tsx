import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

interface Product {
  id: string;
  name: string;
  category: 'vegetables' | 'flowers';
  image_url: string | null;
}

async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  const [vegRes, flwRes] = await Promise.all([
    supabase.from('products').select('id, name, category, image_url').eq('category', 'vegetables').limit(3),
    supabase.from('products').select('id, name, category, image_url').eq('category', 'flowers').limit(3),
  ]);
  return [...(vegRes.data ?? []), ...(flwRes.data ?? [])] as Product[];
}

function ProductCard({ product }: { product: Product }) {
  const isVeg = product.category === 'vegetables';
  const waLink = `https://wa.me/60102552554?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20${encodeURIComponent(product.name)}`;

  return (
    <div
      className="product-card flex flex-col rounded-2xl overflow-hidden"
      style={{ backgroundColor: '#fff', border: '1px solid #e8e0d0' }}
    >
      {product.image_url ? (
        <img src={product.image_url} alt={product.name} className="w-full object-cover" style={{ height: 200 }} />
      ) : (
        <div className="w-full flex items-center justify-center" style={{ height: 200, backgroundColor: '#2d5e38' }} aria-hidden="true">
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" opacity="0.3">
            <path d="M26 6C15 6 6 15 6 26s9 20 20 20 20-9 20-20S37 6 26 6zm0 36c-8.84 0-16-7.16-16-16S17.16 10 26 10s16 7.16 16 16-7.16 16-16 16z" fill="#f5f0e8" />
            <path d="M26 18a8 8 0 100 16 8 8 0 000-16z" fill="#f5f0e8" />
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
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium"
          style={{ backgroundColor: '#1a3a22', color: '#f5f0e8', fontFamily: 'var(--font-dm-sans), sans-serif' }}
        >
          <MessageCircle size={15} strokeWidth={1.75} />
          Enquire on WhatsApp
        </a>
      </div>
    </div>
  );
}

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  return (
    <section style={{ backgroundColor: '#f5f0e8' }}>
      <div className="mx-auto max-w-7xl px-5 md:px-10 py-20">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{ fontFamily: 'var(--font-playfair), serif', color: '#1a3a22' }}
          >
            Our Products
          </h2>
          <div className="mx-auto mb-5" style={{ width: 64, height: 3, backgroundColor: '#b8860b', borderRadius: 999 }} />
          <p
            className="text-base md:text-lg max-w-xl mx-auto"
            style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: '#4a5c4e' }}
          >
            Farm fresh from Cameron Highlands, delivered across Malaysia
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Link
            href="/products"
            className="inline-block rounded-md px-8 py-3.5 text-sm font-semibold tracking-wide transition-all duration-200 hover:brightness-110 hover:shadow-lg"
            style={{ backgroundColor: '#b8860b', color: '#fff', fontFamily: 'var(--font-dm-sans), sans-serif', letterSpacing: '0.04em' }}
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
