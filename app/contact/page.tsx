import type { Metadata } from 'next';
import Navbar from '@/components/ui/Navbar';
import { MessageCircle, Phone, MapPin, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | Agrigentech Sdn Bhd | WhatsApp +6010-2552554',
  description:
    'Contact Agrigentech for wholesale vegetable and flower pricing. WhatsApp us at +6010-2552554. Located in Cameron Highlands, Pahang, Malaysia.',
  alternates: { canonical: 'https://agrigentechsdnbhd.com/contact' },
  openGraph: {
    title: 'Contact Us | Agrigentech Sdn Bhd | WhatsApp +6010-2552554',
    description:
      'Contact Agrigentech for wholesale vegetable and flower pricing. WhatsApp us at +6010-2552554. Located in Cameron Highlands, Pahang, Malaysia.',
    url: 'https://agrigentechsdnbhd.com/contact',
  },
};

const contactItems = [
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+6010-255 2554',
    href: 'https://wa.me/60102552554',
    cta: 'Chat on WhatsApp',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+6010-255 2554',
    href: 'tel:+60102552554',
    cta: 'Call Us',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'sales@agrigentechsdnbhd.com',
    href: 'mailto:sales@agrigentechsdnbhd.com',
    cta: 'Send Email',
  },
  {
    icon: MapPin,
    label: 'Address',
    value: 'No.18, Jalan Sekolah Kampung Raja, 39010 Tanah Rata, Cameron Highlands, Pahang, Malaysia',
    href: 'https://maps.google.com/?q=Cameron+Highlands+Pahang+Malaysia',
    cta: 'View on Map',
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f0e8' }}>
      <Navbar />

      {/* Hero */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{ minHeight: 300, backgroundColor: '#1a3a22' }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/1459339/pexels-photo-1459339.jpeg?auto=compress&cs=tinysrgb&w=1920)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.1,
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(26,58,34,0.7) 0%, rgba(26,58,34,0.6) 100%)' }}
        />
        <div className="relative z-10 mx-auto max-w-2xl px-6 py-24 text-center">
          <h1
            className="text-4xl font-bold text-white md:text-5xl"
            style={{ fontFamily: 'var(--font-playfair), serif', lineHeight: 1.2 }}
          >
            Get in Touch
          </h1>
          <div
            className="mx-auto my-4 rounded-full"
            style={{ width: 64, height: 3, backgroundColor: '#b8860b' }}
          />
          <p
            className="text-base md:text-lg"
            style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: 'rgba(245,240,232,0.85)' }}
          >
            We respond quickly — reach us on WhatsApp for the fastest reply
          </p>
        </div>
      </section>

      {/* Contact cards */}
      <section className="mx-auto max-w-4xl px-5 md:px-10 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {contactItems.map(({ icon: Icon, label, value, href, cta }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group flex flex-col gap-4 rounded-2xl p-7 transition-shadow duration-300 hover:shadow-lg"
              style={{ backgroundColor: '#fff', border: '1px solid #e8e0d0' }}
            >
              <div
                className="flex items-center justify-center rounded-xl"
                style={{ width: 48, height: 48, backgroundColor: '#1a3a22' }}
              >
                <Icon size={22} strokeWidth={1.75} color="#b8860b" />
              </div>
              <div className="flex flex-col gap-1">
                <p
                  className="text-xs font-semibold uppercase tracking-[0.14em]"
                  style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: '#b8860b' }}
                >
                  {label}
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: '#1a3a22' }}
                >
                  {value}
                </p>
              </div>
              <span
                className="mt-auto text-sm font-medium transition-colors duration-150 group-hover:underline"
                style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: '#2d5e38' }}
              >
                {cta} →
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
