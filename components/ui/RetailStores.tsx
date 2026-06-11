import { MapPin } from 'lucide-react';

const stores = [
  { name: 'Sg Buloh Branch',     mapQuery: 'Sg+Buloh+Selangor+Malaysia' },
  { name: 'Kampung Baru Branch', mapQuery: 'Kampung+Baru+Kuala+Lumpur+Malaysia' },
  { name: 'Pulau Pinang Branch', mapQuery: 'Pulau+Pinang+Malaysia' },
];

export default function RetailStores() {
  return (
    <section style={{ backgroundColor: '#fff', borderTop: '1px solid #e8e0d0' }}>
      <div className="mx-auto max-w-7xl px-5 md:px-10 py-20">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{ fontFamily: 'var(--font-playfair), serif', color: '#1a3a22' }}
          >
            Cameron Harvest Stores
          </h2>
          <div className="mx-auto mb-5" style={{ width: 64, height: 3, backgroundColor: '#b8860b', borderRadius: 999 }} />
          <p
            className="text-base md:text-lg max-w-xl mx-auto"
            style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: '#4a5c4e' }}
          >
            Find us across Peninsular Malaysia
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stores.map(({ name, mapQuery }) => (
            <div
              key={name}
              className="flex flex-col items-center text-center rounded-2xl overflow-hidden transition-all duration-250"
              style={{ backgroundColor: '#1a3a22', border: '2px solid transparent' }}
            >
              <div className="pt-10 pb-6 flex flex-col items-center gap-4 px-6">
                <div
                  className="flex items-center justify-center rounded-2xl"
                  style={{ width: 56, height: 56, backgroundColor: 'rgba(184,134,11,0.18)', border: '1.5px solid rgba(184,134,11,0.40)' }}
                >
                  <MapPin size={24} strokeWidth={1.75} style={{ color: '#b8860b' }} />
                </div>
                <h3
                  className="text-xl font-bold leading-snug"
                  style={{ fontFamily: 'var(--font-playfair), serif', color: '#f5f0e8' }}
                >
                  {name}
                </h3>
              </div>
              <div className="pb-10 px-6 w-full flex justify-center">
                <a
                  href={`https://maps.google.com/?q=${mapQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-medium transition-all duration-200 hover:brightness-110"
                  style={{ backgroundColor: '#b8860b', color: '#fff', fontFamily: 'var(--font-dm-sans), sans-serif' }}
                >
                  <MapPin size={14} strokeWidth={1.75} />
                  Get Directions
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
