const CATEGORIES = [
  {
    icon: "🥦",
    title: "Vegetables",
    description:
      "Seasonal harvests including leafy greens, root vegetables, and specialty crops — grown regeneratively without synthetic inputs.",
    tags: ["Leafy Greens", "Root Crops", "Specialty"],
  },
  {
    icon: "🌸",
    title: "Flowers",
    description:
      "Fresh-cut and preserved varieties for wholesale floral, event décor, and export markets sourced from our high-altitude farms.",
    tags: ["Fresh-cut", "Preserved", "Export Grade"],
  },
  {
    icon: "🌿",
    title: "Plants",
    description:
      "Potted, nursery, and landscape-ready collections for retail chains, hotel landscaping, and commercial buyers.",
    tags: ["Potted", "Nursery", "Landscape"],
  },
];

export default function ProduceGrid() {
  return (
    <section className="bg-brand-ivory py-28 px-6">
      <div className="mx-auto max-w-6xl">

        {/* Section header — Flexbox: single axis, centred */}
        <div className="mb-16 flex flex-col items-center gap-3 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">
            What We Grow
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-brand-forest md:text-5xl">
            Produce Categories
          </h2>
          <p className="mt-2 max-w-xl text-base text-brand-forest/60">
            Three verticals, one supply chain. Direct from farm to your
            distribution centre.
          </p>
        </div>

        {/*
          CSS Grid here: three cards must form a strict 2-column-then-3-column
          layout that stays perfectly aligned across rows regardless of card
          content height. Grid enforces row-height equality across all cells —
          Flexbox would let taller cards stretch while shorter ones don't match.
        */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map(({ icon, title, description, tags }) => (
            <div
              key={title}
              className="group flex flex-col gap-5 rounded-2xl border border-brand-forest/20 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-forest/50 hover:shadow-md"
            >
              {/* Icon badge */}
              <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-forest/8 text-3xl">
                {icon}
              </span>

              {/* Title + description — Flexbox column: vertical stacking */}
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-brand-forest">{title}</h3>
                <p className="text-sm leading-relaxed text-brand-forest/60">
                  {description}
                </p>
              </div>

              {/* Tags — Flexbox row: inline chips that wrap naturally */}
              <div className="mt-auto flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-brand-forest/20 px-3 py-1 text-xs font-medium text-brand-forest/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
