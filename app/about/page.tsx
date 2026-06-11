import type { Metadata } from 'next';
import Navbar from '@/components/ui/Navbar';

export const metadata: Metadata = {
  title: 'About Us | Agrigentech Sdn Bhd Cameron Highlands',
  description:
    'Learn about Agrigentech — a Cameron Highlands agricultural wholesale supplier with our own 500-acre farm supplying premium produce across Malaysia.',
  alternates: { canonical: 'https://agrigentechsdnbhd.com/about' },
  openGraph: {
    title: 'About Us | Agrigentech Sdn Bhd Cameron Highlands',
    description:
      'Learn about Agrigentech — a Cameron Highlands agricultural wholesale supplier with our own 500-acre farm supplying premium produce across Malaysia.',
    url: 'https://agrigentechsdnbhd.com/about',
  },
};
import { MessageCircle, Leaf, Building2, Network } from 'lucide-react';

const whyCards = [
  {
    icon: Leaf,
    title: 'Farm Direct',
    description:
      'We own and operate our farm in Cameron Highlands ensuring freshness and quality control at every stage.',
  },
  {
    icon: Building2,
    title: 'B2B Specialists',
    description:
      'We understand wholesale requirements and deliver consistently to hotels, supermarkets and F&B groups.',
  },
  {
    icon: Network,
    title: '11 Group Companies',
    description:
      'Part of a group of 11 companies with deep roots in Malaysian agriculture and a proven track record.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f0e8' }}>
      <Navbar />

      {/* Hero Banner */}
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
        <div className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center">
          <h1
            className="text-4xl font-bold text-white md:text-5xl"
            style={{ fontFamily: 'var(--font-playfair), serif', lineHeight: 1.2 }}
          >
            About Agrigentech
          </h1>
          <div
            className="mx-auto my-4 rounded-full"
            style={{ width: 64, height: 3, backgroundColor: '#b8860b' }}
          />
          <p
            className="text-base md:text-lg"
            style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: 'rgba(245,240,232,0.85)' }}
          >
            Rooted in Cameron Highlands, Growing for Malaysia
          </p>
        </div>
      </section>

      {/* Section 1 — Our Story */}
      <section className="mx-auto max-w-7xl px-5 md:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Text */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.18em] mb-3"
              style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: '#b8860b' }}
            >
              Our Story
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold mb-5 leading-snug"
              style={{ fontFamily: 'var(--font-playfair), serif', color: '#1a3a22' }}
            >
              From Highland Soil to Your Business
            </h2>
            <div
              className="mb-6 rounded-full"
              style={{ width: 48, height: 3, backgroundColor: '#b8860b' }}
            />
            <p
              className="text-base leading-relaxed"
              style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: '#4a5c4e', lineHeight: 1.8 }}
            >
              Agrigentech Sdn. Bhd. is a Cameron Highlands based agricultural wholesale supplier operating our own
              farm. We supply premium vegetables and cut flowers to hotels, supermarket chains, F&amp;B groups, and
              exporters across Malaysia.
            </p>
          </div>

          {/* Placeholder image */}
          <div
            className="w-full rounded-2xl overflow-hidden flex items-center justify-center"
            style={{ height: 320, backgroundColor: '#2d5e38' }}
            aria-hidden="true"
          >
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" opacity="0.3">
              <rect x="8" y="8" width="56" height="56" rx="8" stroke="#f5f0e8" strokeWidth="2.5" />
              <circle cx="36" cy="34" r="12" stroke="#f5f0e8" strokeWidth="2.5" />
              <path d="M8 52l14-14 10 10 12-16 20 20" stroke="#f5f0e8" strokeWidth="2.5" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </section>

      {/* Section 2 — Why Choose Us */}
      <section style={{ backgroundColor: '#fff', borderTop: '1px solid #e8e0d0', borderBottom: '1px solid #e8e0d0' }}>
        <div className="mx-auto max-w-7xl px-5 md:px-10 py-20">
          <div className="text-center mb-12">
            <p
              className="text-xs font-semibold uppercase tracking-[0.18em] mb-3"
              style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: '#b8860b' }}
            >
              Why Choose Us
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ fontFamily: 'var(--font-playfair), serif', color: '#1a3a22' }}
            >
              Built for Wholesale, Trusted by Businesses
            </h2>
            <div
              className="mx-auto mt-4 rounded-full"
              style={{ width: 48, height: 3, backgroundColor: '#b8860b' }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyCards.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex flex-col items-start rounded-2xl p-7 transition-shadow duration-300 hover:shadow-lg"
                style={{ backgroundColor: '#f5f0e8', border: '1px solid #e8e0d0' }}
              >
                <div
                  className="flex items-center justify-center rounded-xl mb-5"
                  style={{ width: 48, height: 48, backgroundColor: '#1a3a22' }}
                >
                  <Icon size={22} strokeWidth={1.75} color="#b8860b" />
                </div>
                <h3
                  className="text-xl font-semibold mb-3"
                  style={{ fontFamily: 'var(--font-playfair), serif', color: '#1a3a22' }}
                >
                  {title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: '#4a5c4e', lineHeight: 1.75 }}
                >
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — CTA Banner */}
      <section
        className="flex items-center justify-center"
        style={{ backgroundColor: '#1a3a22' }}
      >
        <div className="mx-auto max-w-2xl px-6 py-20 text-center">
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-8"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            Ready to partner with us?
          </h2>
          <a
            href="https://wa.me/60102552554"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-lg px-8 py-3.5 text-sm font-semibold transition-all duration-200 hover:brightness-110 active:scale-95"
            style={{
              backgroundColor: '#b8860b',
              color: '#fff',
              fontFamily: 'var(--font-dm-sans), sans-serif',
              letterSpacing: '0.04em',
              boxShadow: '0 4px 18px rgba(184,134,11,0.35)',
            }}
          >
            <MessageCircle size={18} strokeWidth={1.75} />
            Enquire on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
