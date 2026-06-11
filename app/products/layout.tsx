import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Products | Fresh Vegetables & Cut Flowers | Agrigentech',
  description:
    'Browse our full range of Cameron Highlands farm fresh vegetables and cut flowers. Wholesale pricing available for hotels, supermarkets and F&B groups.',
  alternates: { canonical: 'https://agrigentechsdnbhd.com/products' },
  openGraph: {
    title: 'Our Products | Fresh Vegetables & Cut Flowers | Agrigentech',
    description:
      'Browse our full range of Cameron Highlands farm fresh vegetables and cut flowers. Wholesale pricing available for hotels, supermarkets and F&B groups.',
    url: 'https://agrigentechsdnbhd.com/products',
  },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
