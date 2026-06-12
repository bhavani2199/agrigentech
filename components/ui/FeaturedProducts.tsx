import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import FeaturedProductCard from '@/components/ui/FeaturedProductCard';

interface FeaturedProduct {
  id: string;
  name: string;
  category: 'vegetables' | 'flowers';
  image_url: string | null;
  price: number | null;
  unit: string | null;
}

async function getFeaturedProducts(): Promise<FeaturedProduct[]> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  const [vegRes, flwRes] = await Promise.all([
    supabase.from('products').select('id, name, category, image_url, price, unit').eq('category', 'vegetables').limit(3),
    supabase.from('products').select('id, name, category, image_url, price, unit').eq('category', 'flowers').limit(3),
  ]);
  return [...(vegRes.data ?? []), ...(flwRes.data ?? [])] as FeaturedProduct[];
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
          {products.map((product) => (
            <FeaturedProductCard key={product.id} product={product} />
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
