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
  const [textVisible, setTextVisible] = useState(true);

  const goTo = useCallback((index: number) => {
    setTextVisible(false);
    setTimeout(() => {
      setActive(index);
      setTextVisible(true);
    }, 260);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTextVisible(false);
      setTimeout(() => {
        setActive((prev) => (prev + 1) % slides.length);
        setTextVisible(true);
      }, 260);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="relative overflow-hidden w-full"
      style={{ height: 500 }}
    >
      {/* Background images — all rendered, opacity controlled */}
      {slides.map((slide, i) => (
        <div
          key={i}
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: i === active ? 1 : 0,
            transition: 'opacity 0.7s ease',
          }}
        />
      ))}

      {/* Dark green overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(26,58,34,0.65)',
        }}
      />

      {/* Text content */}
      <div
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 md:px-10 text-center"
        style={{
          opacity: textVisible ? 1 : 0,
          transform: textVisible ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.26s ease, transform 0.26s ease',
        }}
      >
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
          style={{ fontFamily: 'var(--font-playfair), serif', color: '#ffffff' }}
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
          style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            color: 'rgba(245,240,232,0.85)',
            lineHeight: 1.75,
          }}
        >
          {slides[active].body}
        </p>
      </div>

      {/* Dot navigation */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2.5">
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
