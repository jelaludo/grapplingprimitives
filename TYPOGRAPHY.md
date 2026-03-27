# Typography

Project-specific typography decisions and audit history.

---

## Current State

| Property | Value | Status |
|----------|-------|--------|
| Body CPL | `min(90vw, 60ch)` (~60 CPL) articles + ACT sections | conforming |
| Body font size | `var(--text-base)` = `clamp(16px, 1.1vw + 6px, 21px)` globally + articles | conforming |
| Body line-height | 1.8 (articles), 1.7 (principles) | conforming |
| Dark contrast | `#E5E7EB` on `#050509` (~15.8:1) | conforming |
| Dark mode | `color-scheme: dark` declared on `html` | conforming |
| Type scale | 5 custom sizes via `clamp()` (chrome/xs/sm/base/lg) | conforming (≤6 sizes) |
| Mobile viewport | present (conditional `maximum-scale=1` on fullscreen) | conforming |
| Touch targets | Not systematically checked | not checked |
| Japanese support | `lang="ja"` on splash Japanese text | partial (splash only) |
| Token file | `src/styles/global.css` (custom properties incl. `--text-chrome`) | present |
| Font loading | WOFF2 variable, `font-display: swap` + preload hint, latin subset | conforming |
| Min font size | 12px floor enforced site-wide (except `font-test.astro`) | conforming |
| `text-dim` contrast | `#7B8290` on `#050509` (~5.2:1) | conforming |

## Session Log

### 2026-03-27 — Implementation

**Mode:** Generative (implementing review findings)
**Branch:** `feat/typography-overhaul`
**Surfaces touched:** global.css, tailwind.config.mjs, BaseLayout.astro, article templates, ACT pattern, ModuleCard, QuadTreeViz, ConceptMatrix, all interactive module toolbars (~25 files)

#### Before
See review session below for baseline state.

#### Decisions

| Decision | Value chosen | Basis |
|----------|-------------|-------|
| Article body font-size | `var(--text-base)` = `clamp(16px, 1.1vw+6px, 21px)` | Skill §1.2 — 16px mobile floor, monospace needs larger sizes |
| Article container width | `min(90vw, 60ch)` | Skill §1.1 — 60 CPL target for monospace |
| ACT inner width | `min(90vw, 60ch)` | Skill §1.1 — same rationale |
| Article heading line-height | `1.15` | Skill §1.3 — headings need tighter leading |
| Chrome text token | `--text-chrome: clamp(12px, 0.8vw+6px, 14px)` | Skill §4 prohibition #2 — 12px absolute floor |
| Sub-12px inline styles | All bumped to `12px` | Skill §4 prohibition #2 |
| `color-scheme: dark` | Added to `html` | Skill §1.5 — tells browser to use dark UA styles |
| `text-dim` color | `#6B7280` → `#7B8290` | Skill §1.5 — WCAG AA minimum 4.5:1 |
| Font preload | Added `<link rel="preload">` for regular weight | Skill §1.9 — reduces FOUT window |
| Japanese splash | Added `lang="ja"` to `#rt-jp` | Skill §3 — correct kinsoku shori |
| Inline code size | `0.8rem` → `0.875rem` | Borderline 12.8px bumped for readability |

#### Violations Found
See review session below.

#### After
All 10 violations from the review are resolved. Zero sub-12px font-size instances remain outside `font-test.astro`. Build passes (62 pages, 2.68s).

#### Open Items
- Touch target audit not performed (would require rendered measurement)
- ACT sections with canvas visualizations should be visually tested to ensure `60ch` width doesn't clip them
- `font-test.astro` intentionally excluded from all changes

---

### 2026-03-27 — Review

**Mode:** Review
**Surfaces touched:** global.css, article template, index.astro, ACT pattern, ModuleCard

#### Before
Existing monospace-first dark terminal design. Source Code Pro as primary font. Fluid typography via `clamp()`. No prior typography audit.

#### Decisions
N/A — review only, no changes applied.

#### Violations Found

| # | Property | Was | Should be | Fixed? |
|---|----------|-----|-----------|--------|
| 1 | Article body font-size | `0.875rem` (14px) | `var(--text-base)` clamp(16px…21px) | yes |
| 2 | Article container CPL | `max-w-3xl` (48rem, ~87 CPL) | `min(90vw, 60ch)` (~60 CPL) | yes |
| 3 | Sub-12px UI text | 9px–11px in ~60 locations | 12px minimum | yes |
| 4 | Missing `color-scheme: dark` | absent | `color-scheme: dark` on `:root` | yes |
| 5 | `--text-dim` contrast | `#6B7280` on `#050509` (~4.3:1) | `#7B8290` (~5.2:1) | yes |
| 6 | Article list font-size | `0.875rem` (14px) | inherit from body | yes |
| 7 | Article heading line-height | inherits 1.8 from container | 1.15 | yes |
| 8 | `font-display` | `swap` | added preload hint | yes |
| 9 | ACT inner CPL | `780px` (~93 CPL) | `min(90vw, 60ch)` | yes |
| 10 | Inline code size | `0.8rem` (12.8px) | `0.875rem` | yes |

#### After
No changes applied — review only. All violations deferred to implementation session.

#### Open Items
- All 10 violations pending user decision on which to fix → all fixed in implementation session above
