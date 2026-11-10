# ShopBoard (Next.js Edition) — Engineering Standards & UI Architecture

This document serves as the primary technical specification, UI rules reference, and architecture guide for ShopBoard on Next.js 15, matching the assignment criteria.

---

## 1. Project Overview & Tech Stack

- **Framework**: Next.js 15 (App Router with `src/app/`), React 19, TypeScript (Strict mode, zero `any` policy).
- **Styling**: Tailwind CSS v4 only — no CSS files except `src/app/globals.css`.
- **Design Tokens**: Defined in `@theme` block in `globals.css` (Akari Desk Atelier aesthetic: Warm Stone, Washi Ivory, Bamboo Tan, Charcoal Ink, Vermilion Seal).
- **UI Components**: Canonical `components/ui/` design system (`Button`, `Input`, `Card`, `Badge`, `Modal`) built with Radix UI and Class Variance Authority (`cva`).
- **Dark Mode**: Native Tailwind dark mode (`@custom-variant dark`), with smooth color inversion and persistent theme switching (`ThemeToggle`).
- **State Management**: React Context API + Custom Hooks per feature module; zero external state dependencies.
- **Data Flow & Logic**: Pure logic isolated in `*.logic.ts` with unit test coverage; single unified API client (`src/shared/api/client.ts`).
- **Localization**: Native RTL Arabic (`lang="ar" dir="rtl"`), styled with Readex Pro and IBM Plex Sans Arabic.

---

## 2. Next.js App Router Structure

The project follows a full-page architecture (zero popups for primary routes) with strict Next.js App Router conventions:

```text
src/app/
├── layout.tsx               # Root layout: RTL, fonts, providers, anti-FOUC theme script
├── loading.tsx              # Root Suspense fallback skeleton
├── not-found.tsx            # Global 404 page
├── page.tsx                 # Showcase / Home page (Server Component)
├── globals.css              # Only CSS file in project: @theme, tokens, base & utilities
├── icon.svg                 # SVG dynamic Favicon
├── apple-icon.svg           # Apple touch icon
├── manifest.ts              # PWA Web Manifest
├── auth/
│   └── page.tsx             # Full authentication page (Login & Register)
├── cart/
│   └── page.tsx             # Full shopping cart, coupon application & checkout
├── desk-builder/
│   └── page.tsx             # 3D WebGL Desk Atelier (Client Component, ssr: false)
├── orders/
│   └── page.tsx             # Order management, KPIs, status filtering & search
├── products/
│   ├── page.tsx             # Product catalog listing (List)
│   ├── loading.tsx          # Catalog loading skeleton
│   └── [id]/
│       ├── page.tsx         # Product detail dynamic page ([id])
│       ├── loading.tsx      # Product detail loading skeleton
│       └── not-found.tsx    # Product 404 handler
└── settings/
    └── page.tsx             # Atelier settings, preferences, address book & theme
```

---

## 3. Tailwind Design System & `@theme` Tokens

All tokens are declared in `src/app/globals.css` using Tailwind v4 `@theme`:

```css
@theme {
  /* Palette Colors */
  --color-washi-ivory: #f2eada;
  --color-washi-cream: #f6efe1;
  --color-paper-ash: #eae5d8;
  --color-well-ash: #e5dfd2;
  --color-bamboo-tan: #ccb693;
  --color-bamboo-border: #d4be9b;
  --color-rib-shadow: #c3b5a2;
  --color-charcoal-ink: #252522;
  --color-charcoal-deep: #12100f;
  --color-muted-umeboshi: #686358;
  --color-vermilion-seal: #c23828;
  --color-bamboo-green: #2e6f40;

  /* Semantic UI Colors mapped to CSS variables */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);

  /* Border Radii */
  --radius-xs: 0.125rem;
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.5rem;

  /* Typography */
  --font-sans: 'IBM Plex Sans Arabic', 'Readex Pro', sans-serif;
  --font-display: 'Readex Pro', 'IBM Plex Sans Arabic', sans-serif;
  --font-mono: 'IBM Plex Mono', monospace;
}
```

### Dark Mode Mechanics
- Defined via `@custom-variant dark (&:where(.dark, .dark *));`.
- In light mode (`:root`), background is warm Washi Ivory (`#f2eada`) and foreground is Charcoal Ink (`#252522`).
- In dark mode (`.dark`), background is Deep Charcoal Ink (`#12100f`), cards are Warm Obsidian (`#1a1816`), and text is Washi Ivory (`#f2eada`).
- `ThemeToggle` component in `src/components/ui/theme-toggle.tsx` synchronizes `localStorage.theme` and updates the `dark` class on `document.documentElement` without layout shift or flash of unstyled content.

---

## 4. Canonical UI Primitives (`src/components/ui/`)

All reusable UI primitives live strictly in `src/components/ui/` with typed props and variants, used everywhere across features and never duplicated:

| Component | Path | Variants / Features | Why Built That Way |
| :--- | :--- | :--- | :--- |
| **`Button`** | `components/ui/button.tsx` | Variants: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`<br>Sizes: `default`, `sm`, `lg`, `icon`<br>Polymorphic: `asChild` via Radix Slot | Type-safe action buttons supporting both `<button>` and Next.js `<Link>` with consistent focus states. |
| **`Input`** | `components/ui/input.tsx` | Full-width, accessible form control with RTL focus ring | Standardized inputs for search, forms, and coupon codes with consistent border and focus tokens. |
| **`Card`** | `components/ui/card.tsx` | Composable: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` | Modular presentation containers for products, checkout summaries, orders, and KPI blocks. |
| **`Badge`** | `components/ui/badge.tsx` | Variants: `default`, `secondary`, `destructive`, `outline` | Compact status indicators for order states, categories, stock counters, and discounts. |
| **`Modal`** | `components/ui/modal.tsx` | Sizes: `sm`, `default`, `lg`, `xl`, `full`<br>Props: `isOpen`, `onClose`, `title`, `description`, `footer`, `children` | Accessible modal built over Radix UI Dialog with automatic focus trapping, backdrop blur, and Escape key dismissal. |

---

## 5. Feature Modules Architecture (`src/modules/`)

Every feature module strictly follows this blueprint:

```text
src/modules/<feature-name>/
├── <feature>.types.ts         # TypeScript definitions (DTOs, domain models, state shapes)
├── <feature>.api.ts           # Remote API communication via shared apiClient
├── <feature>.logic.ts         # Pure deterministic logic (Zero React, zero hooks, unit tested)
├── context/                   # React Context Provider & Custom Hook ('use client')
│   ├── <Feature>Context.tsx
│   └── use<Feature>.ts
└── components/                # Presentation & Container components
    ├── <Feature>Container.tsx # Smart Container implementing the 4-state lifecycle
    └── <Feature>*.tsx         # Presentational components using components/ui
```

### Feature Breakdown:
1. **`auth`**: User registration, credential validation, session persistence, and profile management.
2. **`cart`**: Slide-over and full `/cart` page with delta item mutation (`updateQuantity(id, +1/-1)`), coupon validation, and subtotal calculation.
3. **`orders`**: Order management, 4-state async lifecycle, order KPIs, status filtering, and modal receipt preview.
4. **`products`**: Catalog browsing, multi-criteria filtering (category, price range, search query, sorting), and dynamic detail route.
5. **`settings`**: Atelier preferences, notification toggles, address management, and currency/language switching.

---

## 6. Mandatory Engineering Rules

1. **No In-Place Array Mutation**:
   - Sorters and filters must always slice or clone first: `[...items].sort(...)`.
   - Selecting "Default" sort returns the original catalog order.
2. **Centralized API Client**:
   - All HTTP operations must go through `src/shared/api/client.ts`. Never use raw `fetch()` in components.
3. **Mandatory 4-State UI Lifecycle**:
   - Every async or data-driven view must handle:
     - `loading`: Visual skeleton placeholder (`<*Skeleton />`).
     - `error`: Error banner with actionable "Try Again" retry trigger.
     - `empty`: Distinguish between `no-items` (dataset empty) and `no-match` (active filters yield 0 results).
     - `success`: Rendered list/cards.
4. **Delta Cart Mutators**:
   - Cart quantities must always use delta semantics (`updateQuantity(id, +1)` or `updateQuantity(id, -1)`) to avoid stale state races.
5. **Three.js / WebGL SSR Isolation**:
   - 3D interactive canvas components (`@react-three/fiber`) must reside inside client components and be dynamically imported with `ssr: false`.
6. **Zero `any` Policy**:
   - Use strict interfaces and runtime type guards (`if ('id' in item)`) across all modules.

---

## 7. Be Ready to Explain (Defense Guide)

When presenting any component in this codebase:

- **What does `components/ui/modal.tsx` do?**
  - It wraps Radix UI's accessible Dialog primitive using Class Variance Authority (`cva`). It guarantees keyboard trapping, screen reader ARIA labels, escape key listeners, and uniform styling in both light and dark modes.
- **Why are calculations in `*.logic.ts`?**
  - Isolating calculations (shipping thresholds, coupon percentages, sorting algorithms) as pure functions makes them deterministic, easy to unit test with Vitest without mounting React, and decoupled from framework lifecycles.
- **Why is there no custom CSS file besides `globals.css`?**
  - To respect Next.js and Tailwind v4 best practices, eliminating stylesheet sprawl and specificity conflicts. All design tokens are compiled via `@theme` into high-performance utility classes.
- **How is Dark Mode implemented?**
  - We use Tailwind's `@custom-variant dark` along with CSS variable token re-mapping. When `.dark` is added to `<html>`, all components automatically adopt dark palette tokens without requiring component-level conditional classes. An inline script in `src/app/layout.tsx` eliminates theme flashing (FOUC).

---

## 8. Development & Deployment Commands

```bash
# Development
npm run dev          # Start local dev server (Turbopack)

# Quality Gates
npm test             # Run Vitest unit & logic test suite
npm run lint         # Run ESLint code checks

# Production & Vercel
npm run build        # Build optimized production bundle
npm run start        # Start production server
```

