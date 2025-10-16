# Pressure Game - Combat System Implementation (v1)

## 🎮 Overview
Successfully integrated BJJ × D&D-style combat mechanics into the Pressure Game. Players now experience a roleplay combat scenario where their timing/pressure performance (d20 roll) determines the outcome of a BJJ technique against an opponent.

---

## 📁 Files Created

### 1. **imageMapping.ts**
- Maps 160 Memory game images to belt colors
- **Adult Belts**: White (39), Blue (13), Purple (14), Brown (24), Black (39)
- **Kids Belts**: Grey (1), Yellow (19), Orange (3), Green (3), Red (5)
- Helper functions for random selection and path generation

### 2. **combatData.ts**
- Belt statistics with Attack Modifiers and Difficulty Classes (DC)
- Combat calculation formulas (D&D-based)
- Required roll calculator
- Success probability calculations
- Pre-calculated hit matrix

**Belt Stats:**
| Belt   | Attack Mod | DC  | Tier         |
|--------|-----------|-----|--------------|
| White  | +2        | 10  | Easy         |
| Blue   | +4        | 13  | Moderate     |
| Purple | +6        | 15  | Challenging  |
| Brown  | +8        | 17  | Hard         |
| Black  | +10       | 20  | Very Hard    |

### 3. **combatScenarios.ts**
- 3 combat phases: Flow, Pressure, Finish
- Each phase has success/draw/failure techniques
- **v1 uses PRESSURE phase only** (13 success, 5 draw, 3 failure techniques)
- Random technique selection
- Combat outcome calculator

**Sample Techniques:**
- Success: "Side Control", "Mount Position", "Knee on Belly"
- Failure: "Pin Defense", "Escape Artist", "Technical Stand"

---

## 🎯 Game Flow (v1)

### **Menu Screen**
1. Random belt matchup generated (player vs opponent)
2. Display both fighter images from Memory game
3. Show required d20 roll
4. Display success probability
5. Original game instructions

### **Playing Screen**
- UNCHANGED - guide dot to RED zone using WASD/D-PAD
- Timer counts down
- Gameplay identical to original

### **Results Screen**
1. Show d20 roll (1-20 from pressure score)
2. Display combat matchup summary
3. Show SUCCESS or FAILURE
4. Display technique name + description
5. Show fighter images with winner highlight
6. "New Match" button generates new matchup

---

## 🧮 Combat Mechanics

### Formula
```
Required Roll = Opponent DC - Player Attack Modifier
Success = (Roll >= Required)
```

### Examples
- **Purple (+6) vs Brown (DC 17)**: Need 11+ (60% chance)
- **Black (+10) vs Black (DC 20)**: Need 10+ (55% chance)
- **White (+2) vs Black (DC 20)**: Need 18+ (15% chance)
- **Black (+10) vs White (DC 10)**: Auto Success (100%)

---

## 🎨 Visual Design

### Menu Screen Features
- ⚔️ "COMBAT SCENARIO" header (gold)
- Two fighter portraits (120x160px)
- Player border: Blue, Opponent border: Red
- Belt emoji + name + stats display
- Required roll in prominent box
- Success probability calculation

### Results Screen Features
- Large d20 roll display (colored by value)
- Matchup summary with required vs actual roll
- Combat outcome box (green border for success, red for failure)
- Technique name (bold) + description (italic)
- Fighter images with winner glowing, loser faded
- Directional arrows (>>> or <<<) showing dominance

---

## 🔧 Technical Implementation

### State Management
```typescript
combatMatchup: {
  playerBelt, opponentBelt,
  playerImage, opponentImage,
  requiredRoll
}

combatOutcome: {
  result: 'success' | 'failure',
  technique: { name, description }
}
```

### Key Functions
- `getRandomBelt()` - Random belt selection
- `calculateRequiredRoll()` - Combat math
- `getCombatOutcome()` - Determine success + select technique
- `startNewGame()` - Regenerate new matchup

### Integration Points
- **Initialization**: useEffect generates initial matchup
- **Game Finish**: finishRound() calculates combat outcome
- **New Match**: startNewGame() creates fresh matchup

---

## ✅ v1 Features

### Implemented
- ✅ Random belt selection (player & opponent)
- ✅ D&D-style combat mechanics
- ✅ Required roll calculation & display
- ✅ Success probability display
- ✅ Fighter images from Memory game
- ✅ Pressure phase techniques (13 options)
- ✅ Success/failure resolution
- ✅ Visual outcome presentation
- ✅ Mobile-responsive layout

### Intentionally Skipped (for v1)
- ⏸️ Player belt selection (random only)
- ⏸️ Draw scenarios (binary win/lose)
- ⏸️ Multiple combat phases (Pressure only)
- ⏸️ Sequential rounds/career mode
- ⏸️ Statistics tracking

---

## 🚀 Future Expansion (v2+)

### Planned Features
- **Player Choice**: Select your own belt level
- **Multiple Phases**: Flow → Pressure → Finish sequence
- **Draw Scenarios**: Close-call results (within 1-2 of required)
- **Difficulty Settings**: Filter opponent belt range
- **Statistics**: Win/loss ratio, technique frequency
- **Career Mode**: Progress through belt ranks
- **Technique Library**: View all possible outcomes
- **Belt-Specific Techniques**: Different techniques based on belt level

### Advanced Features
- **Combo System**: Chain multiple phases
- **Advantage Points**: Build momentum across rounds
- **Sparring Partners**: Named AI opponents with personalities
- **Tournament Mode**: Bracket-style competitions
- **Training Scenarios**: Practice specific matchups
- **Achievement System**: Unlock special techniques

---

## 📊 Combat Scenarios Database

### Pressure Phase (v1)
**Success (13):** Side Control, Mount Position, North-South Pin, Trap Triangle, Scarf Hold, Reverse Scarf Hold, Crucifix, Gift Wrap, Cross-Body Ride, Knee on Belly, Back Control, Turtle Control, Front Headlock

**Draw (5):** Transitional Battle, Mutual Scramble, Slipping Out, Creating Space, Stalemate Position

**Failure (3):** Pin Defense, Escape Artist, Technical Stand

### Flow Phase (v2)
31 Takedown/Passing techniques ready

### Finish Phase (v2)
37 Submission techniques ready

---

## 🎯 Design Philosophy

### Core Principles
1. **Meaningful Scores**: Every roll (1-20) matters
2. **Realistic Matchups**: White vs Black is hard (as it should be)
3. **Variety**: Random matchups keep it fresh
4. **Visual Storytelling**: Images + techniques create narrative
5. **Respectful Difficulty**: Challenging but fair

### Balance Considerations
- Black vs White = 95% success (dominant)
- Purple vs Purple = 60% success (even match)
- White vs Black = 15% success (underdog)
- Auto-success only when required ≤ 2

---

## 📈 Success Metrics

### v1 Goals
- ✅ No compilation errors
- ✅ All files properly typed (TypeScript)
- ✅ Mobile-responsive (D-PAD controls + layout)
- ✅ Memory game images integrated without breaking
- ✅ Clean code architecture (modular, reusable)
- ✅ Extensible design (easy to add v2 features)

---

## 🛠️ Maintenance Notes

### To Add New Techniques
1. Edit `combatScenarios.ts`
2. Add to appropriate phase + result array
3. Follow format: `{ name: "...", description: "..." }`

### To Adjust Belt Stats
1. Edit `combatData.ts` → `BELT_STATS`
2. Modify `attackModifier` or `dc` values
3. Hit matrix auto-calculates

### To Reassign Images
1. Edit `imageMapping.ts` → `BELT_IMAGES`
2. Move image IDs between belt arrays
3. No need to touch Memory game

---

## 🎉 Implementation Complete!

**Total Lines of Code:** ~500+ lines
**Files Created:** 4 (mapping, data, scenarios, summary)
**Files Modified:** 1 (main game component)
**Compilation Status:** ✅ No errors
**Ready for Testing:** ✅ Yes

The Pressure Game now has a complete combat roleplay system that transforms timing/pressure performance into exciting BJJ combat narratives! 🥋⚔️

