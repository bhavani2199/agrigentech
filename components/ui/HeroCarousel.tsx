'use client';

import { useState, useEffect, useCallback } from 'react';

const slides = [
  {
    label: 'Who We Are',
    title: "Cameron Highlands' Finest Farm",
    body: 'Agrigentech Sdn Bhd is dedicated to providing quality agriculture — vegetables, flowers and pot plants grown on our 500+ acre farm. We build long-term relationships through quality service and customer support.',
    image: 'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=1920',
  },
  {
    label: 'What We Provide',
    title: '70+ Varieties, Delivered Daily',
    body: 'From fresh vegetables to beautiful cut flowers — all grown in Cameron Highlands and supplied daily to hotels, supermarkets and F&B groups across Malaysia with free chilled truck delivery.',
    image: 'https://images.pexels.com/photos/1458694/pexels-photo-1458694.jpeg?auto=compress&cs=tinysrgb&w=1920',
  },
  {
    label: 'Our Retail Stores',
    title: '10+ Cameron Harvest Stores',
    body: 'Find us across Peninsular Malaysia — Sg Buloh, Kampung Baru, Pulau Pinang and more. Open Sunday to Friday, 9am–9pm. Farm-fresh produce straight to your community.',
    image: 'https://images.pexels.com/photos/2733918/pexels-photo-2733918.jpeg?auto=compress&cs=tinysrgb&w=1920',
  },
];

const INTERVAL = 4000;

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [sliding, setSliding] = useState(false);

  const goTo = useCallback((index: number) => {
    if (sliding || index === active) return;
    setPrev(active);
    setActive(index);
    setSliding(true);
    setTimeout(() => {
      setPrev(null);
      setSliding(false);
    }, 620);
  }, [active, sliding]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) => {
        const next = (current + 1) % slides.length;
        setPrev(current);
        setSliding(true);
        setTimeout(() => {
          setPrev(null);
          setSliding(false);
        }, 620);
        return next;
      });
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[active];

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: 650 }}
    >
      {/* Sliding background images */}
      {slides.map((s, i) => {
        let translateX = '100%';
        if (i === active) translateX = '0%';
        else if (i === prev) translateX = '-100%';

        return (
          <div
            key={i}
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${s.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: `translateX(${translateX})`,
              transition: sliding ? 'transform 600ms cubic-bezier(0.76,0,0.24,1)' : 'none',
              zIndex: i === active ? 1 : i === prev ? 0 : -1,
            }}
          />
        );
      })}

      {/* Dark green overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(26,58,34,0.72)',
          zIndex: 2,
        }}
      />

      {/* Text content — no animation, instant swap */}
      <div
        className="relative flex h-full flex-col items-center justify-center px-6 md:px-10 text-center"
        style={{ zIndex: 3 }}
      >
        {/* Label pill */}
        <span
          className="mb-5 inline-block text-xs font-semibold uppercase tracking-[0.2em]"
          style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            color: '#b8860b',
            backgroundColor: 'rgba(184,134,11,0.15)',
            border: '1px solid rgba(184,134,11,0.5)',
            padding: '4px 16px',
            borderRadius: 999,
          }}
        >
          {slide.label}
        </span>

        {/* Title */}
        <h2
          className="mb-5 font-bold leading-tight"
          style={{
            fontFamily: 'var(--font-playfair), serif',
            color: '#ffffff',
            fontSize: 'clamp(32px, 5vw, 52px)',
            textShadow: '0 2px 12px rgba(0,0,0,0.5)',
          }}
        >
          {slide.title}
        </h2>

        {/* Divider */}
        <div
          className="mb-6"
          style={{ width: 64, height: 4, backgroundColor: '#b8860b', borderRadius: 999 }}
        />

        {/* Body */}
        <p
          className="mx-auto"
          style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            color: 'rgba(255,255,255,0.92)',
            fontSize: 17,
            maxWidth: 560,
            lineHeight: 1.75,
          }}
        >
          {slide.body}
        </p>
      </div>

      {/* Dot navigation */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2.5" style={{ zIndex: 4 }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              height: 8,
              width: i === active ? 24 : 8,
              borderRadius: 999,
              backgroundColor: i === active ? '#b8860b' : 'rgba(255,255,255,0.55)',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'width 0.3s ease, background-color 0.3s ease',
            }}
          />
        ))}
      </div>
    </section>
  );
}
