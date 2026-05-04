import Link from "next/link";

const NAV_LINKS = [
  { label: "Our Produce", href: "/produce" },
  { label: "Logistics", href: "/logistics" },
  { label: "Wholesale", href: "/wholesale" },
];

export default function Navbar() {
  return (
    // sticky top-0   — keeps the bar pinned to the viewport top as the page scrolls.
    // z-50           — ensures it floats above all page content (Hero is z-20).
    // backdrop-blur-md + bg-black/20 — the glass effect: blurs whatever is
    //                  behind the element and tints it with 20 % opaque black.
    // border-b       — a hairline divider that reads as the bottom edge of the glass pane.
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-black/20 border-b border-white/10">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">

        {/* ── Logo ─────────────────────────────────────────────── */}
        <Link href="/" className="flex items-center gap-2.5 group">
          {/* Leaf / sprout icon placeholder */}
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-forest text-white transition-transform duration-300 group-hover:scale-110">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-12 3.5S2 10 2 10s5-1 5-3.5C7 4 9 3 12 3c5 0 5-5 5-5V8Z" />
            </svg>
          </span>
          <span className="text-lg font-semibold tracking-tight text-white">
            Agri<span className="text-amber-300">gen</span>tech
          </span>
        </Link>

        {/* ── Nav links ────────────────────────────────────────── */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-sm font-medium text-white/80 transition-colors duration-200 hover:text-white"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ── CTA button ───────────────────────────────────────── */}
        <Link
          href="/contact"
          className="rounded-full bg-brand-forest px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:brightness-125 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
        >
          Contact Us
        </Link>

      </div>
    </nav>
  );
}
