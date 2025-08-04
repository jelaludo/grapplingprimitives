# Project Ludus - Development Plan

## Overview
Ludus is a user-controlled learning area where selected BJJ concepts become interactive "marbles" with magnetic physics, organized into four quadrants for spaced repetition learning.

## Quadrant System
```
┌─────────────────┬─────────────────┐
│   Trivial       │   Crucial       │
│                 │                 │
│   Master        │   Master        │
├─────────────────┼─────────────────┤
│   Trivial       │   Crucial       │
│                 │                 │
│   Noob          │   Noob          │
└─────────────────┴─────────────────┘
```

## Phase 1: Ludus Basic Framework & Magnetic Physics

### 1.1 Navigation Integration
**Files to modify:**
- `src/App.tsx` - Add Ludus route and navigation
- `src/components/Navigation.tsx` (create if doesn't exist) - Add Ludus nav item

**Implementation:**
- Add Ludus route to React Router
- Create navigation component with Ludus tab
- Ensure Ludus is accessible from any page

### 1.2 Core Ludus Component Structure
**New files to create:**
- `src/components/Ludus/Ludus.tsx` - Main Ludus container
- `src/components/Ludus/LudusPhysics.tsx` - Physics simulation
- `src/components/Ludus/LudusNode.tsx` - Individual node component
- `src/components/Ludus/LudusQuadrants.tsx` - Quadrant layout
- `src/hooks/useLudusPhysics.ts` - Physics hook
- `src/types/ludus.ts` - Ludus-specific types

**Type definitions:**
```typescript
interface LudusNode {
  id: string;
  concept: string;
  category: string;
  color: string;
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  quadrant?: 'trivial-noob' | 'crucial-noob' | 'trivial-master' | 'crucial-master';
  importance: number; // 1-10
  mastery: number; // 1-10
}

interface LudusState {
  nodes: LudusNode[];
  selectedNodes: string[];
  isPhysicsActive: boolean;
}
```

### 1.3 Physics Implementation
**Technology:** Matter.js or custom physics
- Gravity simulation
- Magnetic attraction/repulsion
- Collision detection
- Smooth animations (60fps)

**Magnetic rules:**
- Similar categories attract
- Opposite concepts repel
- Size affects magnetic strength
- User interaction history influences magnetism

### 1.4 Data Management
**New hooks:**
- `src/hooks/useLudusData.ts` - Ludus state management
- `src/hooks/useLudusStorage.ts` - Local storage for Ludus data

**Storage structure:**
```javascript
{
  "ludusNodes": LudusNode[],
  "quadrantPlacements": Record<string, { quadrant: string, importance: number, mastery: number }>,
  "lastUpdated": timestamp
}
```

## Phase 2: Matrix Node Selection Integration

### 2.1 Matrix Selection UI
**Files to modify:**
- `src/components/ScatterPlot.tsx` - Add selection checkboxes
- `src/components/Sidebar.tsx` - Add "Send to Ludus" button
- `src/hooks/useDataManagement.ts` - Add selection state

**Implementation:**
- Add checkboxes to scatter plot nodes
- Multi-select functionality (Ctrl+click, Shift+click)
- Selection counter in sidebar
- "Send to Ludus" button with animation

### 2.2 Node Transfer Animation
**Animation sequence:**
1. Selected nodes highlight
2. "Send to Ludus" button appears
3. Click triggers fall animation
4. Nodes "fall" from matrix to Ludus receptacle
5. Physics simulation begins

### 2.3 Data Synchronization
**Integration points:**
- Ensure Ludus nodes stay in sync with matrix data
- Handle node updates from matrix
- Maintain selection state across navigation

## Phase 3: Spaced Repetition Game

### 3.1 Flashcard System
**New components:**
- `src/components/Ludus/LudusFlashcard.tsx`
- `src/components/Ludus/LudusReview.tsx`
- `src/components/Ludus/LudusProgress.tsx`

**Flashcard types:**
- Name → Description
- Description → Name
- Category → Examples
- Position → Concept

### 3.2 Mastery Rating System
**UI components:**
- 0-10 slider with descriptive anchors
- Self-reporting interface
- Progress visualization

**Spacing algorithm:**
- Easy (8-10): 7-14 days
- Medium (5-7): 3-7 days
- Hard (0-4): 1-3 days
- New cards: Daily until rated

### 3.3 Review Scheduling
**Data structure:**
```javascript
{
  "reviews": {
    "BJJ-001": {
      lastReviewed: timestamp,
      nextReview: timestamp,
      masteryHistory: number[],
      reviewCount: number,
      cardType: 'name-to-desc' | 'desc-to-name'
    }
  }
}
```

## Technical Architecture

### Dependencies to Add
- `matter-js` - Physics simulation
- `framer-motion` - Smooth animations
- `date-fns` - Date manipulation for spaced repetition

### File Structure
```
src/
├── components/
│   ├── Ludus/
│   │   ├── Ludus.tsx
│   │   ├── LudusPhysics.tsx
│   │   ├── LudusNode.tsx
│   │   ├── LudusQuadrants.tsx
│   │   ├── LudusFlashcard.tsx
│   │   ├── LudusReview.tsx
│   │   └── LudusProgress.tsx
│   └── Navigation.tsx
├── hooks/
│   ├── useLudusPhysics.ts
│   ├── useLudusData.ts
│   └── useLudusStorage.ts
├── types/
│   └── ludus.ts
└── utils/
    ├── ludusPhysics.ts
    └── spacedRepetition.ts
```

## Risk Mitigation & Potential Issues

### 1. Performance Concerns
**Risks:**
- Physics simulation lag with many nodes
- Memory leaks from continuous animations
- Large localStorage data

**Mitigation:**
- Implement node pooling for physics objects
- Use `requestAnimationFrame` for smooth animations
- Debounce physics calculations
- Implement data cleanup and compression
- Add performance monitoring

### 2. State Management Complexity
**Risks:**
- State synchronization between Matrix and Ludus
- Complex physics state management
- Local storage conflicts

**Mitigation:**
- Use React Context for shared state
- Implement proper cleanup on unmount
- Add state validation and recovery
- Use immutable state updates

### 3. Browser Compatibility
**Risks:**
- Physics libraries not supported in older browsers
- LocalStorage limitations
- Animation performance varies

**Mitigation:**
- Add feature detection
- Implement fallback for unsupported features
- Test across different browsers
- Add graceful degradation

### 4. Data Integrity
**Risks:**
- Corrupted localStorage data
- Inconsistent state between Matrix and Ludus
- Lost user progress

**Mitigation:**
- Add data validation on load
- Implement backup/restore functionality
- Add error boundaries
- Regular data integrity checks

### 5. User Experience Disruption
**Risks:**
- Navigation changes break existing workflow
- New UI elements clutter interface
- Animation performance affects usability

**Mitigation:**
- Maintain existing navigation structure
- Add option to disable animations
- Implement progressive enhancement
- User testing at each phase

### 6. Code Maintainability
**Risks:**
- Complex physics code becomes hard to maintain
- Tight coupling between components
- Difficult to test physics interactions

**Mitigation:**
- Separate physics logic into dedicated hooks
- Use dependency injection for physics engine
- Add comprehensive unit tests
- Document physics parameters and behaviors

## Development Timeline

### Phase 1 (2-3 weeks)
- Week 1: Navigation and basic Ludus structure
- Week 2: Physics implementation and node rendering
- Week 3: Quadrant system and data persistence

### Phase 2 (1-2 weeks)
- Week 1: Matrix selection UI
- Week 2: Transfer animations and data sync

### Phase 3 (2-3 weeks)
- Week 1: Flashcard system and mastery rating
- Week 2: Spaced repetition algorithm
- Week 3: Progress tracking and polish

## Success Criteria

### Phase 1
- [ ] Ludus accessible from navigation
- [ ] Nodes fall into receptacle with gravity
- [ ] Magnetic interactions work smoothly
- [ ] Quadrants accept dropped nodes
- [ ] Data persists across sessions

### Phase 2
- [ ] Matrix nodes can be selected
- [ ] Transfer animation works smoothly
- [ ] Ludus stays in sync with matrix data
- [ ] Selection state persists

### Phase 3
- [ ] Flashcards display correctly
- [ ] Mastery rating system works
- [ ] Spaced repetition algorithm functions
- [ ] Progress tracking is accurate
- [ ] Review scheduling works

## Testing Strategy

### Unit Tests
- Physics calculations
- Spaced repetition algorithm
- Data persistence
- State management

### Integration Tests
- Matrix to Ludus data flow
- Navigation between components
- Local storage operations

### Performance Tests
- Physics simulation with 50+ nodes
- Animation smoothness
- Memory usage over time
- LocalStorage size limits

### User Acceptance Tests
- Node selection workflow
- Physics interactions feel natural
- Flashcard review process
- Progress tracking accuracy 