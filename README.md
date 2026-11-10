# ShopBoard — Akari Desk Atelier (Next.js 15 Edition)

> An architectural, minimalist e-commerce and 3D interactive desk workspace atelier built with **Next.js 15 (App Router)**, **React 19**, **Tailwind CSS v4**, and **shadcn/ui**. Fully localized with native RTL Arabic typography.

[![Next.js 15](https://img.shields.io/badge/Next.js-15.5-black?logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0-61dafb?logo=react)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript Strict](https://img.shields.io/badge/TypeScript-Strict_Zero_Any-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Vitest Passing](https://img.shields.io/badge/Vitest-14%2F14_Passed-6e9f18?logo=vitest)](https://vitest.dev/)

---

## 🌟 Assignment Specification Checklist

This repository directly fulfills all criteria of the **ShopBoard on Next.js** assignment:

| Assignment Requirement | Implementation Detail | Status |
| :--- | :--- | :---: |
| **Next.js App Router** | Feature-sliced architecture (`auth`, `cart`, `orders`, `products`, `settings`), centralized `apiClient`, dynamic `[id]` pages, `loading.tsx` suspense skeletons, and custom `not-found.tsx` handlers. | ✅ Complete |
| **Tailwind Only** | Zero CSS files except `src/app/globals.css`. Fully responsive mobile-first layouts with smooth, anti-FOUC **Dark Mode** toggle. | ✅ Complete |
| **components/ui** | Canonical, typed design system components built on Radix primitives with CVA: `Button`, `Input`, `Card`, `Badge`, and `Modal`. Used uniformly across all pages. | ✅ Complete |
| **Tokens & Rules** | Colors, border-radii, and fonts defined in the official `@theme` block in `globals.css`. Engineering rules and component explanations documented in `CLAUDE.md`. | ✅ Complete |
| **Permanent API Catalog** | All 12 API products permanently integrated into the store catalog (total of 22 curated items) alongside local Next.js Route Handler `/api/products`. | ✅ Complete |

---

## 🏛️ Project Architecture

```text
shopboard-nextjs/
├── CLAUDE.md                     # Engineering standards & component defense guide
├── components.json               # shadcn/ui configuration
├── public/                       # Static public assets (plate backgrounds, products, icons)
├── src/
│   ├── app/                      # Next.js 15 App Router
│   │   ├── layout.tsx            # Root layout: RTL, fonts, anti-FOUC theme script
│   │   ├── loading.tsx           # Global suspense fallback skeleton
│   │   ├── not-found.tsx         # Global 404 handler
│   │   ├── page.tsx              # Showcase / Home page
│   │   ├── globals.css           # Single stylesheet: @theme, tokens & utilities
│   │   ├── icon.svg              # SVG dynamic Favicon
│   │   ├── manifest.ts           # PWA Web Manifest
│   │   ├── api/products/route.ts # Native Next.js Route Handler
│   │   ├── auth/page.tsx         # Authentication (Login / Register)
│   │   ├── cart/page.tsx         # Slide-over turned full Cart & Checkout page
│   │   ├── desk-builder/page.tsx # 3D WebGL Desk Atelier (ssr: false)
│   │   ├── orders/page.tsx       # Orders management, KPIs & status filters
│   │   ├── products/
│   │   │   ├── page.tsx          # Catalog browsing & multi-criteria filter
│   │   │   ├── loading.tsx       # Catalog loading shimmer
│   │   │   └── [id]/
│   │   │       ├── page.tsx      # Dynamic product detail page with SEO metadata
│   │   │       ├── loading.tsx   # Product detail loading shimmer
│   │   │       └── not-found.tsx # 404 for non-existent items
│   │   └── settings/page.tsx     # Atelier preferences, theme & address book
│   ├── components/
│   │   ├── ui/                   # Canonical UI primitives (Button, Input, Card, Badge, Modal, ThemeToggle)
│   │   └── layout/               # Header, Footer, Providers
│   ├── desk-builder/             # WebGL Three.js interactive 3D studio
│   ├── modules/                  # Feature-sliced domain modules
│   │   ├── auth/                 # Credential validation, session state
│   │   ├── cart/                 # Delta cart mutations, coupons, pricing math
│   │   ├── orders/               # Order tracking, 4-state async view, receipts
│   │   ├── products/             # Catalog browsing, search, pure sorting logic
│   │   └── settings/             # User settings & preferences
│   └── shared/                   # Cross-cutting infrastructure (apiClient, utils, icons)
└── tests/
    └── unit/                     # Vitest unit test suites (*.logic.test.ts)
```

---

## 🎨 Design Tokens (`@theme` in `src/app/globals.css`)

All design tokens follow the **Akari Desk Atelier** design language (inspired by Isamu Noguchi's paper lanterns and Japanese joinery):

- **Washi Ivory (`--color-washi-ivory: #f2eada`)**: Light background evoking fibrous Japanese paper.
- **Washi Cream (`--color-washi-cream: #f6efe1`)**: Card and elevated panel background.
- **Charcoal Ink (`--color-charcoal-ink: #252522`)**: Deep sumi-ink typography and primary buttons.
- **Bamboo Tan (`--color-bamboo-tan: #ccb693`)**: Warm architectural accents and selection highlights.
- **Bamboo Border (`--color-bamboo-border: #d4be9b`)**: Subtle structural dividers.
- **Vermilion Seal (`--color-vermilion-seal: #c23828`)**: Traditional red hanko stamp for discounts and alerts.
- **Bamboo Green (`--color-bamboo-green: #2e6f40`)**: Organic indicator for free shipping and in-stock badges.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.18+ or 20+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Basel-brg/shopboard-nextjs.git
cd shopboard-nextjs

# Install dependencies
npm install

# Start development server with Turbopack
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing & Verification

```bash
# Run unit & pure logic test suites (14 tests)
npm test

# Run ESLint code checks
npm run lint

# Build optimized production bundle
npm run build

# Start production server
npm run start
```

---

## 📜 Defense & Component Explanations

For detailed technical explanations on why each component was built that way, pure logic isolation, and architecture decisions, see [CLAUDE.md](./CLAUDE.md).

---

## 📄 License

MIT © 2026 ShopBoard Atelier.

