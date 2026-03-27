# Typography Overhaul Spec

**Branch:** `feat/typography-overhaul`
**Date:** 2026-03-27
**Status:** Draft — awaiting approval before implementation

---

## Goal

Fix the 10 readability violations found in the typography audit (see `TYPOGRAPHY.md`) without breaking the terminal aesthetic. The site should feel the same — just read better.

---

## Design Constraint

**The terminal personality is non-negotiable.** Source Code Pro stays. Dark-only stays. Glow effects stay. We're fixing readability within the existing aesthetic, not redesigning it.

---

## Changes by Priority

### P0 — Reading Comfort (high impact, core reading surfaces)

#### 1. Article body font size: 14px → `var(--text-base)`

**Files:** `src/pages/modules/articles/[slug].astro`

| Selector | Current | New |
|----------|---------|-----|
| `.article-prose p` | `font-size: 0.875rem` (14px) | remove — inherit from container |
| `.article-prose li` | `font-size: 0.875rem` (14px) | remove — inherit from container |
| `.article-prose code` | `font-size: 0.8rem` | `font-size: 0.875rem` |
| `.article-prose` (container) | no explicit font-size | `font-size: var(--text-base)` |

**Rationale:** Monospace at 14px is the equivalent of ~12px proportional. The global `--text-base` already targets `clamp(16px, 1.1vw + 6px, 21px)` — use it.

#### 2. Article container width: 48rem → `ch`-based

**Files:** `src/pages/modules/articles/[slug].astro`

| Selector | Current | New |
|----------|---------|-----|
| `.max-w-3xl` wrapper div | `max-width: 48rem` (768px) | `max-width: min(90vw, 60ch)` |

**Implementation:** Replace the Tailwind class `max-w-3xl` with an inline style or a custom utility. With Source Code Pro, `60ch` ≈ 504px at 16px base — a narrow, comfortable column. This is intentional for monospace; proportional fonts at `60ch` would be wider.

**Side effect:** The article becomes visually narrower. The back-link, h1, and footer nav all sit inside this container, so they narrow too — acceptable, but worth eyeballing.

#### 3. ACT inner container: 780px → `ch`-based

**Files:** `src/styles/global.css` (line 120)

| Selector | Current | New |
|----------|---------|-----|
| `.act-inner` | `max-width: 780px` | `max-width: min(90vw, 60ch)` |

**Rationale:** Same CPL issue as articles. The ACT pattern is used in 5 essay modules (`jibunwotsukure`, `ideal-partner`, `back-control`, `where-to-start`, `horseshoe`). Changing the shared class fixes all of them.

**Risk:** Some ACTs contain canvas visualizations or inline SVGs that may need their own wider container. After the change, visually test each essay module and add `max-width: none` or a wider override to any ACT section that contains a visualization wider than `60ch`.

#### 4. Article heading line-height: 1.8 → 1.15

**Files:** `src/pages/modules/articles/[slug].astro`

```css
.article-prose h2,
.article-prose h3,
.article-prose h4 {
  line-height: 1.15;  /* ADD — currently inherits 1.8 from container */
}
```

---

### P1 — Accessibility / Polish (medium impact, structural)

#### 5. Sub-12px floor: establish `--text-chrome` token

**Files:** `src/styles/global.css`, then propagate

**New token:**
```css
:root {
  --text-chrome: clamp(12px, 0.8vw + 6px, 14px);
}
```

This replaces all hardcoded 9px, 10px, and 11px text across the site. The `clamp()` ensures it never drops below 12px on any viewport, but scales up to 14px on large screens.

**Affected surfaces and their current sizes:**

| Surface | File | Current | New |
|---------|------|---------|-----|
| Global header nav | `BaseLayout.astro:43,47` | `text-[11px]` | `text-[length:var(--text-chrome)]` |
| Global footer | `BaseLayout.astro:59` | `text-[10px]` | `text-[length:var(--text-chrome)]` |
| `.tldr__toggle` | `global.css:73` | `11px` | `var(--text-chrome)` |
| `.act-number` | `global.css:125` | `11px` | `var(--text-chrome)` |
| Article back-link | `[slug].astro:23,40` | `text-[9px]` | `text-[length:var(--text-chrome)]` |
| Articles index breadcrumb | `articles.astro:16,28,48` | `text-[9px]` | `text-[length:var(--text-chrome)]` |
| Index section labels | `index.astro:232,241,257,266` | `text-[10px]` | `text-[length:var(--text-chrome)]` |
| Index dev badge | `index.astro:179` | `text-[9px]` | `text-[length:var(--text-chrome)]` |
| Experiments page | `experiments.astro:146,165,174` | `text-[9px]`–`text-[11px]` | `text-[length:var(--text-chrome)]` |
| 404 page | `404.astro:9,16` | `text-[10px]` | `text-[length:var(--text-chrome)]` |

**Interactive module toolbars** (inline styles in ~10 files):
These are the hardest to change because they use inline `style="font-size:10px"` or `font-size:11px`. Each needs manual find-and-replace. The affected modules:

- `centroid.astro` — toolbar, HUD, recap panel (~15 instances)
- `memory.astro` — toolbar, HUD, win panel (~12 instances)
- `flow-roll.astro` — toolbar (~3 instances)
- `skill-check.astro` — toolbar, form labels, results (~15 instances)
- `belt-dropout.astro` — toolbar, context notes, settings table (~20 instances)
- `beyond-offense-defense.astro` — toolbar, labels (~6 instances)
- `build-yourself.astro` — toolbar, tooltip, modal (~6 instances)
- `cards.astro` — toolbar (~1 instance)
- `horseshoe.astro` — toolbar (~1 instance)
- `font-test.astro` — skip (this is a typography testing page, sizes are intentional)

**Strategy:** For inline styles, do a bulk `font-size:10px` → `font-size:12px` and `font-size:11px` → `font-size:12px` replacement across these files. This is safe because:
- All these are uppercase chrome labels with wide letter-spacing, so 1–2px increase is visually minimal
- None of these are sized relative to their container (all absolute px values)

**Exception:** `font-test.astro` should be excluded from all changes — it exists to test typography rendering.

#### 6. Declare `color-scheme: dark`

**Files:** `src/styles/global.css` (line 15), or `src/layouts/BaseLayout.astro`

```css
html {
  color-scheme: dark;  /* ADD */
  background-color: #050509;
  color: #E5E7EB;
  font-family: "Source Code Pro", "Courier New", monospace;
}
```

**Effect:** Tells the browser this is a dark site. Native form controls, scrollbars, autofill backgrounds, and other UA elements render in dark mode. Zero visual change to custom-styled elements.

#### 7. `--text-dim` contrast bump

**Files:** `tailwind.config.mjs`

| Token | Current | New |
|-------|---------|-----|
| `text-dim` | `#6B7280` | `#7B8290` |

**Effect:** Contrast rises from ~4.3:1 to ~5.2:1 against `#050509`. Meets WCAG AA for all text sizes. Subtle visual change — barely perceptible.

---

### P2 — Refinements (low impact, nice-to-have)

#### 8. Font preload (optional if keeping `swap`)

**Files:** `src/layouts/BaseLayout.astro`

Add before the `@font-face` block:
```html
<link rel="preload" href="${base}/fonts/SourceCodePro/SourceCodePro-VF-latin.woff2"
      as="font" type="font/woff2" crossorigin />
```

**Effect:** Reduces the FOUT window. The regular weight loads before first paint; italic defers naturally.

#### 9. Japanese splash scoping

**Files:** `src/pages/index.astro`

Add `lang="ja"` to the Japanese text element in the retro terminal:
```html
<div id="rt-jp" lang="ja" style="...">
```

**Effect:** Enables correct kinsoku shori (line-breaking rules) if the text ever wraps. Currently single-line so the impact is cosmetic, but it's the correct markup.

---

## Files Changed (Summary)

| File | Changes |
|------|---------|
| `src/styles/global.css` | Add `--text-chrome` token, `color-scheme: dark`, fix `.act-inner` width, fix `.tldr__toggle` and `.act-number` sizes |
| `src/layouts/BaseLayout.astro` | Bump header/footer text to `--text-chrome`, optional font preload |
| `src/pages/modules/articles/[slug].astro` | Article prose font-size, container width, heading line-height |
| `src/pages/modules/articles.astro` | Breadcrumb/chrome text bump |
| `src/pages/index.astro` | Section label text bump, splash `lang="ja"`, dev badge bump |
| `src/pages/experiments.astro` | Chrome text bump |
| `src/pages/404.astro` | Chrome text bump |
| `tailwind.config.mjs` | `text-dim` color bump |
| ~10 interactive module `.astro` files | Inline style font-size bump (10/11px → 12px) |

**Excluded:** `font-test.astro` (typography test page — sizes are specimens, not violations)

---

## Testing Plan

After implementation, verify each change:

- [ ] **Articles** — Open any article. Body text visually larger, column narrower (~60ch). Headings tighter. Readable without squinting.
- [ ] **Essay modules** — Open each of the 5 ACT-pattern essays. Prose narrower. Canvas/SVG visualizations not clipped or broken.
- [ ] **Header/footer** — Text slightly larger, still reads as chrome. No layout overflow.
- [ ] **Interactive modules** — Open centroid, memory, skill-check, belt-dropout. Toolbar text legible, no overflow or wrapping.
- [ ] **Mobile** — Viewport 375px. All text ≥ 12px. Article column fills viewport cleanly. No horizontal scroll.
- [ ] **Form controls** — With `color-scheme: dark`, any native inputs/selects render dark. No white flash.
- [ ] **404 page** — Chrome text bump, no visual regression.

---

## What This Does NOT Change

- Font family (Source Code Pro stays)
- Color palette (except `text-dim` bump: `#6B7280` → `#7B8290`)
- Glow effects, scanlines, animations
- Dark-only design (no light mode added)
- Layout structure, grid, or spacing
- Any JavaScript behavior
