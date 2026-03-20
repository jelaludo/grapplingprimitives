# Flow-Roll Module -- Design Spec

**Date:** 2026-03-20
**Status:** Draft
**Source files:** `G:\L_Download2026\flow-bjj_Specific_jelastyle.html`, `G:\L_Download2026\flow-theory_jelastyle.html`

## Overview

Integrate two finished HTML articles into a single Astro module at `/modules/flow-roll`. The BJJ-specific article ("Flow in Sparring") is the primary content; the research article ("The 'Science' of Flow") is a secondary tab.

Both articles are self-contained HTML with inline styles, interactive JS (slider, canvas, tabs, intersection observer), and Google Font dependencies. They must be adapted to the site's terminal/monospace visual identity while preserving all content and interactivity.

## Page Structure

```
/src/pages/modules/flow-roll.astro
```

### Layout

- `BaseLayout` with `fullscreen={true}`
- Standard toolbar (fixed, 36px): Home link, "Flow & Roll" title, deeplink button
- Tab bar below toolbar: **"Flow in Sparring"** (default active) | **"The Research"**
- Content area below tabs, scrolls independently per tab

### Tab Bar

- **Sticky**, positioned at `top:36px` (below the fixed toolbar)
- Same styling as toolbar: `surface` bg, `border` bottom, monospace labels
- Active tab: `accent` text + subtle underline; inactive: `text-dim`

### Tab Behavior

- Clicking a tab shows its content, hides the other
- Scroll position resets to top on tab switch
- Intersection observer animations are one-shot (sections keep `visible` class once revealed; no re-animation on tab switch)
- URL hash optional (`#sparring`, `#research`) for direct linking

## Tab 1: Flow in Sparring (Primary)

Source: `flow-bjj_Specific_jelastyle.html`

### Sections preserved (6 + footer)

1. **S01 -- The Core Problem** ("The model assumes a static challenge")
   - Two-column layout with problem grid (4 cells)
   - Content: static vs live challenge, coaching implications

2. **S02 -- The Aliveness Condition** (Chinese proverb callout)
   - Callout box with Chinese characters + pinyin + translation
   - Two-column: dead kung-fu concept + aliveness distinction
   - Key insight: "how real" vs "how hard"

3. **S03 -- Disambiguating** ("Three things called flow in BJJ")
   - 3-column problem grid: Flow Rolling / Flow State / Flow Quality
   - Musing box below

4. **S04 -- The Intensity Spectrum** (interactive slider)
   - Dark-inverted section (already dark in original; maps naturally to site bg)
   - Range slider 0-100 with threshold markers (aliveness/ego/threat)
   - Zone display: meter bar + zone name + description + 3-cell detail grid
   - Threshold alerts on zone boundaries
   - 6 zones: Dead Drilling, Soft Flow Roll, Technical Flow Zone, Ego Threshold Zone, Hard Flow / Competition Sim, Survival Mode
   - **JS preserved:** zone data array, getZone(), render(), slider input listener

5. **S05 -- The Two Axes** (SVG diagram)
   - Intensity x Problem Density 2x2 quadrant SVG
   - Four zones: Passive comfort, Technical Flow (gold), Muscling Through (red), Hard Technical (blue)
   - Two musing boxes: "Core Observation" + "What to pursue instead"

6. **S06 -- Open Questions** (4 musing boxes)
   - Flow state in hard rolling, opponent-as-modulator, ego threshold, skill fragmentation

7. **Footer** -- simple text line

### Header adaptation

The original has a full header block with title, subtitle, status bar, and back-link. Adapt to:
- Title rendered as hero section (not in toolbar)
- Subtitle text preserved
- Status bar (DRAFT / NOT peer-reviewed / PRACTITIONER theory) rendered as small monospace badge
- Back-link to Tab 2 ("The Research") instead of external file

## Tab 2: The Research (Secondary)

Source: `flow-theory_jelastyle.html`

### Sections preserved (hero + 7 content sections + footer)

1. **Hero** -- title, subtitle, meta line
   - Adapted as section header (no full-viewport hero inside a tab)
   - Drop: radial gradient `::before`, scroll-hint element, staggered animation-delays on hero children. These are full-page hero patterns that don't work inside a tab panel.

2. **S01 -- Origins** ("Before the word existed")
   - Two-column: narrative text + timeline (8 items, 1964-2021)
   - Timeline items with year badges and dot markers

3. **S02 -- The Original Model** (interactive canvas + tabs)
   - Two-column: 8-channel canvas diagram + nine components
   - **Canvas JS preserved:** channel data, draw(), mousemove/click/mouseleave handlers, channel info panel
   - Tab toggle: Conditions / Characteristics / Consequence
   - Pull quote

4. **S02b -- Pop Science** ("Three common representations")
   - 3-column grid of vis-cards, each containing an SVG diagram
   - 1975 Original, 1988 Eight Channels (radial), 2000s Pop Version
   - Pull quote with synthesis note

5. **S03 -- Methodology** (ESM method box)
   - Method box with labeled border
   - Two-column: strengths + limitations

6. **S04 -- Neural Basis** (brain SVG + EEG findings)
   - Two-column: transient hypofrontality narrative + brain diagram SVG + EEG text
   - Brain SVG: simplified silhouette with PFC and basal ganglia regions

7. **S05 -- Replication & Failure** (evidence cards)
   - 3 stat callouts (24 operationalizations, 2,622 publications, r=0.31)
   - 8 evidence cards in auto-fill grid with status badges (replicated/partial/failed/open)
   - Pull quote from Jackman et al.

8. **S06 -- Summary Verdict** (table)
   - 7-row verdict table: claim, status dot, assessment
   - Bottom line paragraph

9. **S07 -- Source Literature** (paper list)
   - 10 paper items in bordered list: number, title, meta, link button

10. **Footer** -- simple text line

### Section Nav

The original has a fixed nav with section anchors and an IntersectionObserver for active-state tracking. Adapt to:
- Inline section nav at the top of Tab 2 content (not fixed; the sticky tab bar already provides navigation)
- Same anchor links, styled as monospace inline links matching site border/accent pattern
- **Drop the nav active-state IntersectionObserver** -- it is only useful with a fixed nav that stays visible during scroll. An inline nav scrolls out of view, making active tracking pointless.

## Visual Adaptation Rules

### Colors

| Role | Original (bjj) | Original (theory) | Site value |
|---|---|---|---|
| Background | `#f2ede4` (paper) | `#0d0d10` | `#050509` (bg) |
| Surface/card bg | `#ece6db` | `#13131a` | `#0E1014` (surface) |
| Primary text | `#1a1612` | `#cfc9bb` | `#E5E7EB` (text-primary) |
| Secondary text | `#4a4440` | `#8a8478` | `#9CA3AF` (text-muted) |
| Dim text | `#8a8078` | `#8a8478` | `#6B7280` (text-dim) |
| Accent (primary) | `#c03030` (red) | `#c8a84b` (amber) | `#4C8DFF` (accent) |
| Accent (secondary) | `#b08828` (gold) | `#e0c070` | `#00FFFF` (cyan) |
| Accent (tertiary) | `#2a5878` (blue) | `#4a9060` (green) | `#A970FF` (accent-soft) |
| Borders | `rgba(26,22,18,0.12)` | `rgba(200,168,75,0.15)` | `#1C1F26` (border) |
| Border strong | `rgba(26,22,18,0.25)` | `rgba(200,168,75,0.35)` | `#4C8DFF33` |

### Slider zone colors (S04)

Map the 6 zones to distinguishable values within the site palette:
- Dead Drilling: `#6B7280` (text-dim)
- Soft Flow Roll: `#34D399` (green, reuse from ideal-partner)
- Technical Flow Zone: `#00FFFF` (cyan) -- the "gold standard" zone
- Ego Threshold Zone: `#F59E0B` (amber/warning)
- Hard Flow / Competition: `#4C8DFF` (accent)
- Survival Mode: `#EF4444` (red/danger)

### Quadrant diagram colors (S05 SVG)

- Passive comfort zone (bottom-left): dim, `rgba(107,114,128,0.1)`
- Technical Flow Zone (top-left, highlight): cyan `rgba(0,255,255,0.12)`
- Muscling Through (bottom-right): red `rgba(239,68,68,0.08)`
- Hard Technical Rolling (top-right): accent `rgba(76,141,255,0.1)`

### Evidence card status badges

- Replicated: green `#34D399` bg
- Partial: amber `#F59E0B` bg (semantic: warning/incomplete)
- Failed: red `#EF4444` bg
- Open: accent `#4C8DFF` bg

### Typography

- All fonts become `"Courier New", Consolas, Monaco, monospace`
- Remove all Google Fonts `<link>` imports
- Font sizes use `var(--text-xs)` through `var(--text-lg)`
- Headings: `var(--text-lg)` or larger via clamp, uppercase or not per context
- Body: `var(--text-base)`
- Labels/eyebrows: `var(--text-xs)`, uppercase, letter-spacing 0.1-0.2em
- Chinese characters in callout: keep large size, system CJK fallback will vary by platform (MS Mincho/Yu Gothic on Windows, Hiragino on macOS) -- acceptable

### Component Styling

**Eyebrows** (section numbers): `var(--text-xs)`, `text-dim`, uppercase, tracking wide

**Section headings**: `var(--text-lg)` or `clamp(1.4rem, 3vw, 2rem)`, `text-primary`, normal weight (monospace doesn't need bold for hierarchy)

**Paragraph text**: `var(--text-base)`, `text-muted`, line-height 1.7

**Callout box**: `surface` bg, left border `accent`, padding

**Musing box**: `surface` bg, `border` border, `::before` label in `accent` color

**Problem grid / detail cells**: 1px gap with `border` color, `surface` bg cells

**Pull quotes**: left border `accent`, italic (where monospace supports it)

**Evidence cards**: `surface` bg, `border` border, hover brightens border to `accent`

**Paper list items**: `surface` bg rows, `border` separators, link buttons with `accent` border

**Verdict table**: `border` row separators, `accent` header color, status dots (green/accent/red)

**Method box**: `surface` bg, `border-strong` border, `::before` METHOD label in `accent`

**Timeline**: vertical line in `accent` dim, dot markers, year badges in `accent`

**Stat callouts**: left border `accent`, large number in `accent`, label in `text-muted`

## Interactive Elements

### Intensity Slider (Tab 1, S04)

Preserve the JS data model (6 zones array with min/max/name/subtitle/desc/challenge/flow/cognitive/color/alert). Update zone colors per mapping above.

Slider styling:
- Track: `#1C1F26` with 3px height
- Thumb: 22px circle, `text-primary` fill, `bg` border
- Threshold marks: tick lines in `border`, labels in `text-dim`
- Meter bar: `surface` bg, fill color matches zone
- Zone details grid: `surface` cells, `border` gaps

### 8-Channel Canvas (Tab 2, S02)

Preserve the canvas JS (channel data, hit testing, hover/click handlers, info panel). Update:
- Channel fill colors to site-palette equivalents
- Flow channel highlighted in `accent` / `cyan`
- Hover state: border in `accent`, brighter fill
- **Canvas font strings** must be updated from `'Space Mono, monospace'` to `'"Courier New", Consolas, Monaco, monospace'` to match the site font stack (Google Fonts are removed)
- Info panel: `surface` bg, left border `accent`

### Tab Toggles (Tab 2, S02)

Conditions / Characteristics / Consequence tabs. Style as:
- Row of buttons with `border` borders
- Active: `accent` text, subtle `accent` bg tint
- Inactive: `text-dim`, transparent bg

### Intersection Observer (Tab 2)

Sections start `opacity:0; translateY(24px)`, animate to visible on scroll. Use `translateY(24px)` (matching the source) rather than the site's `fade-up` which uses `translateY(8px)` -- the longer travel reads better for long-form article sections.

### SVG Font Attributes

All inline SVG `<text>` elements in both tabs hardcode original font families (`Playfair Display`, `IBM Plex Mono`, `EB Garamond`, `Crimson Pro`, `Space Mono`). These must all be updated to the site monospace stack: `"Courier New", Consolas, Monaco, monospace`.

### Section Nav (Tab 2)

Horizontal scrolling nav at top of research tab content. Style matches site header nav: `text-xs`, `text-dim`, uppercase, hover `accent`.

## File Structure

Single file: `src/pages/modules/flow-roll.astro`

Estimated size: ~2000-2500 lines (both articles combined, styles scoped, scripts inline). This is consistent with other large modules (ideal-partner, skill-check).

No external data files needed. No new components. No new images (SVGs are inline).

## Registration

Add entry to `src/pages/experiments.astro`:

```js
{
  title: 'Flow & Roll',
  description: 'What does "flow" actually mean in sparring? A practitioner model for intensity, problem density, and the science behind it.',
  href: `${base}/modules/flow-roll`,
  status: 'live' as const,
  tag: 'INTERACTIVE ESSAY',
}
```

No thumbnail initially (gradient placeholder is fine).

## Content Fixes During Port

- Fix typo in Tab 2 visuals section pull quote: "diretionally" -> "directionally"

## Out of Scope

- No cross-linking to concept pages (BJJ-013, BJJ-109, etc.) in this pass
- No Japanese translation layer
- No mobile-specific layout overrides beyond existing responsive breakpoints in the source HTML
- No new fonts or font loading
