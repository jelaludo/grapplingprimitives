# BJJ Skill Matrix - Refactor TODO

## 📋 Remaining Refactoring Tasks

### ✅ Completed Modules (Ported to Next.js + Tailwind + shadcn/ui)
- [x] **Concept Matrix** - Interactive 2×2 visualization with pan/zoom
- [x] **Flash Cards** - ANKI-style study mode with category filtering
- [x] **Games Hub** - Centroid & Memory games
- [x] **Coach Tools** - Timer tool
- [x] **Breathing Cycles** - Breathing practice module
- [x] **Skill Check** - Assessment quizzes with radar chart
- [x] **Weight Class Tool** - IBJJF weight class calculator
- [x] **Belt Dropout** - Belt progression visualization

### 🔄 Modules Still Needing Port

#### 1. **Training Hub** (`src/modules/training/TrainingHub.tsx`)
- **Status**: Legacy MUI component exists
- **Features**: 
  - Hex grid for exercise selection
  - Satisfaction picker
  - Day record tracking
  - Exercise progress tracking
- **Tasks**:
  - Port to Tailwind/shadcn/ui
  - Convert HexGrid component
  - Convert SatisfactionPicker component
  - Integrate into `/modules/training` route
  - Migrate localStorage logic

#### 2. **Training Calendar** (`src/modules/calendar/CalendarToday.tsx`)
- **Status**: Legacy MUI component exists
- **Features**:
  - Week/Month view toggle
  - Session tracking
  - Exercise library
  - Intensity slider
  - Date navigation
- **Tasks**:
  - Port to Tailwind/shadcn/ui
  - Create calendar grid component
  - Port session storage logic
  - Integrate into `/modules/calendar` route
  - Mobile-responsive calendar view

#### 3. **Articles** (`src/components/Articles.tsx`)
- **Status**: Legacy component exists
- **Features**:
  - Article listing
  - Search functionality
  - Article detail view
  - Article data loading
- **Tasks**:
  - Port to Tailwind/shadcn/ui
  - Create article card component
  - Create article detail page/component
  - Integrate into `/modules/articles` route
  - Consider MDX for article content

#### 4. **Research Studies** (`src/components/Studies.tsx`)
- **Status**: Legacy MUI component exists
- **Features**:
  - Study listing with categories
  - Study cards with metadata
  - Category filtering
- **Tasks**:
  - Port to Tailwind/shadcn/ui
  - Create study card component
  - Port category system
  - Integrate into `/modules/studies` route
  - Ensure study data structure is compatible

#### 5. **Stories** (`src/modules/stories/StoriesHub.tsx`)
- **Status**: Legacy MUI component exists
- **Features**:
  - Story selection
  - Page-by-page navigation
  - Image-based story display
- **Tasks**:
  - Port to Tailwind/shadcn/ui
  - Create story viewer component
  - Port image loading logic
  - Integrate into `/modules/stories` route
  - Ensure image assets are accessible

### 🎨 UI/UX Improvements Needed

#### Landing Page
- [ ] **Update hero messaging** - Current copy is generic
- [ ] **Fix module descriptions** - Some descriptions are outdated or incorrect
- [ ] **Add module previews** - Consider adding visual previews or screenshots
- [ ] **Improve CTAs** - Make call-to-action buttons more compelling

#### Navigation
- [ ] **Fix "Modules" button** - Currently leads to 404 (should be fixed, verify)
- [ ] **Mobile navigation** - Ensure mobile menu works correctly
- [ ] **Breadcrumbs** - Consider adding breadcrumb navigation for deep pages

#### Admin/Dev Features
- [ ] **Port BetaDashboard** (`src/components/admin/BetaDashboard.tsx`)
  - Beta password management
  - Duplicate detector
  - Convert from MUI to Tailwind/shadcn/ui
  - Create admin route (e.g., `/admin` or `/dev`)
  - Ensure dev-only access

- [ ] **Port DevModeToggle** (`src/components/DevModeToggle.tsx`)
  - Data source switching (MongoDB/local/production)
  - Backup/restore functionality
  - Master list selection
  - Convert from MUI to Tailwind/shadcn/ui
  - Integrate into admin section

- [ ] **Port BetaLogin** (`src/components/BetaLogin.tsx`)
  - Beta access authentication
  - Convert from MUI to Tailwind/shadcn/ui
  - Integrate with new admin system

### 🧹 Code Cleanup

- [ ] **Remove legacy code** - Once all modules are ported, remove old `src/modules/` directory
- [ ] **Remove MUI dependencies** - Clean up unused Material-UI imports
- [ ] **Remove old hooks** - Clean up `useViewManagement`, `useDataSource`, etc. if not needed
- [ ] **Consolidate data sources** - Ensure all data comes from `src/data/` directory
- [ ] **Update README** - Document new architecture and module structure

### 📱 Mobile Responsiveness

- [ ] **Full mobile pass** - Test all modules at 430px, 768px, 1024px breakpoints
- [ ] **Touch interactions** - Ensure all interactive elements work on touch devices
- [ ] **Performance** - Optimize for mobile (lazy loading, code splitting)

### 🧪 Testing & Quality

- [ ] **Lighthouse audit** - Run performance, accessibility, SEO audits
- [ ] **Cross-browser testing** - Test on Chrome, Firefox, Safari, Edge
- [ ] **Error handling** - Add proper error boundaries and fallbacks
- [ ] **Loading states** - Ensure all async operations show loading states

---

## 🚀 New Modules to Create

### 1. **Physics Concepts Animations** (3Blue1Brown Style)
**Goal**: Interactive animations explaining fundamental physics concepts relevant to grappling

#### Concepts to Animate:
- **Center of Gravity (CoG)**
  - Visualize CoG shifting during techniques
  - Show how CoG affects balance and control
  - Interactive: drag opponent/self to see CoG change
  - Examples: takedowns, sweeps, guard passes

- **Leverage**
  - Visualize lever arms and fulcrum points
  - Show mechanical advantage in submissions
  - Interactive: adjust angles and distances
  - Examples: armbar, kimura, triangle choke

- **Wedges**
  - Show how wedges create space or pressure
  - Visualize force vectors and pressure points
  - Interactive: adjust wedge angle and position
  - Examples: guard retention, passing, escapes

#### Technical Approach:
- **Canvas or SVG** - For smooth animations
- **React Spring or Framer Motion** - For physics-based animations
- **Interactive controls** - Sliders, draggable elements
- **Step-by-step explanations** - Break down complex movements
- **Real technique examples** - Link to actual BJJ techniques

#### Implementation Plan:
1. Create `/modules/physics-concepts` route
2. Create hub component with concept selection
3. Build individual animation components:
   - `CenterOfGravity.tsx`
   - `Leverage.tsx`
   - `Wedges.tsx`
4. Add to module registry in `src/data/modules.ts`
5. Create MDX content explaining each concept

### 2. **Pressure & Timing Game** (Previously Planned)
- **Status**: Mentioned but not implemented
- **Goal**: Interactive game for understanding pressure application and timing
- **Reference**: `src/modules/PressureGame/sptc_pressure_game.tsx` exists but needs porting

### 3. **Self-Assessment Module** (Previously Planned)
- **Status**: `src/modules/self/SelfAssessment.tsx` exists
- **Goal**: Allow users to self-assess their skills
- **Tasks**: Port to new framework

### 4. **Decision Trees** (Future)
- **Goal**: Interactive decision trees for technique selection
- **Status**: Not yet implemented
- **Consider**: Using a graph visualization library

### 5. **Technique Library** (Future)
- **Goal**: Comprehensive library of techniques with videos, descriptions, and metadata
- **Status**: Not yet implemented
- **Consider**: Integration with concept matrix

---

## 📝 Module Registry Updates Needed

Update `src/data/modules.ts` to include:
- [ ] Physics Concepts module entry
- [ ] Verify all existing modules have correct metadata
- [ ] Add proper icons for all modules
- [ ] Ensure featured modules are appropriate

---

## 🎯 Priority Order

### High Priority (Complete Core Functionality)
1. ✅ Landing page messaging update
2. ✅ Admin/Dev features port
3. ✅ Training Hub port
4. ✅ Calendar port

### Medium Priority (Complete Module Set)
5. Articles port
6. Studies port
7. Stories port

### Low Priority (Polish & New Features)
8. Physics Concepts animations
9. Pressure & Timing game
10. Self-Assessment port
11. Code cleanup
12. Mobile responsiveness pass
13. Testing & quality assurance

---

## 📌 Notes

- **Deployment**: Ignore Vercel/deployment issues for now. Focus on completing refactor first.
- **Branch**: Continue working on `obra-shadcn-ui-refactor` branch
- **Static Export**: Ensure all modules work with Next.js static export (no API routes)
- **Data**: All data should be in `src/data/` or loaded client-side from JSON files

