````markdown
# Grappling Primitives – `obra-shadcn-ui` Refactor Plan

Branch name suggestion:

```bash
git checkout -b obra-shadcn-ui-refactor
````

This document is the **source of truth** for Cursor / AI agents working on the redesign of **grapplingprimitives.com**.

The goals:

* Adopt a **modern, mobile-first, dark-mode-only** UI inspired by **Obra · shadcn · UI**.
* Migrate the app to a **static-first Next.js + TypeScript + Tailwind + shadcn/ui** stack.
* Create a clean **module discovery experience** (hero + featured carousel + card grid).
* Refactor the **2×2 Concept Matrix** into a reusable, mobile-friendly component.
* Keep the site deployable as a **static bundle** suitable for **Cloudflare Pages**.

---

## 1. Tech Stack & High-Level Architecture

### 1.1 Core stack

* **Framework:** Next.js (App Router) – latest stable
* **Language:** TypeScript
* **Runtime target:** Static export (no required SSR for phase 1)
* **Styling:** Tailwind CSS
* **Component primitives:** shadcn/ui components + custom components
* **Icons:** Lucide icons
* **Content:** MDX for articles / module pages
* **State within pages:** React hooks (no global state library yet)
* **Visualizations / games:** React components (SVG, Canvas or DOM) as **client components**

### 1.2 Architectural principles

1. **Static-first**

   * Prefer `generateStaticParams` + static routes.
   * Do **not** add Next.js API routes in this refactor.
   * Everything should work as a static export: `next.config.js` will later use `output: "export"`.

2. **Islands of interactivity**

   * Landing page and simple pages can be server components.
   * Complex modules (2×2 matrix, games, interactive tools) live in **client components** with `"use client"` pragma.

3. **Modules as first-class citizens**

   * Every module (matrix, decision trees, games, gym tools, etc.) is defined in a **module registry** (`data/modules.ts`).
   * The landing page grid + carousel read from this registry.

---

## 2. Project Structure

Create/adjust the following structure under `src/`:

```txt
src/
  app/
    layout.tsx
    page.tsx                         # Landing page (hero + carousel + grid)
    modules/
      [slug]/
        page.tsx                     # Module details page (MDX + component)
    (static pages as needed).tsx
  components/
    layout/
      site-header.tsx
      site-footer.tsx
      mobile-nav.tsx
    ui/                              # shadcn-style re-exports / wrappers
      button.tsx
      card.tsx
      badge.tsx
      sheet.tsx
      carousel.tsx
      ...
    modules/
      module-card.tsx
      module-grid.tsx
      module-carousel.tsx
      concept-matrix/
        concept-matrix.tsx
        matrix-minimap.tsx
        matrix-controls.tsx
  content/
    modules/
      2x2-matrix.mdx
      gym-tools.mdx
      mini-games.mdx
      articles.mdx
      ...                            # One MDX per module where needed
    articles/
      *.mdx
  data/
    modules.ts                       # Module registry
    concepts.ts                      # Concepts for 2x2 matrix & others
  lib/
    matrix/
      panzoom.ts                     # Helpers for pan/zoom
      scales.ts                      # D3 or custom scale helpers
    mdx/
      mdx-components.tsx             # Mapping for MDX components
```

---

## 3. Design System – Obra · shadcn · UI Inspired

### 3.1 Tailwind + tokens

Update `tailwind.config.ts` to encode design tokens approximating the Obra look:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"], // we'll run dark mode only but keep this for future
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx,mdx}",
    "./src/content/**/*.{mdx,md}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#050509",        // main app background
          raised: "#0E1014",         // cards / panels
        },
        border: {
          subtle: "#1C1F26",
        },
        accent: {
          primary: "#4C8DFF",        // primary blue accent
          soft: "#A970FF",           // secondary purple accent
        },
        text: {
          primary: "#E5E7EB",
          muted: "#9CA3AF",
          subtle: "#6B7280",
        },
      },
      borderRadius: {
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        card: "0 18px 40px rgba(0, 0, 0, 0.45)",
      },
      spacing: {
        13: "3.25rem",
        15: "3.75rem",
      },
    },
  },
  plugins: [],
};

export default config;
```

Guidelines:

* Only **dark mode** is supported initially: body has `class="dark"` set in `layout.tsx`.
* Use the `bg.bg`, `bg.raised`, `border.border.subtle`, `text.*` tokens in components.
* Maintain a **4px spacing scale**: 4, 8, 12, 16, 24, 32, 40, 48, 64.

### 3.2 Global layout

`src/app/layout.tsx`:

* Use the Next.js App Router layout.
* Set `<html lang="en" className="dark">`.
* Wrap body with a container that constrains max width on desktop, but is **edge-to-edge on mobile**.

Example:

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-bg text-text-primary antialiased">
        <div className="min-h-screen flex flex-col">
          <SiteHeader />
          <main className="flex-1 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
```

### 3.3 Header & navigation

* Mobile-first header:

  * Left: logotype (`Grappling Primitives`)
  * Right: icon button for mobile nav (sheet) and a subtle “Modules” call-to-action.
* Use shadcn `Sheet` or custom `Dialog` for mobile navigation.

Design constraints:

* Height ~56–64px
* Background `bg.bg` with slight border bottom `border-b border-border-subtle`
* Logo text `text-lg font-semibold`

---

## 4. Module Registry & Content Model

### 4.1 Module registry (`data/modules.ts`)

Create a strongly typed registry:

```ts
export type ModuleCategory =
  | "Concept Map"
  | "Decision Tree"
  | "Games"
  | "Articles"
  | "Tools"
  | "Matrix"
  | "Other";

export interface ModuleDefinition {
  id: string;
  slug: string;        // used in /modules/[slug]
  title: string;
  shortDescription: string;
  category: ModuleCategory;
  icon: string;        // lucide icon name or custom mapping
  featured?: boolean;
  order?: number;
}

export const MODULES: ModuleDefinition[] = [
  {
    id: "concept-matrix",
    slug: "concept-matrix",
    title: "2×2 Matrix",
    shortDescription: "Explore and compare grappling concepts.",
    category: "Matrix",
    icon: "grid-3x3",
    featured: true,
    order: 1,
  },
  {
    id: "gym-tools",
    slug: "gym-tools",
    title: "Gym Tools",
    shortDescription: "Plan classes and manage training data.",
    category: "Tools",
    icon: "dumbbell",
    featured: true,
    order: 2,
  },
  // more...
];
```

Usage:

* Landing page `page.tsx` imports and sorts `MODULES`.
* `/modules/[slug]/page.tsx` resolves by `slug` and loads matching MDX content + component.

### 4.2 MDX content

Each module gets an MDX file in `content/modules` with optional frontmatter:

```mdx
---
id: concept-matrix
title: "2×2 Matrix"
description: "Visualize the space of grappling concepts."
---

# 2×2 Matrix

Short explanatory copy, how to use this module, controls, examples.

<ConceptMatrix />
```

MDX config:

* Configure an MDX loader in `next.config.js` (use `@next/mdx`).
* Add a `lib/mdx/mdx-components.tsx` file mapping components, including `ConceptMatrix`.

---

## 5. Landing Page – Layout & Components

### 5.1 Structure

`src/app/page.tsx` should contain:

1. **Hero section**

   * Title: “Grappling Primitives”
   * Subtitle: short one-sentence mission
   * Primary CTA button: “Explore Modules”
   * Secondary CTA (optional): “Learn the Framework”
   * Mobile: stacked; Desktop: hero text left, simple abstract pattern or mini-matrix preview on right.

2. **Featured modules carousel**

   * Horizontal scroll on mobile
   * 3–4 cards visible on desktop
   * Uses `module-carousel.tsx` and `MODULES.filter(m => m.featured)`.

3. **All modules grid**

   * Responsive grid of cards using `module-grid.tsx`.
   * 2 columns mobile (`grid-cols-1 sm:grid-cols-2`), 3–4 columns desktop.

4. **(Optional later)** Short “What is Grappling Primitives?” section with small illustrations.

### 5.2 Module card component

`components/modules/module-card.tsx`:

Key requirements:

* Uses Tailwind and our tokens.
* Stays visually aligned with Obra/shadcn cards: soft rounded corners, subtle border, hover state.

Example:

```tsx
import { ModuleDefinition } from "@/data/modules";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconRouter } from "@/components/ui/icon-router";

interface ModuleCardProps {
  module: ModuleDefinition;
  variant?: "grid" | "carousel";
}

export function ModuleCard({ module, variant = "grid" }: ModuleCardProps) {
  return (
    <Link href={`/modules/${module.slug}`}>
      <Card
        className={cn(
          "bg-bg-raised border-border-subtle shadow-card transition",
          "hover:border-accent-primary/70 hover:shadow-[0_18px_50px_rgba(0,0,0,0.65)]",
          variant === "grid" ? "p-4 sm:p-5" : "p-4"
        )}
      >
        <div className="flex items-center justify-between mb-3 gap-3">
          <div className="flex items-center gap-2">
            <IconRouter name={module.icon} className="w-5 h-5 text-accent-primary" />
            <Badge variant="outline" className="border-border-subtle text-xs">
              {module.category}
            </Badge>
          </div>
        </div>
        <h3 className="text-base sm:text-lg font-semibold mb-1">
          {module.title}
        </h3>
        <p className="text-sm text-text-muted">{module.shortDescription}</p>
      </Card>
    </Link>
  );
}
```

---

## 6. 2×2 Concept Matrix Refactor

### 6.1 Requirements

* Implement as a **client component**: `components/modules/concept-matrix/concept-matrix.tsx`.
* Mobile-first:

  * Full-screen or near full-screen height on mobile.
  * Controls easily tappable (48px touch targets).
  * Pan/zoom via gestures.
  * Quadrant navigation buttons: “Q1 / Q2 / Q3 / Q4” shortcuts.
* Desktop:

  * Use additional width to show sidebar info or legend.

### 6.2 Data model

`data/concepts.ts`:

```ts
export interface ConceptPoint {
  id: string;
  label: string;
  x: number;            // normalized -1 to 1 or 0–1
  y: number;            // same scale
  category: string;     // category name
  description?: string;
}

export const CONCEPTS: ConceptPoint[] = [
  {
    id: "empathy",
    label: "Empathy",
    x: 0.72,
    y: 0.41,
    category: "Grappling Primitives",
  },
  // ...
];
```

### 6.3 Component API

```tsx
"use client";

interface ConceptMatrixProps {
  concepts?: ConceptPoint[];
}

export function ConceptMatrix({ concepts = CONCEPTS }: ConceptMatrixProps) {
  // pan/zoom state, selection, filters...
}
```

### 6.4 Interaction design

* **Viewbox & coordinates**

  * Maintain an internal coordinate system (e.g. x, y in [-1, 1]).
  * Use `viewBox` on SVG to map to screen.

* **Pan/zoom**

  * Implement a small `usePanZoom` hook in `lib/matrix/panzoom.ts`:

    * `zoom`, `translateX`, `translateY`
    * methods: `zoomBy`, `panBy`, `reset`
  * Support:

    * Mouse: drag to pan, scroll wheel to zoom, double-click to zoom in
    * Touch: drag to pan, pinch to zoom, double-tap to zoom in, two-finger tap to zoom out (optional)

* **Controls**

  * Zoom in/out buttons in bottom-right
  * “Reset view” button
  * Optional Q1–Q4 buttons that set the viewport center to that quadrant

* **Labels**

  * By default, dots only.
  * Show label on hover (desktop) or tap (mobile).
  * Tap a dot → show a small tooltip/card with:

    * Label
    * Category pill
    * Short description (if available)

* **Mini-map**

  * Optional small mini-map overlay top-right:

    * Shows entire 2×2 space.
    * Rectangle showing current viewport.

### 6.5 Styling guidelines

* Background: `bg-bg-raised`
* Quadrant lines: subtle `stroke="#1F2933"` (or `border-border-subtle`)
* Dots:

  * Base radius: `4–5px` mobile, `3–4px` desktop
  * Color from category mapping: blue, purple, green, amber, etc. (use Tailwind colors)
* Selected dot:

  * Larger radius
  * Outline ring

---

## 7. Coding Conventions

* **TypeScript strict mode** enabled.
* Functional components only.
* Prefer **server components** by default in `app/` except where interactivity is needed:

  * Add `"use client";` at the top of interactive modules.
* Use `async`/`await` where needed; avoid callbacks.
* No runtime data fetching from external APIs in this phase; everything from local `data/` or `content/`.

Utility:

* Add a simple `cn` function in `lib/utils.ts` (standard Tailwind className combiner).

---

## 8. Tasks / Implementation Checklist (for Cursor)

1. **Initialize stack**

   * [ ] Ensure Next.js App Router + TypeScript are set up.
   * [ ] Add Tailwind CSS with config from section 3.1.
   * [ ] Scaffold shadcn/ui (or at least basic UI primitives).
   * [ ] Add Lucide icons.

2. **Global layout**

   * [ ] Implement `layout.tsx` with dark mode and base container.
   * [ ] Create `SiteHeader` and `SiteFooter` components.
   * [ ] Implement mobile nav sheet.

3. **Design system**

   * [ ] Encode colors, radii, shadows, typography as in section 3.
   * [ ] Create `components/ui` wrappers for common elements: `Button`, `Card`, `Badge`, `Sheet`, etc.

4. **Content & modules**

   * [ ] Implement MDX support.
   * [ ] Create `data/modules.ts` and fill with initial modules.
   * [ ] Implement dynamic route `/modules/[slug]` that:

     * finds module by slug
     * loads MDX content
     * renders it with `mdx-components`.

5. **Landing page**

   * [ ] Implement hero section.
   * [ ] Implement `ModuleCarousel` using featured modules.
   * [ ] Implement `ModuleGrid` with `ModuleCard`.

6. **Concept Matrix**

   * [ ] Create `data/concepts.ts`.
   * [ ] Implement `ConceptMatrix` component according to section 6.
   * [ ] Integrate `<ConceptMatrix />` into:

     * Landing page as a small preview (optional), and/or
     * Module page `/modules/concept-matrix`.

7. **Static build sanity check**

   * [ ] Add `output: "export"` to `next.config.js` (or equivalent for chosen Next version).
   * [ ] Run `next build` and `next export` and confirm no runtime server dependencies.

8. **Polish**

   * [ ] Ensure all pages look good on **mobile first** (max 430px width), then tablet, then desktop.
   * [ ] Add subtle motion via Framer Motion or CSS transitions (hover, fade-in, etc.).
   * [ ] Confirm Lighthouse scores (Core Web Vitals) are reasonable.

---

## 9. Future Extensions (Not for this branch, but keep in mind)

* Authentication and profiles for students/coaches.
* Persistent data for gym management tools.
* Integration with Supabase or a custom backend via Cloudflare Workers.
* Additional modules (decision tree visualizer, class planner, etc.) using the same module registry structure.

---

**End of plan.**
All new work in this branch should align with this document and the Obra · shadcn · UI dark, mobile-first aesthetic.
If in doubt, bias toward: **simple, static, mobile-friendly, and composable.**

```
::contentReference[oaicite:0]{index=0}
```


---
Implementation Strategy : 

```bash
git checkout -b obra-shadcn-ui-refactor
mkdir -p docs
# open docs/obra-shadcn-ui-refactor.md in Cursor and paste the plan
git add docs/obra-shadcn-ui-refactor.md
git commit -m "Add obra-shadcn-ui refactor plan"
```

That keeps the plan living *inside* the repo where Cursor agents can see it.

---



### 1. Use a dedicated branch (you already are)

* `obra-shadcn-ui-refactor` stays isolated from main until you’re happy.
* You can push WIP to GitHub without touching production.

### 2. In that branch, build the **new structure in parallel**, but **don’t let it clash with the old entrypoints**

Concrete way to do it in a Next app:

1. **Rename current app/pages as legacy** (so it’s still there for reference, but not used):

   ```bash
   mv src/app src/app-legacy   # or whatever your structure is
   ```

2. **Create the new `src/app` structure from scratch** following the MD plan.
   Now:

   * `src/app/` → new Obra/shadcn UI app
   * `src/app-legacy/` → old implementation for reference only

   Next will only build from `src/app`, so your dev server is always the **new** site, but you can open old files in Cursor to copy/paste/port logic.

3. **Recreate functionality module-by-module**

   * Start with layout + landing page.
   * Then port the 2×2 matrix as `ConceptMatrix`.
   * Then other modules/pages.

4. Once you’ve fully ported what you care about and you’re happy with the new app:

   * Delete `src/app-legacy/` (or keep it around in git history).

   ```bash
   rm -rf src/app-legacy
   git add -A
   git commit -m "Remove legacy app after obra-shadcn-ui refactor"
   ```

### Why this is nicer than a totally separate nested app

* You **avoid multiple package.json / build configs** in one repo.
* The dev server always runs the new structure, so there’s no confusion about which app you’re looking at.
* The legacy code is still there as plain files for you to read/copy until you’re done.

---

## Tiny “best practices” checklist for the refactor

* Keep commits **small and focused**: “add layout + header”, “add module registry + grid”, “port concept matrix”, etc.
* Where you port logic from legacy, try to:

  * Move **behavior** (math / algorithms for your visualizations) into `/lib/**` with tests.
  * Keep components mostly about **rendering** and interactions.
* Do occasional `next build` to catch any static-export problems early.
* Only delete the legacy folder once:

  * The new `app/` covers everything you actually need, and
  * You’re happy with mobile + desktop behavior.

If you want, next step I can do is a **minimal “scaffold commit”** in text form: the exact files + starter code you create first (`layout.tsx`, `page.tsx`, `tailwind.config.ts` snippets, etc.) so you can copy them into Cursor and start from a clean, working baseline.
