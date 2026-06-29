import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/ui/Navbar';
import HeroCarousel from '@/components/ui/HeroCarousel';
import FeaturedProducts from '@/components/ui/FeaturedProducts';
import RetailStores from '@/components/ui/RetailStores';

export const metadata: Metadata = {
  title: 'Agrigentech | Farm Fresh Wholesale Vegetables & Flowers Malaysia',
  alternates: { canonical: 'https://agrigentech.vercel.app' },
  openGraph: {
    url: 'https://agrigentech.vercel.app',
  },
};

export default function Home() {
  return (
    <>
      <Navbar />

      <section
        className="relative flex min-h-screen items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a3a22 0%, #2d5e38 100%)' }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/1459339/pexels-photo-1459339.jpeg?auto=compress&cs=tinysrgb&w=1920)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.18,
          }}
        />

        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(26,58,34,0.72) 0%, rgba(26,58,34,0.55) 60%, rgba(26,58,34,0.80) 100%)' }}
        />

        <div className="relative z-10 mx-auto max-w-4xl px-6 py-32 text-center md:px-12">
          <div className="mb-6 inline-block">
            <span
              className="rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]"
              style={{
                backgroundColor: 'rgba(184,134,11,0.18)',
                border: '1px solid rgba(184,134,11,0.55)',
                color: '#f0c040',
                fontFamily: 'var(--font-dm-sans), sans-serif',
              }}
            >
              Cameron Highlands Premium Supplier
            </span>
          </div>

          <h1
            className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl"
            style={{ fontFamily: 'var(--font-playfair), serif', lineHeight: 1.15 }}
          >
            Fresh From The Farm,{' '}
            <span style={{ color: '#f0c040' }}>Straight To Your Business</span>
          </h1>

          <p
            className="mx-auto mb-10 max-w-2xl text-base leading-relaxed sm:text-lg"
            style={{
              fontFamily: 'var(--font-dm-sans), sans-serif',
              color: 'rgba(245,240,232,0.82)',
              lineHeight: 1.7,
            }}
          >
            Supplying premium vegetables and cut flowers to hotels, supermarkets and F&B groups across Malaysia
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/products"
              className="w-full rounded-md px-8 py-3.5 text-sm font-semibold tracking-wide transition-all duration-200 hover:brightness-110 hover:shadow-lg sm:w-auto"
              style={{
                backgroundColor: '#b8860b',
                color: '#fff',
                fontFamily: 'var(--font-dm-sans), sans-serif',
                letterSpacing: '0.04em',
              }}
            >
              View Our Products
            </Link>

            
              href="https://wa.me/60102552554"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-md px-8 py-3.5 text-sm font-semibold tracking-wide transition-all duration-200 hover:bg-white/10 sm:w-auto"
              style={{
                border: '1.5px solid rgba(245,240,232,0.7)',
                color: '#f5f0e8',
                fontFamily: 'var(--font-dm-sans), sans-serif',
                letterSpacing: '0.04em',
              }}
            >
              Enquire on WhatsApp
            </a>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-24"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(26,58,34,0.5))' }}
        />

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-50">
          <span
            className="text-xs uppercase tracking-widest"
            style={{ color: '#f5f0e8', fontFamily: 'var(--font-dm-sans), sans-serif' }}
          >
            Scroll
          </span>
          <div
            className="h-8 w-px"
            style={{ background: 'linear-gradient(to bottom, #f5f0e8, transparent)' }}
          />
        </div>
      </section>

      <HeroCarousel />

      <section style={{ backgroundColor: '#1a3a22' }}>
        <div className="mx-auto max-w-5xl px-6 py-14 md:py-16">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-0">
            {[
              { value: '900,000kg+', label: 'Vegetable Harvest Per Year' },
              { value: '15 Years', label: 'Of Experience' },
              { value: '500+ Acres', label: 'Of Farm Land' },
            ].map(({ value, label }, i) => (
              <div
                key={label}
                className="flex flex-col items-center text-center"
                style={
                  i < 2
                    ? { borderRight: '1px solid rgba(255,255,255,0.1)', paddingRight: 0 }
                    : undefined
                }
              >
                <span
                  className="text-4xl md:text-5xl font-bold leading-none"
                  style={{ fontFamily: 'var(--font-playfair), serif', color: '#b8860b' }}
                >
                  {value}
                </span>
                <span
                  className="mt-3 text-sm font-medium uppercase tracking-[0.14em]"
                  style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: 'rgba(245,240,232,0.72)' }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: '#f5f0e8' }}>
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-12 md:py-24">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
            <div
              className="flex aspect-square w-full items-center justify-center rounded-2xl"
              style={{ backgroundColor: '#2d5e38' }}
            >
              <span
                className="text-sm uppercase tracking-[0.2em]"
                style={{ color: 'rgba(245,240,232,0.5)', fontFamily: 'var(--font-dm-sans), sans-serif' }}
              >
                Alwaha Tomato
              </span>
            </div>

            <div>
              <span
                className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]"
                style={{
                  backgroundColor: 'rgba(184,134,11,0.12)',
                  border: '1px solid rgba(184,134,11,0.4)',
                  color: '#b8860b',
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                }}
              >
                Our Flagship Export
              </span>

              <h2
                className="mb-5 text-3xl font-bold leading-snug md:text-4xl"
                style={{ fontFamily: 'var(--font-playfair), serif', color: '#1a3a22' }}
              >
                Alwaha Tomato — Grown in the Highlands, Trusted Worldwide
              </h2>

              <p
                className="mb-6 text-base leading-relaxed md:text-lg"
                style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: '#4a5c4e', lineHeight: 1.75 }}
              >
                Our premium Alwaha Tomato brand is cultivated exclusively on our Cameron Highlands farm and exported to Thailand, Singapore and Australia.
              </p>

              
                href="https://wa.me/60102552554?text=Hi%20Agrigentech%2C%20I%27d%20like%20to%20enquire%20about%20Alwaha%20Tomato"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md px-7 py-3 text-sm font-semibold tracking-wide transition-all duration-200 hover:brightness-110"
                style={{ backgroundColor: '#1a3a22', color: '#f5f0e8', fontFamily: 'var(--font-dm-sans), sans-serif', letterSpacing: '0.04em' }}
              >
                Enquire About Alwaha Tomato
              </a>
            </div>
          </div>
        </div>
      </section>

      <FeaturedProducts />
      <RetailStores />
    </>
  );
}
