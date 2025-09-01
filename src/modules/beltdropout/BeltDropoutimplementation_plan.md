# 🥋 BJJ Dropout Visualization – Implementation Plan

## 🎯 Goal (Locked)
Create an interactive web-based visualization that shows the dropout progression of BJJ students across belt levels, using falling dots and physics-based motion. The experience should be educational, emotionally resonant, and actionable for both students and coaches.

---

## 📦 Modules & Features

### 1. Simulation Engine
- **Purpose**: Control the physics and progression of "student dots" as they fall through belt levels.
- **Behaviors**:
  - Gravity-based drop from spawn point
  - RNG at each belt level to determine dropout vs progress
  - Bounce logic: In-frame (continue) vs out-of-frame (dropout)
- **Tech**: p5.js or D3.js (if data-focused), or Matter.js (for physics realism)

### 2. Belt Level Structure
- **Structure**:
  - Stacked belt zones: White → Blue → Purple → Brown → Black
  - Each zone acts like a platform/stair
  - Dropped-out dots accumulate in side areas with hover metadata

### 3. Obstacle Engine (Dropout RNG)
- **Each belt level has:**
  - Configurable dropout rate slider
  - RNG calculation per dot (based on current rate)
  - Obstacle rendering (visual metaphors: injuries, time, life, etc.)

### 4. Dropout Cause Assignment
- **Behavior**:
  - When a dot drops, assign a dropout reason from predefined weighted pool
  - Hovering on dropped-out dot shows reason
- **Reason Pools** (per belt):
  - White: Injury, confusion, intimidation, scheduling, cost, ego, lack of mentorship, family, work
  - Blue: Plateau, burnout, ego, lack of mentorship, injury, scheduling, family, work, cost
  - Purple/Brown: Burnout, injuries, family, work, ego, diminishing returns, 

### 5. UI Controls
- **Sliders**: Dropout rate per belt
- **Buttons**: Start, Pause, Reset
- **Info Panel**: Tooltip or side panel showing stats, dropout causes, belt level counts

### 6. Visualization Layout
- **Top-down gravity view**
- Dots fall from top → pass through belts → accumulate into bell curve at base
- Dropped dots leave trail or bounce into side zones
- Remaining dots pile into a standard deviation shape

### 7. Stats Tracker (Optional v1.0.1)
- Show live stats:
  - Total started
  - Count per belt
  - Dropout count per reason
  - Final pile breakdown

### 8. Responsiveness & Accessibility
- Scales well on desktop/tablet
- High-contrast colors
- Tooltips readable on hover/focus

---

## 🪵 Logging & Debug Strategy
- Use `console.group` and `console.table` for debug logs per belt stage
- Simulate 1000 runs for dev mode for faster QA
- Toggle for showing path trail vs clean mode

---

## 🧪 Testing & Simulation Strategy
- Simulate user pressing Start → Pause → Adjust Sliders → Resume
- Verify consistency of belt-level flow with different RNG seeds
- Manually trigger all dropout causes to test UI hover logic

---

## 🛡️ Best Practices
- Modular JavaScript structure (1 file per module)
- Use Git from day 1: `git init`, commit each module separately
- Reset bad code with: `git reset --hard HEAD`
- Keep functions under 50 LOC
- Refactor post-simulation phase

---

## ✅ Launch Criteria
- All belt levels represented visually
- Dropout hover reveals working
- Sliders dynamically impact flow
- Dot paths resolve without overlap or UI clutter
- 1,000 dot test runs complete in <3s

---

## 📌 Notes
- This is *directionally illustrative*, not peer-reviewed research.
- Future versions may allow saving simulations or exporting stats.

