# Signal / Noise — Horseshoe Module Design

## Overview

An interactive visualization of the "horseshoe model" applied to grappling culture: the idea that extreme alpha-bro posturing and extreme buffoonery, while approaching from opposite directions, converge on the same outcome — drowning out the craft signal. A slider lets the user move along the horseshoe arc, with a dot tracking position, a signal-strength bar, zone descriptions, and floating quotes at the extremes.

## Data Architecture

### Quote Lists (new content collection: `horseshoe-quotes`)

Two `.md` files in `src/content/horseshoe-quotes/`:

**`alpha.md`**
```markdown
---
side: alpha
label: "alpha bro"
---
I'm a swimming lion in a sea of antelopes
We're not here to be soft
...one quote per line...
```

**`buffoon.md`**
```markdown
---
side: buffoon
label: "buffoon"
---
I'm only here for the oil check!
Father's milk lol
...one quote per line...
```

**Schema** (added to `src/content/config.ts`):
```typescript
const horseshoeQuotes = defineCollection({
  type: 'content',
  schema: z.object({
    side: z.enum(['alpha', 'buffoon']),
    label: z.string(),
  }),
});
```

Quotes are parsed at build time by splitting `.body` on newlines and filtering blanks. Note: this project uses Astro 5 with legacy content collections (not the new Content Layer API with `glob()` loaders), so `.body` is the raw markdown string. If the project migrates to the Content Layer API in the future, this parsing strategy will need to change.

### Essay Content

The companion essay lives in `src/content/Articles/signal-noise-horseshoe.md` using the existing `Articles` collection. Rendered at build time via Astro's `render()` and placed in a collapsible `<details>` block below the widget.

Frontmatter:
```markdown
---
title: "Signal / Noise — The Grappling Horseshoe"
date: "2026-03-24"
tags: [culture, horseshoe, signal-noise]
---
```

### Zone Definitions

Kept inline in the `.astro` script — tightly coupled to visualization logic (color thresholds, SVG positioning). Not Obsidian-editable.

```javascript
const ZONES = [
  { max: 15,  label: "Alpha extreme — performance crowding signal", color: "#ff4444" },
  { max: 35,  label: "Alpha register — signal dominant",            color: "#ffaa00" },
  { max: 65,  label: "Craft center",                                color: "#4C8DFF" },
  { max: 85,  label: "Levity register — signal dominant",           color: "#ffaa00" },
  { max: 100, label: "Buffoon extreme — performance crowding signal", color: "#ff4444" },
];
```

## Color Remapping

Original horseshoe palette remapped to site colors:

| Semantic role     | Original   | Remapped   | Site usage                    |
|-------------------|-----------|-----------|-------------------------------|
| Craft center      | `#1D9E75` | `#4C8DFF` | Site accent blue              |
| Transition zone   | `#BA7517` | `#ffaa00` | Orange/amber (centroid, etc.) |
| Extreme           | `#D85A30` | `#ff4444` | Red (belt-dropout, centroid)  |
| Alpha quotes      | `#D85A30` | `#ff4444` | Red                           |
| Buffoon quotes    | `#7c3aed` | `#ea580c` | Orange (jibunwotsukure)       |

Note: buffoon quote text uses orange (`#ea580c`) while the extreme zone arc/bar uses red (`#ff4444`). This is intentional — it visually distinguishes the floating quote text from the structural zone color, matching how the original used purple vs. coral for the same purpose.

SVG horseshoe arc segments, slider gradient, signal bar, and dot stroke all use these remapped values.

## Page Structure

**File**: `src/pages/modules/horseshoe.astro`
**Layout**: `BaseLayout` (site header, footer, global CSS)

Top-to-bottom, single column:

1. **Module header** — eyebrow ("GRAPPLING PRIMITIVES"), title ("Signal / Noise"), subtitle
2. **Interactive widget** (3-column grid on desktop, single column on mobile):
   - Left: alpha quote zone (floating quotes, visible at slider ≤15)
   - Center: SVG horseshoe + slider + signal bar + zone info
   - Right: buffoon quote zone (floating quotes, visible at slider ≥85)
3. **Tolkien quote** — footer blockquote
4. **Collapsible essay** — using `.tldr` pattern from `global.css`:
   ```html
   <details class="tldr">
     <summary class="tldr__toggle">The Grappling Horseshoe — full essay</summary>
     <div class="tldr__body"><Content /></div>
   </details>
   ```

### Responsive behavior

- Desktop (>600px): 3-column grid with flanking quote zones
- Mobile (≤600px): single column, quote zones hidden (same as original)

## Typography

All monospace (`Courier New`, `Consolas`, `Monaco`) to match site. No serif fonts. Uses site text scale variables (`--text-xs`, `--text-sm`, `--text-base`).

## Build-Time Data Flow

```
src/content/horseshoe-quotes/alpha.md ──┐
src/content/horseshoe-quotes/buffoon.md ┤ getCollection('horseshoe-quotes')
                                         ├─→ split .body by \n → string[]
                                         ├─→ define:vars={{ alphaQuotes, buffoonQuotes }}
                                         └─→ client script uses arrays
src/content/Articles/signal-noise-horseshoe.md
                                         ├─→ render() → HTML
                                         └─→ injected into <details> block
```

## Client-Side Behavior

Ported from original HTML with adaptations:

- **Slider** (0–100): maps to position on horseshoe arc via angle calculation
- **Dot**: SVG circle tracks arc position, stroke color changes per zone
- **Signal bar**: parabolic curve (95% at center, 20% at extremes)
- **Zone info**: label + description updates per zone
- **Quote spawning**: at extremes (≤15 or ≥85), quotes fade in/out on a 1.9s interval from the appropriate list, random vertical position, no-repeat-until-exhausted logic
- **Slider thumb**: color matches current zone via CSS custom property

## Files Changed

### New files
- `src/content/horseshoe-quotes/alpha.md`
- `src/content/horseshoe-quotes/buffoon.md`
- `src/content/Articles/signal-noise-horseshoe.md`
- `src/pages/modules/horseshoe.astro`

### Modified files
- `src/content/config.ts` — add `horseshoe-quotes` collection + export
- `src/pages/experiments.astro` — add entry to main `experiments` array (not `purgatory`)

## Experiments Page Entry

```typescript
{
  title: 'Signal / Noise',
  description: 'The horseshoe model applied to grappling culture. Both extremes are neighbors — and neither knows it.',
  href: `${base}/modules/horseshoe`,
  status: 'live' as const,
  tag: 'INTERACTIVE ESSAY',
  thumb: `${thumbBase}/horseshoe.webp`,
},
```

Thumbnail will be created after the module is functional.
