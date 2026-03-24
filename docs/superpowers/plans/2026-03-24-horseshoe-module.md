# Signal / Noise — Horseshoe Module Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create an interactive horseshoe visualization module that maps grappling culture's signal-to-noise spectrum, with quote data sourced from Obsidian-editable markdown files.

**Architecture:** Astro content collection for quote lists (one `.md` per side, quotes as body lines), essay in Articles collection rendered into a collapsible. Single `.astro` page with inline SVG + client script via `define:vars`.

**Tech Stack:** Astro 5, Tailwind CSS, inline SVG, vanilla JS client script

**Spec:** `docs/superpowers/specs/2026-03-24-horseshoe-module-design.md`

---

### Task 1: Content collection schema + quote files

**Files:**
- Modify: `src/content/config.ts:1-65`
- Create: `src/content/horseshoe-quotes/alpha.md`
- Create: `src/content/horseshoe-quotes/buffoon.md`

- [ ] **Step 1: Add horseshoe-quotes collection to config.ts**

Add before the `export` line at the bottom of `src/content/config.ts`:

```typescript
// ── Horseshoe Quotes ────────────────────────────────────────────────────────
// One file per side (alpha / buffoon). Body = one quote per line.
const horseshoeQuotes = defineCollection({
  type: 'content',
  schema: z.object({
    side: z.enum(['alpha', 'buffoon']),
    label: z.string(),
  }),
});
```

Update the exports line to include the new collection:

```typescript
export const collections = { concepts, categories, Articles, 'module-text': module_text, WordLists, 'horseshoe-quotes': horseshoeQuotes };
```

- [ ] **Step 2: Create alpha.md**

Create `src/content/horseshoe-quotes/alpha.md`:

```markdown
---
side: alpha
label: "alpha bro"
---
I'm a swimming lion in a sea of antelopes
We're not here to be soft
Survival of the fittest, bro
Pain is just weakness leaving the body
I don't tap, I nap
Every roll is a street fight
You either have it or you don't
I train to survive
The weak get filtered out
My gi is soaked in the tears of lesser men
Heart can't be taught
If it was easy, everyone would do it
Pressure makes diamonds
Peace is a privilege the strong pay for
I've forgotten more than you've learned
No excuses on the mat
Killers don't explain themselves
There are hunters and there is prey
I don't come to class to make friends
The mat is the only honest place left
Soft men create hard times
Your comfort zone is your cage
Real talk: most people don't have what it takes
This isn't a hobby, it's a lifestyle
The lion doesn't concern himself with the opinion of sheep
```

- [ ] **Step 3: Create buffoon.md**

Create `src/content/horseshoe-quotes/buffoon.md`:

```markdown
---
side: buffoon
label: "buffoon"
---
I'm only here for the oil check!
Father's milk lol
Come into my guard ;)
Aggressive cuddling is my love language
My guard is basically a hug you can't escape
I just paid to be choked by strangers
Tap or nap, either works for me
This is just therapeutic wrestling
We don't shake hands, we spoon
I call my closed guard the cuddle dungeon
Just two dudes expressing themselves
Rolling is floor yoga with drama
I didn't choose the gi life, the gi life chose me
New move just dropped: the accidental massage
My therapist says I have boundary issues. She's never seen my guard.
Technically it's not a choke, it's an aggressive nap request
I submitted him with friendship
Side control? More like side cuddle
He tried to pass. I offered him a hug. He took neither.
Rainbow gi, real consequences
Bro, my guard retention is just attachment issues
I don't roll, I negotiate
The secret technique is vibes
He thought it was sparring. I thought it was bonding.
Consent forms before drilling, that's my gym's policy
```

- [ ] **Step 4: Verify Astro sees the collection**

Run: `npx astro check 2>&1 | head -20`

Expected: no errors about horseshoe-quotes collection or schema validation.

- [ ] **Step 5: Commit**

```bash
git add src/content/config.ts src/content/horseshoe-quotes/alpha.md src/content/horseshoe-quotes/buffoon.md
git commit -m "feat(horseshoe): add horseshoe-quotes content collection with alpha + buffoon quote lists"
```

---

### Task 2: Essay article

**Files:**
- Create: `src/content/Articles/signal-noise-horseshoe.md`

- [ ] **Step 1: Create the essay file**

Create `src/content/Articles/signal-noise-horseshoe.md` with the full essay content from the companion markdown file (`G:\L_Download2026\grappling-horseshoe-companion.md`). Use this frontmatter:

```markdown
---
title: "Signal / Noise — The Grappling Horseshoe"
date: "2026-03-24"
tags: [culture, horseshoe, signal-noise]
---
```

Copy the full body content from the companion file (everything after the `# Signal / Noise — The Grappling Horseshoe` heading — skip the heading itself since the title is in frontmatter).

- [ ] **Step 2: Commit**

```bash
git add src/content/Articles/signal-noise-horseshoe.md
git commit -m "feat(horseshoe): add horseshoe essay to Articles collection"
```

---

### Task 3: Module page — HTML structure + styles

**Files:**
- Create: `src/pages/modules/horseshoe.astro`

This is the largest task. The page has: Astro frontmatter (data loading), HTML template, scoped CSS, and client script. This task covers frontmatter + HTML + CSS. Task 4 covers the client script.

- [ ] **Step 1: Create horseshoe.astro with frontmatter**

The frontmatter loads quote data and renders the essay:

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import { getCollection, getEntry } from 'astro:content';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

// ── Quote data ──
const quoteEntries = await getCollection('horseshoe-quotes');
const alphaEntry = quoteEntries.find(e => e.data.side === 'alpha')!;
const buffoonEntry = quoteEntries.find(e => e.data.side === 'buffoon')!;
const alphaQuotes = (alphaEntry.body ?? '').split('\n').filter(l => l.trim().length > 0);
const buffoonQuotes = (buffoonEntry.body ?? '').split('\n').filter(l => l.trim().length > 0);

// ── Essay ──
const essayEntry = await getEntry('Articles', 'signal-noise-horseshoe');
const { Content: EssayContent } = await essayEntry!.render();
---
```

- [ ] **Step 2: Add HTML template**

After the frontmatter closing `---`, add the full page template. Structure:

```astro
<BaseLayout title="Signal / Noise — Grappling Primitives">
  <div class="hs-page">

    <header class="hs-header">
      <p class="hs-eyebrow">Grappling Primitives</p>
      <h1 class="hs-title">Signal / Noise</h1>
      <p class="hs-sub">Both registers are fine at low dose. At high dose, they're neighbors — and neither knows it.</p>
    </header>

    <div class="hs-stage">

      <!-- alpha quote zone -->
      <div id="zone-alpha" class="hs-quote-zone hs-quote-zone--alpha"></div>

      <!-- center panel -->
      <div class="hs-center">
        <svg viewBox="0 0 500 390" class="hs-svg">
          <!-- horseshoe arc segments -->
          <path d="M 185,313 A 130,130 0 0,1 120,200" stroke="#ff4444" stroke-width="40" fill="none" stroke-linecap="butt"/>
          <path d="M 120,200 A 130,130 0 0,1 185,87"  stroke="#ffaa00" stroke-width="40" fill="none" stroke-linecap="butt"/>
          <path d="M 185,87  A 130,130 0 0,1 315,87"  stroke="#4C8DFF" stroke-width="40" fill="none" stroke-linecap="butt"/>
          <path d="M 315,87  A 130,130 0 0,1 380,200" stroke="#ffaa00" stroke-width="40" fill="none" stroke-linecap="butt"/>
          <path d="M 380,200 A 130,130 0 0,1 315,313" stroke="#ff4444" stroke-width="40" fill="none" stroke-linecap="butt"/>
          <!-- end caps -->
          <circle cx="185" cy="313" r="20" fill="#ff4444"/>
          <circle cx="315" cy="313" r="20" fill="#ff4444"/>
          <!-- neighbor line -->
          <line x1="185" y1="340" x2="315" y2="340" stroke="rgba(255,255,255,0.15)" stroke-width="1" stroke-dasharray="4,3"/>
          <!-- labels -->
          <text x="250" y="20"  text-anchor="middle" font-size="11" font-family="'Courier New',Consolas,monospace" fill="rgba(229,231,235,0.6)">craft · signal</text>
          <text x="143" y="372" text-anchor="middle" font-size="11" font-family="'Courier New',Consolas,monospace" fill="rgba(229,231,235,0.45)">alpha bro</text>
          <text x="357" y="372" text-anchor="middle" font-size="11" font-family="'Courier New',Consolas,monospace" fill="rgba(229,231,235,0.45)">buffoon</text>
          <text x="250" y="363" text-anchor="middle" font-size="9.5" font-family="'Courier New',Consolas,monospace" fill="rgba(229,231,235,0.22)">extremes are neighbors</text>
          <!-- dot -->
          <circle id="hs-dot" cx="250" cy="70" r="10" fill="#050509" stroke="#4C8DFF" stroke-width="3"/>
        </svg>

        <div class="hs-slider-row">
          <input type="range" id="hs-slider" min="0" max="100" value="50" step="1" aria-label="Signal-noise spectrum position">
          <div class="hs-slider-labels">
            <span>alpha extreme</span>
            <span>craft center</span>
            <span>buffoon extreme</span>
          </div>
        </div>

        <div class="hs-signal-row">
          <span class="hs-signal-label">signal</span>
          <div class="hs-signal-track">
            <div class="hs-signal-fill" id="hs-bar"></div>
          </div>
          <span class="hs-signal-pct" id="hs-pct">95%</span>
        </div>

        <div class="hs-zone-info">
          <div class="hs-zone-label" id="hs-label"></div>
          <div class="hs-zone-desc" id="hs-desc"></div>
        </div>
      </div>

      <!-- buffoon quote zone -->
      <div id="zone-buffoon" class="hs-quote-zone hs-quote-zone--buffoon"></div>

    </div>

    <footer class="hs-tolkien">
      <blockquote>
        "It is the way of my people to use light words at such times and say less than they mean.<br>
        We fear to say too much. It robs us of the right words when a jest is out of place."
      </blockquote>
      <cite>— Tolkien, The Return of the King</cite>
    </footer>

    <details class="tldr">
      <summary class="tldr__toggle">The Grappling Horseshoe — full essay</summary>
      <div class="tldr__body article-prose">
        <EssayContent />
      </div>
    </details>

  </div>
</BaseLayout>
```

- [ ] **Step 3: Add scoped styles**

Add a `<style is:global>` block after the template. Must be `is:global` because the quote elements (`.hs-q-item`) are created dynamically by the client script and won't have Astro's scoped `data-astro-cid-*` attribute. All classes are prefixed `hs-` to avoid collisions:

```css
<style is:global>
  .hs-page {
    max-width: 860px;
    margin: 0 auto;
    padding: 48px 16px 64px;
  }

  .hs-header {
    text-align: center;
    margin-bottom: 48px;
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
  }

  .hs-eyebrow {
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--text-dim);
    margin-bottom: 12px;
  }

  .hs-title {
    font-size: clamp(22px, 4vw, 32px);
    font-weight: 400;
    letter-spacing: 0.02em;
    color: var(--text-primary);
    margin-bottom: 14px;
    text-shadow: 0 0 12px #4C8DFF88;
  }

  .hs-sub {
    font-size: var(--text-sm);
    color: var(--text-muted);
    line-height: 1.7;
    font-style: italic;
  }

  /* ── main layout ── */
  .hs-stage {
    display: grid;
    grid-template-columns: 1fr minmax(0, 480px) 1fr;
    gap: 0;
    width: 100%;
    align-items: start;
  }

  /* ── quote zones ── */
  .hs-quote-zone {
    position: relative;
    min-height: 340px;
    overflow: hidden;
    padding: 0 8px;
  }

  .hs-quote-zone--alpha  { padding-right: 12px; }
  .hs-quote-zone--buffoon { padding-left: 12px; }

  .hs-q-item {
    position: absolute;
    font-size: var(--text-xs);
    line-height: 1.55;
    font-style: italic;
    opacity: 0;
    max-width: 100%;
    pointer-events: none;
  }

  .hs-q-item--alpha   { color: #ff4444; text-align: right; right: 0; }
  .hs-q-item--buffoon { color: #ea580c; text-align: left; left: 0; }

  /* ── SVG panel ── */
  .hs-svg { width: 100%; display: block; }

  /* ── slider ── */
  .hs-slider-row {
    padding: 0 2rem;
    margin: 4px 0 12px;
  }

  .hs-slider-row input[type=range] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 3px;
    background: linear-gradient(to right, #ff4444 0%, #ffaa00 25%, #4C8DFF 50%, #ffaa00 75%, #ff4444 100%);
    border-radius: 2px;
    outline: none;
    cursor: pointer;
    opacity: 0.7;
  }

  .hs-slider-row input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #050509;
    border: 2.5px solid var(--thumb-color, #4C8DFF);
    cursor: grab;
    transition: border-color 0.15s;
  }

  .hs-slider-row input[type=range]:active::-webkit-slider-thumb { cursor: grabbing; }

  .hs-slider-row input[type=range]::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #050509;
    border: 2.5px solid var(--thumb-color, #4C8DFF);
    cursor: grab;
  }

  .hs-slider-labels {
    display: flex;
    justify-content: space-between;
    margin-top: 6px;
    font-size: 10px;
    color: var(--text-dim);
    letter-spacing: 0.04em;
  }

  /* ── signal bar ── */
  .hs-signal-row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 1rem;
    margin-bottom: 16px;
  }

  .hs-signal-label {
    font-size: 10px;
    color: var(--text-dim);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    min-width: 36px;
  }

  .hs-signal-track {
    flex: 1;
    height: 4px;
    background: rgba(255,255,255,0.07);
    border-radius: 2px;
    overflow: hidden;
  }

  .hs-signal-fill {
    height: 100%;
    width: 95%;
    background: #4C8DFF;
    border-radius: 2px;
    transition: width 0.15s ease, background 0.15s ease;
  }

  .hs-signal-pct {
    font-size: 11px;
    color: var(--text-muted);
    min-width: 30px;
    text-align: right;
    font-variant-numeric: tabular-nums;
  }

  /* ── zone info ── */
  .hs-zone-info {
    border-top: 1px solid var(--border);
    padding: 16px 16px 12px;
    min-height: 80px;
  }

  .hs-zone-label {
    font-size: var(--text-xs);
    font-weight: 500;
    letter-spacing: 0.04em;
    margin-bottom: 8px;
    transition: color 0.15s;
  }

  .hs-zone-desc {
    font-size: var(--text-sm);
    color: var(--text-muted);
    line-height: 1.7;
  }

  /* ── tolkien footer ── */
  .hs-tolkien {
    margin-top: 52px;
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    border-top: 1px solid var(--border);
    padding-top: 28px;
  }

  .hs-tolkien blockquote {
    font-style: italic;
    font-size: var(--text-sm);
    color: var(--text-muted);
    line-height: 1.75;
    margin-bottom: 8px;
  }

  .hs-tolkien cite {
    font-size: 11px;
    color: var(--text-dim);
    letter-spacing: 0.06em;
  }

  /* ── responsive ── */
  @media (max-width: 600px) {
    .hs-stage { grid-template-columns: 1fr; }
    .hs-quote-zone { display: none; }
    .hs-header { margin-bottom: 32px; }
  }
</style>
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/modules/horseshoe.astro
git commit -m "feat(horseshoe): add module page with HTML structure and styles"
```

---

### Task 4: Module page — client script

**Files:**
- Modify: `src/pages/modules/horseshoe.astro` (append script block)

- [ ] **Step 1: Add the client script with define:vars**

Add this `<script>` block between the closing `</BaseLayout>` tag and the `<style>` block:

```astro
<script define:vars={{ alphaQuotes, buffoonQuotes }}>
(function () {
  'use strict';

  const ZONES = [
    { max: 15,  label: 'Alpha extreme \u2014 performance crowding signal', color: '#ff4444',
      desc: 'Every roll is a proving ground. Training partners are prey. The mat serves the persona, not the other way around.' },
    { max: 35,  label: 'Alpha register \u2014 signal dominant',            color: '#ffaa00',
      desc: 'Real-politik edge that checks complacency. The tough register in service of the craft \u2014 not the craft in service of the idiom.' },
    { max: 65,  label: 'Craft center',                                     color: '#4C8DFF',
      desc: 'The thing being studied is the point. Humor, edge, intensity \u2014 held in reserve, deployed with intent. Idiom serves the work.' },
    { max: 85,  label: 'Levity register \u2014 signal dominant',           color: '#ffaa00',
      desc: 'Humor makes the room easier to be in. Self-deprecating acknowledgment of the absurdity. Signal intact \u2014 the joke is not the session.' },
    { max: 100, label: 'Buffoon extreme \u2014 performance crowding signal', color: '#ff4444',
      desc: 'Every position is a bit. Every tap is a performance. The mat is a stage. Two people rolling are the audience. Signal gone.' },
  ];

  const sl  = document.getElementById('hs-slider');
  const dot = document.getElementById('hs-dot');
  const bar = document.getElementById('hs-bar');
  const pct = document.getElementById('hs-pct');
  const lbl = document.getElementById('hs-label');
  const dsc = document.getElementById('hs-desc');
  const zA  = document.getElementById('zone-alpha');
  const zB  = document.getElementById('zone-buffoon');

  let aTimer = null, bTimer = null;
  let aUsed  = [],   bUsed  = [];

  function pick(arr, used) {
    if (used.length >= arr.length) used.length = 0;
    const rem = arr.filter(function (q) { return used.indexOf(q) < 0; });
    const q   = rem[Math.floor(Math.random() * rem.length)];
    used.push(q);
    return q;
  }

  function spawn(zone, text, cls) {
    const el       = document.createElement('div');
    el.className   = 'hs-q-item hs-q-item--' + cls;
    el.textContent = '\u201C' + text + '\u201D';
    el.style.top   = Math.floor(Math.random() * 72) + '%';
    el.style.opacity = '0';
    zone.appendChild(el);

    const FI = 350, STAY = 2200, FO = 800, total = FI + STAY + FO;
    let t0 = null;

    (function frame(ts) {
      if (!t0) t0 = ts;
      const e = ts - t0;
      let op;
      if      (e < FI)          op = e / FI;
      else if (e < FI + STAY)   op = 1;
      else if (e < total)       op = 1 - (e - FI - STAY) / FO;
      else { el.remove(); return; }
      el.style.opacity = op.toFixed(3);
      requestAnimationFrame(frame);
    })(performance.now());
  }

  function startAlpha() {
    if (aTimer) return;
    spawn(zA, pick(alphaQuotes, aUsed), 'alpha');
    aTimer = setInterval(function () { spawn(zA, pick(alphaQuotes, aUsed), 'alpha'); }, 1900);
  }
  function stopAlpha() { if (aTimer) { clearInterval(aTimer); aTimer = null; } }

  function startBuff() {
    if (bTimer) return;
    spawn(zB, pick(buffoonQuotes, bUsed), 'buffoon');
    bTimer = setInterval(function () { spawn(zB, pick(buffoonQuotes, bUsed), 'buffoon'); }, 1900);
  }
  function stopBuff() { if (bTimer) { clearInterval(bTimer); bTimer = null; } }

  function update(v) {
    const t = v / 100;
    const a = (120 + t * 300) * Math.PI / 180;
    dot.setAttribute('cx', (250 + 130 * Math.cos(a)).toFixed(2));
    dot.setAttribute('cy', (200 + 130 * Math.sin(a)).toFixed(2));

    const z = ZONES.find(function (x) { return v <= x.max; }) || ZONES[4];
    dot.setAttribute('stroke', z.color);

    const sig = Math.round(20 + 75 * (1 - Math.pow(2 * v / 100 - 1, 2)));
    bar.style.width      = sig + '%';
    bar.style.background = z.color;
    pct.textContent      = sig + '%';
    lbl.textContent      = z.label;
    lbl.style.color      = z.color;
    dsc.textContent      = z.desc;

    sl.style.setProperty('--thumb-color', z.color);

    if      (v <= 15)  { startAlpha(); stopBuff();  }
    else if (v >= 85)  { startBuff();  stopAlpha(); }
    else               { stopAlpha();  stopBuff();  }
  }

  sl.addEventListener('input', function (e) { update(+e.target.value); });
  update(50);
})();
</script>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/modules/horseshoe.astro
git commit -m "feat(horseshoe): add client-side interactive script with define:vars quote data"
```

---

### Task 5: Register in experiments page

**Files:**
- Modify: `src/pages/experiments.astro:8-72` (the `experiments` array)

- [ ] **Step 1: Add entry to experiments array**

In `src/pages/experiments.astro`, add this entry to the end of the `experiments` array (before the closing `];` on line 72):

```typescript
  {
    title: 'Signal / Noise',
    description: 'The horseshoe model applied to grappling culture. Both extremes are neighbors — and neither knows it.',
    href: `${base}/modules/horseshoe`,
    status: 'live' as const,
    tag: 'INTERACTIVE ESSAY',
  },
```

Note: `thumb` omitted for now (like `flow-roll`). Thumbnail will be added after the module is live and screenshot-ready.

- [ ] **Step 2: Commit**

```bash
git add src/pages/experiments.astro
git commit -m "feat(horseshoe): add Signal/Noise to experiments page"
```

---

### Task 6: Dev server smoke test

- [ ] **Step 1: Start dev server**

Run: `npx astro dev`

Expected: server starts without errors.

- [ ] **Step 2: Test the module page**

Open `http://localhost:4321/modules/horseshoe` in a browser. Verify:

1. Page loads with site header/footer (BaseLayout)
2. SVG horseshoe renders with blue/orange/red arc segments
3. Slider moves the dot along the arc
4. Signal bar updates (95% at center, ~20% at extremes)
5. Zone label + description change per zone
6. Floating quotes appear at extremes (slider ≤15 or ≥85)
7. Alpha quotes appear in left zone (red text, right-aligned)
8. Buffoon quotes appear in right zone (orange text, left-aligned)
9. Tolkien quote renders below widget
10. Collapsible essay expands/collapses with full essay content
11. Typography is monospace throughout (no serif fonts)

- [ ] **Step 3: Test responsive behavior**

Resize browser to <600px width. Verify:

1. Layout collapses to single column
2. Quote zones are hidden
3. Widget still functions (slider, dot, signal bar, zone info)

- [ ] **Step 4: Test experiments page**

Open `http://localhost:4321/experiments`. Verify:

1. "Signal / Noise" card appears in main grid
2. Card links to `/modules/horseshoe`
3. Tag shows "INTERACTIVE ESSAY"

- [ ] **Step 5: Fix any issues found, commit fixes**
