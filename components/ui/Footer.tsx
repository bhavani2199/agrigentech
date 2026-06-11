import Image from 'next/image';
import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#1a3a22' }}>
      <div className="mx-auto max-w-7xl px-5 md:px-10 py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-8">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="Agrigentech"
                width={140}
                height={40}
                style={{ objectFit: 'contain', objectPosition: 'left' }}
              />
            </Link>
            <div style={{ width: 40, height: 2, backgroundColor: '#b8860b', borderRadius: 999 }} />
            <p
              className="text-sm leading-relaxed"
              style={{
                fontFamily: 'var(--font-dm-sans), sans-serif',
                color: 'rgba(245,240,232,0.60)',
                lineHeight: 1.75,
              }}
            >
              Fresh From The Farm,<br />Straight To Your Business
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <p
              className="text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: '#b8860b' }}
            >
              Quick Links
            </p>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: 'Home', href: '/' },
                { label: 'Products', href: '/products' },
                { label: 'About', href: '/about' },
                { label: 'Contact', href: '/contact' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm transition-colors duration-150 hover:text-white"
                    style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: 'rgba(245,240,232,0.60)' }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <p
              className="text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: '#b8860b' }}
            >
              Contact
            </p>
            <ul className="flex flex-col gap-3.5">
              <li className="flex items-start gap-3">
                <Phone size={14} strokeWidth={1.75} style={{ color: '#b8860b', flexShrink: 0, marginTop: 3 }} />
                <a
                  href="tel:+60102552554"
                  className="text-sm transition-colors duration-150 hover:text-white"
                  style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: 'rgba(245,240,232,0.60)' }}
                >
                  +6010-2552554
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={14} strokeWidth={1.75} style={{ color: '#b8860b', flexShrink: 0, marginTop: 3 }} />
                <a
                  href="mailto:sales@agrigentech.com.my"
                  className="text-sm transition-colors duration-150 hover:text-white"
                  style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: 'rgba(245,240,232,0.60)' }}
                >
                  sales@agrigentech.com.my
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={14} strokeWidth={1.75} style={{ color: '#b8860b', flexShrink: 0, marginTop: 3 }} />
                <span
                  className="text-sm"
                  style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: 'rgba(245,240,232,0.60)', lineHeight: 1.6 }}
                >
                  Cameron Highlands,<br />Pahang, Malaysia
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="mx-auto max-w-7xl px-5 md:px-10 py-5">
          <p
            className="text-center text-xs"
            style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: 'rgba(245,240,232,0.35)' }}
          >
            &copy; 2025 Agrigentech Sdn Bhd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
