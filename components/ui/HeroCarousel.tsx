'use client';

import { useState, useEffect, useCallback } from 'react';

const slides = [
  {
    label: 'Who We Are',
    title: 'Cameron Highlands\' Finest Farm',
    body: 'Agrigentech Sdn Bhd is dedicated to providing quality agriculture — vegetables, flowers and pot plants grown on our 500+ acre farm. We build long-term relationships through quality service and customer support.',
  },
  {
    label: 'What We Provide',
    title: '70+ Varieties, Delivered Daily',
    body: 'From fresh vegetables to beautiful cut flowers — all grown in Cameron Highlands and supplied daily to hotels, supermarkets and F&B groups across Malaysia with free chilled truck delivery.',
  },
  {
    label: 'Our Retail Stores',
    title: '10+ Cameron Harvest Stores',
    body: 'Find us across Peninsular Malaysia — Sg Buloh, Kampung Baru, Pulau Pinang and more. Open Sunday to Friday, 9am–9pm. Farm-fresh produce straight to your community.',
  },
];

const INTERVAL = 4000;

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);

  const goTo = useCallback((index: number) => {
    setVisible(false);
    setTimeout(() => {
      setActive(index);
      setVisible(true);
    }, 260);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setActive((prev) => (prev + 1) % slides.length);
        setVisible(true);
      }, 260);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <section style={{ backgroundColor: '#f5f0e8' }}>
      <div className="mx-auto max-w-4xl px-6 md:px-10 py-20">
        {/* Slide content */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.26s ease, transform 0.26s ease',
            textAlign: 'center',
            minHeight: 260,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Icon */}
          <div
            className="mb-5 flex items-center justify-center rounded-2xl"
            style={{
              width: 72,
              height: 72,
              backgroundColor: 'rgba(26,58,34,0.07)',
              border: '1.5px solid rgba(26,58,34,0.12)',
              fontSize: 32,
            }}
          >
            {slides[active].icon}
          </div>

          {/* Label */}
          <span
            className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: '#b8860b' }}
          >
            {slides[active].label}
          </span>

          {/* Title */}
          <h2
            className="mb-4 text-3xl md:text-4xl font-bold leading-snug"
            style={{ fontFamily: 'var(--font-playfair), serif', color: '#1a3a22' }}
          >
            {slides[active].title}
          </h2>

          {/* Divider */}
          <div
            className="mb-5"
            style={{ width: 56, height: 3, backgroundColor: '#b8860b', borderRadius: 999 }}
          />

          {/* Body */}
          <p
            className="max-w-2xl text-base md:text-lg leading-relaxed"
            style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: '#4a5c4e', lineHeight: 1.75 }}
          >
            {slides[active].body}
          </p>
        </div>

        {/* Dot navigation */}
        <div className="mt-10 flex items-center justify-center gap-2.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                height: 8,
                width: i === active ? 24 : 8,
                borderRadius: 999,
                backgroundColor: i === active ? '#b8860b' : '#d4c9a8',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'width 0.3s ease, background-color 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
