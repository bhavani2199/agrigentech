"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

const STATS = [
  { target: 900_000, suffix: "+ kg", label: "Produce / Year" },
  { target: 500,     suffix: "+ Acres", label: "of Farmland" },
  { target: 15,      suffix: "+ Years", label: "Excellence" },
];

function Counter({
  target,
  suffix,
  label,
  delay,
}: {
  target: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, target, {
      duration: 2.4,
      ease: "easeOut",
      delay,
      onUpdate(v) {
        setValue(Math.floor(v));
      },
    });
    return controls.stop;
  }, [isInView, target, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="flex flex-col items-center gap-3 text-center"
    >
      <span className="text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
        {value.toLocaleString()}
        <span className="text-brand-gold">{suffix}</span>
      </span>
      <span className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
        {label}
      </span>
    </motion.div>
  );
}

export default function StatsSection() {
  const headingRef = useRef<HTMLParagraphElement>(null);
  const headingInView = useInView(headingRef, { once: true });

  return (
    <section className="bg-brand-forest py-28 px-6">
      <div className="mx-auto max-w-5xl">

        <motion.p
          ref={headingRef}
          initial={{ opacity: 0, y: 12 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-20 text-center text-xs font-bold uppercase tracking-[0.25em] text-brand-gold"
        >
          Our Scale
        </motion.p>

        {/*
          CSS Grid is used here because all three counters share the same
          row and must stay equal-width — a 2-dimensional constraint.
          `grid-cols-3` divides the row into three identical tracks without
          any math. Flexbox would need explicit widths or `flex-1` to
          achieve the same — Grid just declares intent.
        */}
        <div className="grid grid-cols-1 gap-16 sm:grid-cols-3">
          {STATS.map((stat, i) => (
            <Counter key={stat.label} {...stat} delay={i * 0.15} />
          ))}
        </div>

      </div>
    </section>
  );
}
