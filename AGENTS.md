# ShopBoard (Next.js Edition) - AI Agent Rules & Engineering Standards

Single source of truth for any AI agent (Claude, Antigravity, Cursor, etc.) working on this project.
Read this file before making any changes. If you learn something durable about the project
(architecture decisions, conventions, gotchas, TODOs), document it here.

---

## 1. The Stack

- **Framework & Runtime**: Next.js 15 (App Router with `src/app/`), React 19, TypeScript (strict mode, zero `any` policy).
- **Component & UI System**: Tailwind CSS + shadcn/ui (Radix UI primitives) styled with the *Akari Desk Atelier* aesthetic design tokens (`:root` CSS variables: Warm Stone, Washi Ivory, Deep Emerald, Bamboo Tan, and Charcoal Ink).
- **3D Graphics Engine**: Three.js via React Three Fiber (`@react-three/fiber`) & `@react-three/drei`, strictly isolated behind client boundaries (`'use client'`) and dynamically loaded with `ssr: false`.
- **State Management**: Native React Context API + Custom Hooks for client-side state (Cart, Auth, Modals/Drawers). Zero external state libraries like Redux or Zustand.
- **Testing**: Vitest + React Testing Library (`@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `jsdom`) & Playwright (Multi-browser E2E Tests with Chromium).
- **Linter & Formatter**: ESLint 9 (Next.js core-web-vitals configuration) & Prettier with Husky + lint-staged pre-commit hooks.
- **Localization**: Full RTL Arabic support (`<html lang="ar" dir="rtl">`), styled with Readex Pro and IBM Plex Sans Arabic.

---

## 2. Folder Structure & Where a New Feature Goes

### Project Folder Structure

```text
shopboard-next/
├── public/                       # Static public assets (3D models, textures, icons, manifest)
├── src/
│   ├── app/                      # Next.js 15 App Router
│   │   ├── layout.tsx            # Root layout: RTL, fonts, Global Providers, Akari tokens
│   │   ├── page.tsx              # Home / Showcase page (Server Component)
│   │   ├── globals.css           # Tailwind directives & Akari Desk Atelier CSS variables
│   │   ├── products/
│   │   │   ├── page.tsx          # Catalog browsing page (Server Component)
│   │   │   └── [id]/page.tsx     # Product details with dynamic SEO metadata
│   │   ├── cart/page.tsx         # Cart review & checkout page
│   │   └── api/                  # Next.js Route Handlers (REST endpoints)
│   ├── components/               # Shared UI Primitives & Layout
│   │   ├── ui/                   # shadcn/ui primitives (button, dialog, sheet, toast, etc.)
│   │   ├── providers.tsx         # Combined Client Providers wrapper ('use client')
│   │   └── layout/               # Header, Footer, Navigation, RTL drawer
│   ├── desk-builder/             # 3D Interactive WebGL Desk Atelier
│   │   ├── DeskStudioContainer.tsx # 'use client' + dynamic no-SSR wrapper
│   │   ├── studio-scene.tsx      # R3F Canvas, studio lighting, camera, materials
│   │   ├── studio-catalog.ts     # Procedural 3D mesh definitions & accessories
│   │   ├── studio-interaction.ts # Raycasting, dragging, placement controls
│   │   ├── studio-cart.ts        # Pricing calculation & cart conversion
│   │   └── types.ts              # 3D scene & accessory types
│   ├── modules/                  # Feature-sliced domains
│   │   ├── auth/                 # Authentication, user profile, credentials validation
│   │   ├── cart/                 # Slide-over cart, coupons, checkout calculation
│   │   ├── orders/               # Order history, status tracker, 4-state async view
│   │   └── products/             # Catalog browsing, filtering, search, pure logic
│   └── shared/                   # Cross-cutting reusable infrastructure
│       ├── api/
│       │   └── client.ts         # Centralized HTTP/Fetch client (ApiException)
│       ├── lib/
│       │   └── utils.ts          # shadcn cn() helper (clsx + tailwind-merge)
│       └── validation/           # Shared form validators & regex patterns
└── tests/
    ├── setup.ts                  # Testing Library & Vitest DOM matchers setup
    ├── unit/                     # Pure logic unit tests (*.logic.test.ts)
    ├── component/                # React Testing Library component tests (*.test.tsx)
    └── e2e/                      # Playwright browser end-to-end test suites (*.spec.ts)
├── vitest.config.ts              # Vitest configuration with jsdom & path aliases
└── playwright.config.ts          # Playwright E2E configuration & local webServer
```

### Where a New Feature Goes

When creating a **new feature** (e.g. `reviews`, `wishlist`, `discounts`), **always** create a dedicated folder under `src/modules/<feature-name>/` following this exact blueprint:

```text
src/modules/<feature-name>/
├── <feature>.types.ts         # 1. Type definitions: domain entities, DTOs, prop types, state shapes
├── <feature>.api.ts           # 2. Data / API: remote calls using shared apiClient or Route Handlers
├── <feature>.logic.ts         # 3. Pure Logic: pure functions, calculations, algorithms (Zero React/Hooks)
├── context/                   # 4. State & Context: React Context Provider and Custom Hook ('use client')
│   ├── <Feature>Context.tsx
│   └── use<Feature>.ts
└── components/                # 5. Smart / Dumb Component Split
    ├── <Feature>Container.tsx # Smart/Container: connects to context, handles async lifecycle
    ├── <Feature>List.tsx      # Presentational: pure props, renders lists, emits callbacks
    ├── <Feature>Card.tsx      # Presentational: atomic display card
    └── <Feature>Skeleton.tsx  # Presentational: loading placeholder (shadcn Skeleton)
```

#### Step-by-Step Feature Implementation Workflow:

1. **Define Types (`<feature>.types.ts`)**: Declare domain models, API responses, form inputs, and state interfaces. Never use `any`.
2. **Implement Pure Logic (`<feature>.logic.ts`)**: Write business calculations, sorting, and transformations. **Zero React, zero hooks, zero DOM, zero Next.js imports**.
3. **Write Unit Tests (`tests/unit/<feature>.logic.test.ts`)**: Test pure functions in isolation with Vitest before connecting to React.
4. **Implement API Service (`<feature>.api.ts`)**: Use `apiClient` from `src/shared/api/client.ts`. Never use raw `fetch()`.
5. **Create Context & Hook (`context/`)**: Create `<Feature>Context` with `'use client'` and export a custom hook `use<Feature>()`. Keep state normalized.
6. **Build Components (`components/`)**:
   - Create Dumb/Presentational components driven entirely by props using shadcn/ui primitives.
   - Create Smart/Container component implementing the **Mandatory 4-State UI pattern** (`loading`, `error`, `empty`, `success`).
7. **Integrate into App**: Mount the context provider in `src/components/providers.tsx` (if global) or wrap the container inside the page/layout in `src/app/`.

---

## 3. Rules from Mistakes WE Saw the AI Make (In Our Own Words)

These rules are direct preventatives for recurring mistakes observed during AI code generation:

### Mistake 1: Mutating Arrays In-Place in Sorters & Filters

- **The Mistake**: The AI used `array.sort((a, b) => ...)` directly on catalog arrays or state arrays. In JavaScript, `.sort()` mutates the array in-place, which corrupted the underlying dataset, broke the "Default" unsorted order, and caused subtle, unpredictable re-render loops.
- **The Rule**: **Never mutate arrays in-place**. Always create a shallow copy first using `[...items].sort(...)` or `items.slice().sort(...)`. Furthermore, all sorting and filtering logic **must** live in `*.logic.ts` as pure, deterministic functions, and selecting "Default" must return the catalog in its exact original order.

### Mistake 2: Bypassing the Centralized API Client with Raw `fetch()`

- **The Mistake**: The AI wrote ad-hoc `fetch('/api/products')` or hardcoded URLs directly inside components and hooks. This bypassed authentication headers, failed to handle unified API base URLs, lost typed `ApiException` error parsing, and caused silent failures in production builds.
- **The Rule**: **Every HTTP request MUST route through `src/shared/api/client.ts`** (`apiClient.get()`, `apiClient.post()`, etc.). Never write raw `fetch()` or `axios` in components, hooks, or feature modules.

### Mistake 3: Masking Type Safety with `as any` or Blind Type Assertions

- **The Mistake**: When encountering TypeScript compiler errors with complex objects, event targets, or API payloads, the AI frequently resorted to `(item as any)` or unchecked casting `data as Product`. This introduced runtime `undefined is not a function` and missing property crashes that escaped the compiler.
- **The Rule**: **Zero `any` allowed without explicit written justification**. Use strict interfaces, discriminating unions, and runtime type guards (e.g. `if ('id' in obj)`) to validate unknown shapes before accessing properties.

### Mistake 4: Imperative DOM Manipulation Inside React Components

- **The Mistake**: The AI used `document.getElementById('modal')`, `document.querySelector`, or `.innerHTML` to open dialogs, change text, or update badge counters. This desynchronized React's Virtual DOM from the browser DOM, caused memory leaks, and broke keyboard accessibility focus rings.
- **The Rule**: **UI state must be 100% declarative**. Control modals, drawers, banners, and values strictly via React state (`isOpen`, `activeModal`) and props or shadcn/ui primitives (`Dialog`, `Sheet`). React refs (`useRef`) are strictly reserved for imperative 3D Three.js canvas bridging or programmatic keyboard focus management (`element.focus()`).

### Mistake 5: Setting Absolute Cart Quantities Instead of Delta Increments

- **The Mistake**: The AI wrote cart quantity handlers using absolute values (`updateQuantity(id, newCount)`), reading the current quantity from state at the time of click. When users clicked "+1" multiple times quickly, stale closure state resulted in dropped increments.
- **The Rule**: **Cart mutations must always use delta semantics** (`updateQuantity(id, +1)` or `updateQuantity(id, -1)`). Compute derived cart totals (subtotals, discounts, taxes, shipping) dynamically using pure logic functions, never by storing duplicated totals in state.

### Mistake 6: Rendering Three.js / WebGL on the Server without SSR Guards (Next.js Specific)

- **The Mistake**: The AI imported `@react-three/fiber` or Three.js components directly into Next.js Server Components, causing instant server-side crashes: `ReferenceError: window is not defined` or `HTMLCanvasElement is not defined`.
- **The Rule**: **Every Three.js / R3F component MUST be strictly isolated as a Client Component (`'use client'`) and dynamically loaded via `next/dynamic` with `{ ssr: false }`**. Always provide a visual 3D skeleton loader while the canvas compiles:
  ```tsx
  // Example safe 3D desk studio import:
  const DeskStudioContainer = dynamic(
    () => import('@/desk-builder/DeskStudioContainer'),
    {
      ssr: false,
      loading: () => <DeskStudioSkeleton />
    }
  );
  ```

### Mistake 7: Mixing Server and Client Boundaries Incorrectly (Next.js Specific)

- **The Mistake**: The AI placed `'use client'` indiscriminately at the root layout or page level, killing Next.js server-rendering and SEO benefits; or conversely, attempted to pass client callback functions from Server Components to child components.
- **The Rule**: **Default to Server Components** for layouts and static/SEO content (product listings, marketing sections, metadata). Push `'use client'` down to the smallest interactive leaves (search inputs, filter bars, cart drawer, 3D studio). Combine all global Context Providers into a single client wrapper `src/components/providers.tsx`.

### Mistake 8: Breaking shadcn / Akari Theme Tokens with Arbitrary Hardcoded Colors

- **The Mistake**: The AI used arbitrary Tailwind hex classes (e.g. `bg-[#1a2b3c]` or `text-gray-700`) instead of semantic tokens. This broke dark/light modes and violated the *Akari Desk Atelier* aesthetic.
- **The Rule**: **Always use semantic design tokens and shadcn/ui CSS variable mappings**. Use `bg-background`, `text-primary`, `bg-warm-stone`, `text-deep-emerald`, `border-border`. Extend Tailwind theme tokens strictly via CSS variables configured in `src/app/globals.css`.

### Mistake 9: Modifying or Weakening Tests When Implementation Breaks (The Never-Edit-Tests Rule)

- **The Mistake**: When code changes caused unit or component tests to fail, the AI edited the test assertions or relaxed expectations (e.g. changing `expect(shipping).toBe(25)` to `expect(shipping).toBe(99)`) to force the suite green. This masked regression bugs, destroyed test integrity, and broke contractual invariants.
- **The Rule**: **The Never-Edit-Tests Rule**: Never modify or weaken existing test assertions when code breaks. Tests define the immutable contract of what must be true. When a test fails, you must fix the implementation code to satisfy the test, never rewrite or relax the test to match broken behavior. Tests may only be edited if product requirements themselves are deliberately changed by human instruction.

### Mistake 10: Querying DOM Elements by Fragile CSS Selectors in Tests

- **The Mistake**: The AI wrote tests looking for elements using internal CSS classes (`.btn-primary`, `.checkout-card`) or arbitrary IDs (`#submit-btn`). When class names changed during styling refactors, tests broke despite the UI remaining fully functional and accessible.
- **The Rule**: **Tests must always find elements by accessible role or label** (`screen.getByRole('button', { name: ... })`, `screen.getByLabelText(...)`, `page.getByRole(...)`, `page.getByLabel(...)`). This ensures tests reflect actual user interaction and validates semantic WCAG accessibility.

---

## 4. Core Engineering Rules & Conventions

1. **Mandatory 4-State UI Lifecycle**: Every data-driven or async screen must explicitly handle all 4 states:
   - `loading`: Render visual skeleton/shimmer placeholders (`<*Skeleton />` using shadcn `Skeleton`).
   - `error`: Render an error banner with an actionable **"Try Again"** button.
   - `empty`: Distinguish between `no-items` (empty dataset) and `no-match` (active filters yield 0 results).
   - `success`: Render the populated list of components.
2. **Pure Logic Isolation**: All math, coupon calculations, shipping thresholds, and transforms belong in `*.logic.ts`. They must **NEVER** import React, hooks, DOM, or Next.js APIs.
3. **Semantic HTML & WCAG Accessibility**:
   - Use standard HTML5 elements (`<dialog>`, `<header>`, `<main>`, `<section>`, `<nav>`, `<button>`).
   - Leverage shadcn / Radix UI accessible primitives for focus trapping, keyboard navigation, and ARIA roles.
   - Every interactive control must have an accessible label (`<label htmlFor="...">` or `aria-label`).
   - Modals and drawers must support keyboard `Escape` to close and return focus properly.
4. **Mobile-First Responsive Tailwind**:
   - Style mobile viewport first, scaling up with standard breakpoints (`sm:`, `md:`, `lg:`, `xl:`).
   - Never use `!important`. Manage CSS specificity using semantic utility classes and Tailwind configuration.
5. **English Everywhere in Codebase**:
   - File names, code identifiers, comments, and commit messages must strictly be in English.
   - User-facing localized content is kept in Arabic for this project (`dir="rtl"`).
6. **Next.js Metadata & SEO**:
   - Every page in `src/app/` must export a descriptive `metadata` object or `generateMetadata` function with Arabic title, description, and OpenGraph tags.
7. **Strict React Hook Dependencies & Cleanup**:
   - Always declare complete dependency arrays for `useEffect`, `useCallback`, and `useMemo`.
   - Any subscription, event listener, or Three.js animation loop initialized in `useEffect` must return an explicit cleanup function to prevent memory leaks.
8. **The Never-Edit-Tests Rule**:
   - Never modify or weaken existing test assertions when code breaks.
   - Tests define the immutable contract of what must be true.
   - If a test fails, fix the implementation code to satisfy the test, never rewrite or relax the test to match broken behavior.
9. **Accessible Role & Label Querying in Tests**:
   - All component and E2E tests must locate elements using accessibility primitives (`getByRole`, `getByLabelText`, `getByLabel`), never by brittle CSS class selectors or query selectors.
10. **Test Naming Convention ("What Must Be True")**:
   - Every test case name must clearly declare the expected truth or invariant (e.g., `it('cart subtotal under 300 SAR must charge 25 SAR shipping...')`, `it('submitting empty required fields must display validation error alerts...')`).

---

## 5. Development CLI Commands

```bash
npm run dev          # Start local Next.js development server with Turbopack
npm run build        # Build production bundle (.next)
npm run start        # Start Next.js production server
npm run lint         # Run ESLint static code analysis
npm test             # Run Vitest unit & logic test suite
npm run test:e2e     # Run Playwright browser E2E test suite
npm run format:check # Verify code formatting with Prettier
```
