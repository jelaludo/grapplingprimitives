# Back Control Story Module: "Control Their Rotation"

## Overview

An interactive story module (like ideal-partner and jibunwotsukure) that tells the conceptual story of back control in grappling. Central thesis: **back control IS rotation control**. The module avoids technique names and instead unpacks the mechanism: hip line + shoulder line = spinal axis = locked rotation = exposed neck.

**Page**: `/modules/back-control`
**File**: `src/pages/modules/back-control.astro`
**Pattern**: Fullscreen scrollytelling (BaseLayout fullscreen=true), inline scripts, acts with IntersectionObserver

## New Primitive

**Rotational Control** (`BJJ-261`)
- Category: Grappling Primitives
- axis_self_opponent: ~-0.3 (opponent-focused)
- axis_mental_physical: ~-0.7 (physical)
- Related: `BJJ-030` (6DoF), `BJJ-240` (Axis Awareness), `BJJ-031` (Form Tension), `BJJ-236` (Stay Connected)
- Short description: "Preventing spinal rotation by controlling both the hip line (rotation base) and shoulder line (rotation top). The fundamental mechanism beneath all back control systems."

## Act Structure (5 acts)

### ACT 0 - The Asymmetry (Hero)

**Thesis**: "Back control can be twelve perfectly executed steps, or it can be abstracted to one: control their rotation."

**Content**: Why the back is dominant. Geometric asymmetry without jargon:
- Front-facing: symmetric, equal access to tools, vision, structure
- Back-facing: attacker sees everything, defender sees nothing. Strongest muscles push at air. Arms defensive. Neck exposed.
- Key insight: every back escape is a rotation attempt

**Interactive**: Single SVG with two simplified geometric figures (circles + rectangles, not anatomical). Toggle between front-facing (balanced arrows for threats, vision, structure) and back-facing (one-way arrows, blind zone, exposed neck). Trigger: click/tap toggles states. On scroll past threshold (0.5), auto-switches to back-facing. Mobile: full-width, tap to toggle.

### ACT 1 - The Primitive (Core Concept)

**Reveal**: If every escape is rotation, then control = preventing rotation. Two lines define rotation:
- Hip Line: the rotation base, where turning power originates
- Shoulder Line: the rotation top, where turning is expressed
- Lock both = lock the spinal axis = no escape possible = neck opens

**Equation**: `Hip Line + Shoulder Line = Spinal Control = Locked Axis -> Opens Neck`

**Interactive**: Canvas top-down torso oval with two horizontal lines (hip = lower, shoulder = upper). User drags either line's endpoint to rotate it (mouse + touch). Rotation range: -45 to +45 degrees from parallel. Tolerance: within 10 degrees of parallel = CONTROLLED (green), 10-30 degrees = CONTESTED (amber), 30+ degrees = ESCAPING (red). State label updates live. Mobile: lines are larger touch targets, torso scales to viewport width. Text labels alongside colors for accessibility.

### ACT 2 - Three Expressions (Philosophies)

**Frame**: Same primitive, three strategies. Side-by-side columns:

**RIDE** (green): "Movement is inevitable. Stay attached, let each escape reveal the opening."
- Engine: Chest adhesion + mobile hooks
- When: Fast, mobile opponent
- Breaks: If attachment lost under speed

**FREEZE** (amber): "Remove the ability to initiate movement. The rotation never begins."
- Engine: Body triangle + shoulder pin
- When: Bigger/stronger opponent
- Breaks: High energy cost to maintain

**SPIRAL** (orange, starred): "Control opposite corners. The diagonal creates torsion the spine cannot resist."
- Engine: Far shoulder + near hip
- When: Achievable = superior, easiest to maintain
- Breaks: Requires precise angle maintenance

**Nuance**: Spiral is superior when achievable (easier to maintain, harder to escape). Ride and Freeze are what you have when the opponent is bigger, stronger, more mobile, or better at protecting their spine. Not a hierarchy of skill -- a toolkit matched to circumstances.

**Interactive**: Static comparison cards. Each card could subtly animate its engine (Ride pulses/flows, Freeze is rigid, Spiral rotates).

### ACT 3 - The Machine (Simulation)

The core interactive. Adapted from BackAttacksViz.html with shoulder control added.

**5 parallel dimensions**:

| Dimension | Label | Goal |
|-----------|-------|------|
| Grips | Grips | Negate the hands |
| Hip | Hip Control | Anchor hip line, block base rotation |
| Shoulder | Shoulder Control | Anchor shoulder line, block upper turn |
| Head | Head Control | Twist and expose neck |
| Strangle | Strangulation | Carotids best, mandible works |

**Each dimension**: 3 states (Controlled / Contested / Lost) with decay over time.

**Bridge row**: Between Hip and Shoulder, a composite "Spinal Control Integrity" bar.
- `spinalControl = (hipScore * 0.55) + (shoulderScore * 0.45)`
- Hip weighted slightly more (rotation originates at hips)
- Visual: green bar spanning the two columns

**Strategy toggle**: Ride / Freeze / Spiral buttons above simulation. Changes transition probabilities live. Strategies use distinct visual treatment (border color + icon) separate from state colors to avoid confusion:

| Parameter | Ride | Freeze | Spiral |
|-----------|------|--------|--------|
| controlled_to_contested | 0.18 (high) | 0.08 (low) | 0.06 (lowest) |
| contested_to_controlled | 0.22 (high) | 0.12 (low) | 0.16 (mid) |
| lost_to_contested | 0.15 (high) | 0.06 (low) | 0.10 (mid) |
| cascade_strength | 0.05 (low) | 0.20 (high) | 0.03 (lowest) |
| controlDecayTicks | 25 (fast) | 45 (slow) | 35 (mid) |
| spinal_bonus | 0.10 | 0.15 | 0.25 (highest) |

*These are starting defaults; tuned via playtesting in Phase 1.*

**Cascade**: Directional, left-to-right: Grips -> Hip -> Shoulder -> Head -> Strangle. When a dimension enters "Lost", it adds `cascade_strength` to the contested_to_lost probability of the next dimension. One-directional only.

**Control decay**: Controlled states visually decay over `controlDecayTicks`. Score mapping: Controlled=1.0, Contested=0.5, Lost=0.15 (as 0-1 floats).

**Bail**: When `finishProb` (multiplicative product of all 5 dimension scores, plus spinal_bonus when Hip+Shoulder both controlled) drops below bail threshold (default 10%, configurable in settings), auxiliary options appear as tags (kimura, triangle, lockdown, gift wrap, etc.).

**Terminal states** (visually distinct):
- Submission/tap: pulsing green glow, clear "SUBMISSION" label
- Escape: pulsing red, "ESCAPED" label
- Pause between resets before autoplay continues

**Controls**:
- Autoplay by default (runs continuously)
- Play/Pause button
- Step button
- Gear icon opens settings modal: speed, attacker skill, defender skill, cascade strength, bail threshold
- Pause between rounds on reset (2-3 seconds showing terminal state)

### ACT 4 - The Primitive Card (Close/CTA)

**New primitive**: "Rotational Control" card rendered in the existing concept card style.
- Links to: 6DoF, Axis Awareness, Form Tension, Stay Connected
- Position shown as a static SVG dot on a simplified 2x2 quadrant diagram (not an embedded quadtree iframe)

**CTAs**: Links to QuadTree module, Build Yourself module, and other relevant modules.

## Technical Approach

### File Structure
- Single `.astro` file: `src/pages/modules/back-control.astro`
- New primitive MD: `src/content/concepts/grappling-primitives/BJJ-261-rotational-control.md`
- Pattern: inline `<script>` and `<style>` tags (matches ideal-partner, jibunwotsukure)

### Implementation Phases

**Phase 1**: Upgrade BackAttacksViz.html standalone
- Add Shoulder Control as 5th dimension
- Add bridge row (Spinal Control Integrity)
- Add strategy toggle (Ride/Freeze/Spiral)
- Add terminal state visuals (submission glow, escape indication)
- Add autoplay with pause-between-resets behavior
- Ensure gear icon settings modal
- Test standalone before integration

**Phase 2**: Create back-control.astro module page
- BaseLayout fullscreen=true
- Toolbar (Home, title, Link, Lang toggle)
- ACT 0: Asymmetry SVG
- ACT 1: Rotation drag interactive
- ACT 2: Three philosophy cards
- Scrollytelling with IntersectionObserver + hash tracking

**Phase 3**: Integrate simulation into ACT 3
- Port upgraded BackAttacksViz into the act
- Adapt styling to match site theme (dark, monospace, CSS variables)
- Responsive: consider mobile layout (stack columns on narrow screens)

**Phase 4**: Create Rotational Control primitive + ACT 4
- Write BJJ-261-rotational-control.md
- Render primitive card in closing act
- Add CTAs

### Key Files to Reference
- `src/pages/modules/ideal-partner.astro` -- scrollytelling pattern, toolbar, IntersectionObserver
- `src/pages/modules/jibunwotsukure.astro` -- act structure, canvas inline scripts
- `src/pages/modules/build-yourself.astro` -- canvas drawing helpers (heatColor, drawLine, drawArrow, drawGlow), slider/autoplay pattern
- `src/layouts/BaseLayout.astro` -- fullscreen prop
- `src/content/config.ts` -- concept schema
- `src/styles/global.css` -- typography variables, color system
- `G:\Dev\experiments\BJJ_StagesGoalsTools\BackAttacksViz.html` -- simulation source
- `G:\Dev\experiments\BJJ_StagesGoalsTools\BackTakeBackControlNotes.md` -- conceptual framework
- `G:\Dev\experiments\BJJ_StagesGoalsTools\back-controlStoryByClaudeChatV1Brainstorm.html` -- brainstorm reference

### Styling
- Dark theme matching site (#050509 background)
- Typography: --text-xs/sm/base/lg variables from global.css
- Monospace font (Courier New, Consolas)
- Color coding: green (controlled), amber (contested), red (lost)
- Strategy identification: border/outline color + icon (not fill) to avoid collision with state colors. Ride = dashed green border, Freeze = solid amber border, Spiral = dotted orange border

## Verification

1. `npx astro dev` -- module loads at `/modules/back-control`
2. All 5 acts scroll correctly with hash tracking
3. ACT 1 rotation drag interactive works (mouse + touch)
4. ACT 3 simulation: autoplay runs, strategy toggle changes behavior, gear icon opens settings, terminal states (submission/escape) display correctly with pause
5. Bridge row shows Spinal Control Integrity composite
6. New primitive appears in QuadTree at correct position
7. Mobile: test via `npx astro preview --host` at 192.168.0.199
8. No emdashes in any text content
9. Strategy toggle produces visibly different simulation behavior (Ride = more volatility, Freeze = stable then catastrophic, Spiral = most stable)
10. Dimension states always have text labels alongside colors (accessibility)
