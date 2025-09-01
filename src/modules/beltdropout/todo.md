# ✅ TODO: BJJ Dropout Visualization

## 🎯 Core Tasks

### 🔧 Infrastructure
- [ ] Set up project scaffold (Vite or similar)
- [ ] Install rendering library (e.g., p5.js or Matter.js)

### 🎮 Simulation Engine
- [ ] Implement dot spawn with gravity
- [ ] Build RNG-based belt-level progression logic
- [ ] Add bounce-in-frame vs out-of-frame drop logic

### 🥋 Belt Progression Logic
- [ ] Create belt stage visual components
- [ ] Encode dropout % sliders for each belt
- [ ] Create dropout cause pools

### 💥 Obstacle/Dropout Engine
- [ ] Render visual obstacles (life, injury, etc.)
- [ ] Link slider to dropout RNG per belt
- [ ] Assign dropout reasons to fallen dots
- [ ] Hover-to-view dropout cause

### 🧑‍💻 UI & Controls
- [ ] Start / Pause / Reset buttons
- [ ] Dropout sliders per belt level
- [ ] Live stats panel: # started, # per belt, dropout causes

### 📊 Visualization & Layout
- [ ] Dot trajectory and accumulation
- [ ] Clean bell curve output for final stage
- [ ] Responsiveness and scaling across devices

### 🔬 Debug & Logging
- [ ] Add console.table for belt tracking
- [ ] Simulate 1000-dots test run mode

## 🧪 QA
- [ ] Test belt flow for each dropout scenario
- [ ] Verify slider impact
- [ ] Confirm hover logic

## 🚀 Launch Ready
- [ ] Working simulation end-to-end
- [ ] All dropout reasons accessible
- [ ] Visual curve is readable and consistent
- [ ] Runs efficiently (<3s for 1000 dots)

