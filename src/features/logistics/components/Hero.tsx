"use client";

import { motion } from "framer-motion";

interface HeroProps {
  videoSrc?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
}

export default function Hero({
  videoSrc = "/videos/farm-hero.mp4",
  ctaLabel = "Shop Now",
  onCtaClick,
}: HeroProps) {
  return (
    // Layer 1 — the positioning context.
    // `relative` establishes a stacking context so every absolute child
    // is anchored to this element, not the viewport or a distant ancestor.
    <section className="relative h-screen w-full overflow-hidden">

      {/* Layer 2 — background video (z-0)
          `absolute inset-0` stretches all four edges to the section boundaries.
          z-0 is the lowest layer — everything else sits on top of it. */}
      <video
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />

      {/* Layer 3 — dark overlay (z-10)
          Same absolute+inset-0 trick, but z-10 places it above the video.
          bg-black/60 is 60 % opaque black, tinting the video underneath. */}
      <div className="absolute inset-0 z-10 bg-black/60" />

      {/* Layer 4 — foreground content (z-20)
          `relative` here pulls it out of the normal flow baseline so that
          `z-20` actually takes effect — z-index only applies to positioned
          elements (relative / absolute / fixed / sticky).
          flex+items-center+justify-center centres the content. */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center">

        {/* Framer Motion fade-in: starts invisible and 24 px lower,
            then animates to fully visible at its natural position. */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="flex flex-col items-center gap-8"
        >
          <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
            Sustainably Grown,{" "}
            <span className="block text-amber-300">Harvested Fresh</span>
          </h1>

          <p className="max-w-xl text-lg text-white/80">
            From our fields to your table — traceable, regenerative, real.
          </p>

          {/* Glassmorphism CTA button
              backdrop-blur-md  — blurs whatever is behind the button (the video/overlay)
              bg-white/20       — semi-transparent white fill
              border-white/30   — faint white border, enhances the "glass" edge
              The result is a frosted-glass panel floating above the scene. */}
          <button
            onClick={onCtaClick}
            className="rounded-full border border-white/30 bg-white/20 px-10 py-4 text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/30 hover:shadow-lg hover:shadow-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            {ctaLabel}
          </button>
        </motion.div>

      </div>
    </section>
  );
}
