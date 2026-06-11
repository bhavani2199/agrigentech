import './globals.css';
import type { Metadata } from 'next';
import { DM_Sans, Playfair_Display } from 'next/font/google';
import Footer from '@/components/ui/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const SITE_URL = 'https://agrigentech.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Agrigentech Sdn Bhd | Cameron Highlands Fresh Produce Wholesale',
    template: '%s | Agrigentech',
  },
  description:
    'Premium vegetables and cut flowers wholesale supplier from Cameron Highlands. Supplying hotels, supermarkets and F&B groups across Malaysia. Call +6010-2552554.',
  keywords: [
    'Cameron Highlands vegetables wholesale',
    'fresh produce supplier Malaysia',
    'vegetable wholesaler Malaysia',
    'cut flowers supplier',
    'Agrigentech',
  ],
  authors: [{ name: 'Agrigentech Sdn Bhd', url: SITE_URL }],
  openGraph: {
    type: 'website',
    locale: 'en_MY',
    url: SITE_URL,
    siteName: 'Agrigentech Sdn Bhd',
    title: 'Agrigentech Sdn Bhd | Cameron Highlands Fresh Produce Wholesale',
    description:
      'Premium vegetables and cut flowers wholesale supplier from Cameron Highlands. Supplying hotels, supermarkets and F&B groups across Malaysia.',
    images: [
      {
        url: 'https://images.pexels.com/photos/1459339/pexels-photo-1459339.jpeg?auto=compress&cs=tinysrgb&w=1200',
        width: 1200,
        height: 630,
        alt: 'Agrigentech — Cameron Highlands Fresh Produce',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agrigentech Sdn Bhd | Cameron Highlands Fresh Produce Wholesale',
    description:
      'Premium vegetables and cut flowers wholesale supplier from Cameron Highlands. Supplying hotels, supermarkets and F&B groups across Malaysia.',
    images: [
      'https://images.pexels.com/photos/1459339/pexels-photo-1459339.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable}`}>
      <body
        className="min-h-screen font-sans"
        style={{ backgroundColor: 'var(--ivory)', fontFamily: 'var(--font-dm-sans), sans-serif' }}
      >
        <div className="page-fade-in">
          {children}
        </div>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
