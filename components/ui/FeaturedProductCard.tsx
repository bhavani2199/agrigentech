'use client';

import { useState } from 'react';

interface FeaturedProduct {
  id: string;
  name: string;
  category: 'vegetables' | 'flowers';
  image_url: string | null;
  price: number | null;
  unit: string | null;
}

const WA_BASE = 'https://wa.me/60102552554';

export default function FeaturedProductCard({ product }: { product: FeaturedProduct }) {
  const [hovered, setHovered] = useState(false);
  const waLink = `${WA_BASE}?text=Hi%20Agrigentech%2C%20I%27d%20like%20to%20enquire%20about%20${encodeURIComponent(product.name)}`;
  const priceLabel = product.price != null ? `RM ${Number(product.price).toFixed(2)} / ${product.unit ?? 'kg'}` : null;
  const initial = product.name.charAt(0).toUpperCase();

  return (
    <div
      className="flex flex-col overflow-hidden"
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
      {/* Image area */}
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
        {/* Hover overlay */}
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

      {/* Info block */}
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
