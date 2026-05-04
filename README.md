# Agrigentech
### Premium Agricultural Wholesaler Platform

> A high-performance, SEO-optimized web platform built to replace a legacy Wix site — purpose-engineered for B2B wholesale buyers, logistics partners, and international export clients.

---

## The Mission

Agrigentech's previous web presence was built on Wix. A site audit identified three compounding problems: poor Core Web Vitals scores driven by unoptimized JS bundles, near-zero crawlability for dynamic content, and no path to custom backend integration for wholesale inquiry management.

This project is the full technical migration — rebuilt from scratch on Next.js with the App Router, a feature-based codebase architecture, and a Firestore-ready data layer. The goal is a platform that earns organic traffic on high-intent B2B search terms while giving the operations team a structured foundation to extend.

---

## Tech Stack

| Layer | Technology | Rationale |
|---|---|---|
| Framework | Next.js 16 (App Router) | RSC-first rendering, built-in image/font optimisation, file-based routing |
| Language | TypeScript 5 | Strict mode throughout — catches contract violations at compile time, not runtime |
| Styling | Tailwind CSS v4 | CSS-native `@theme` config, no PostCSS plugin overhead, utility-first design tokens |
| Animation | Framer Motion v12 | Declarative motion with `useInView` — scroll-triggered counters, fade-in sequences |
| Data (planned) | Firebase / Firestore | Serverless wholesale inquiry storage, real-time order tracking |
| Deployment | Vercel | Zero-config CI/CD, Edge Network, automatic preview URLs per PR |

---

## Architecture

```
src/
├── app/                        # Next.js App Router — layouts, pages, global CSS
│   ├── globals.css             # Tailwind v4 @theme — brand tokens, base styles
│   ├── layout.tsx              # Root layout: fonts, Navbar mount point
│   └── page.tsx                # Home route — composes feature sections
│
├── components/
│   └── ui/                     # Reusable, design-system-level primitives
│       └── Navbar.tsx          # Sticky glassmorphism navigation bar
│
├── features/                   # Vertical feature slices — self-contained modules
│   └── logistics/
│       └── components/
│           ├── Hero.tsx         # Cinematic full-viewport entry section
│           ├── StatsSection.tsx # Scroll-triggered animated business metrics
│           ├── ProduceGrid.tsx  # Category grid: Vegetables, Flowers, Plants
│           └── WholesaleCTA.tsx # WhatsApp-linked wholesale conversion section
│
├── core/                       # (planned) Shared utilities, hooks, API clients
├── hooks/                      # (planned) Custom React hooks
└── public/                     # Static assets, favicons
```

### Design Philosophy

**Feature-based slices over layer-based folders.** Each directory under `features/` owns everything it needs: components, hooks, types, and (eventually) API calls. A `logistics` feature doesn't scatter its files across `components/`, `hooks/`, and `utils/` at the top level — it keeps them co-located. This makes features portable and deletable without archaeology.

**`src/components/ui/` for truly shared primitives.** The Navbar, future Button, Badge, and Modal components live here because they cross feature boundaries. These are the design system layer — they consume brand tokens but carry no business logic.

**Absolute imports via `@/`.** The `tsconfig.json` path alias resolves `@/*` to `./src/*`, eliminating relative path fragility (`../../components/...`) across the entire codebase.

---

## Design System

Brand tokens are declared once in `src/app/globals.css` using Tailwind v4's `@theme` directive and consumed as utility classes everywhere:

```css
@theme inline {
  --color-brand-forest: #1a3a22;   /* Primary — CTAs, borders, headings */
  --color-brand-ivory:  #f5f0e8;   /* Background — body, card surfaces   */
  --color-brand-gold:   #b8860b;   /* Accent — labels, stat suffixes      */
}
```

Updating a colour across the entire application is a one-line change in a single file.

---

## Key Features

### Cinematic Hero Section
Full-viewport background video with a dark compositing overlay and a Framer Motion entrance sequence. Three stacking layers managed with explicit `z-index` values ensure the video, overlay, and foreground content never fight for position. The CTA uses a glassmorphism treatment (`backdrop-blur-md`, `bg-white/20`) that works on both dark and light scroll contexts.

### Sticky Glassmorphism Navbar
`position: sticky` keeps the bar in document flow — no padding hacks required. `backdrop-filter: blur` with a semi-transparent fill creates the frosted-glass effect. Sits at `z-50`, above all page content. Includes the brand logo, three B2B navigation links, and a `brand-forest` Contact CTA with keyboard focus ring.

### Scroll-Triggered Animated Counters
`useInView` from Framer Motion fires the counter animation only when the section enters the viewport. Each counter runs an imperative `animate(0, target)` tween with `ease: "easeOut"`, staggered by 150 ms per item. Numbers are locale-formatted (`toLocaleString`) for internationalisation readiness.

### Firestore-Ready Produce Grid
A three-column CSS Grid layout for Vegetables, Flowers, and Plants. Grid is used over Flexbox specifically to enforce cross-row alignment — card height stays consistent regardless of description length. The data shape (`icon`, `title`, `description`, `tags[]`) is structured to be a direct Firestore document read with zero schema changes.

### WhatsApp Wholesale CTA
Deep-links to WhatsApp Business via `wa.me/` with a URL-encoded pre-filled message. Reduces friction for B2B buyers to zero — one tap opens a conversation with context already written. Sits on a `brand-forest` background for strong visual separation from the product content above.

---

## Getting Started

**Prerequisites:** Node.js 18+, npm 9+

```bash
# 1. Clone the repository
git clone https://github.com/bhavani2199/agrigentech.git
cd agrigentech

# 2. Install dependencies
npm install

# 3. Start the development server (Turbopack)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The server starts in ~300 ms with Turbopack.

```bash
# Type-check the project
npx tsc --noEmit

# Production build
npm run build
npm start
```

---

## Why This Stack?

The Wix audit surfaced two root causes for poor search performance:

1. **JavaScript bundle size.** Wix ships a monolithic client runtime regardless of what a page actually uses. Next.js with React Server Components renders the static shell on the server and ships zero JS for components that don't need interactivity — the Navbar, ProduceGrid, and WholesaleCTA are all server components.

2. **Metadata control.** Wix limits structured data and `<head>` customisation. Next.js's `generateMetadata` API gives full per-page control over Open Graph tags, JSON-LD product schema, and canonical URLs — the three signals that most directly affect B2B keyword rankings.

**Tailwind CSS v4** was chosen over v3 specifically because v4 eliminates the `tailwind.config.ts` file for simple projects — brand tokens live in CSS, not JavaScript, which makes them accessible to non-JS tooling and reduces build-step coupling.

**Framer Motion** was preferred over CSS-only animation for the counters and entrance sequences because `useInView` with `once: true` gives precise scroll-trigger control that CSS `@keyframes` with `animation-play-state` cannot replicate cleanly across all browsers.

---

## Roadmap

- [ ] Firebase Auth + Firestore for wholesale inquiry management
- [ ] `/produce` dynamic catalogue pages with Firestore reads
- [ ] `next/image` optimisation pass across all visual assets
- [ ] Structured data (JSON-LD) for `Product` and `Organization` schema
- [ ] Mobile navigation drawer for the Navbar
- [ ] Vercel Analytics integration for Core Web Vitals tracking

---

## License

Private repository. All rights reserved — Agrigentech © 2026.
