# BJJ Skill Matrix

A React-based visualization tool for mapping Brazilian Jiu-Jitsu techniques across mental/physical and self/opponent axes.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Start backend server (in separate terminal)
node server.js
```

## 🏗️ Architecture

### Frontend (React + TypeScript)
- **Components:** Modular React components with custom hooks
- **Visualization:** D3.js scatter plot with interactive nodes
- **UI:** Material-UI v7 with dark theme
- **State:** Custom hooks for data management and interactions

### Backend (Node.js + Express)
- **API:** RESTful endpoints for data operations
- **Storage:** Local file system with JSON/TypeScript files
- **Database:** Optional MongoDB integration
- **Backup:** Automated backup system with versioning

## 📊 Features

### Core Functionality
- **Interactive Scatter Plot:** Click to create, hover to view, drag to position
- **Category Management:** Color-coded technique categories
- **Search & Filter:** Find techniques by name or description
- **Responsive Design:** Works on desktop and mobile

### Development Tools
- **Local Development:** Edit techniques in real-time
- **Backup System:** Create timestamped backups (.json + .ts)
- **Data Export:** Convert to MongoDB format
- **Production Deployment:** Clean TypeScript files for builds

### Academic Integration
- **Studies Tab:** Curated academic research papers
- **Articles Tab:** PDF extraction and article management
- **Reference Links:** Direct links to research sources

## 🔧 Development Workflow

### Local Development
1. **Start servers:** `npm start` + `node server.js`
2. **Select data source:** Dev Mode → Local Files
3. **Create techniques:** Click on plot to add nodes
4. **Save work:** Dev Mode → Create Backup
5. **Test changes:** Refresh browser to verify persistence

### Production Deployment
Our production data is a single canonical JSON consumed by the app.

1. **Create backup & push to production (Dev Mode):**
   - Dev Mode → "Create backup & Push to Production"
   - This writes timestamped backups (.ts + .json) to `backups/BackupsSkillMasterLists/`
   - It also updates the canonical file at `public/data/BJJMasterList.json` (used by the app)
   - UI-only fields (cx, cy, r, opacity, stroke, strokeWidth) are stripped from the canonical data
2. **Validate locally before commit:**
   - `npm run typecheck`
   - `npm run validate:data`
3. **Deploy:**
   - Commit & push. The app loads `/data/BJJMasterList.json` at runtime
4. **Verify:**
   - Check the app loads categories and concepts as expected

## 📁 File Structure

```
bjj-skill-matrix/
├── src/
│   ├── components/     # React components
│   ├── hooks/         # Custom React hooks
│   ├── types/         # TypeScript definitions
│   ├── utils/         # Utility functions
│   └── data/          # Static data files
├── server.js          # Express backend
├── api/               # API endpoints
├── backups/           # Data backups
└── scripts/           # Utility scripts
```

## 🎯 Data Management

### Canonical Source of Truth
- One canonical file: `public/data/BJJMasterList.json`
- Backups are stored as timestamped JSON/TS under `backups/BackupsSkillMasterLists/`
- The app never imports versioned TS files from `src/`

### App Data Load
- The app loads `/data/BJJMasterList.json` at runtime (dev and prod)
- Type guardrails ensure expected arrays and strip unknown fields

### Seeding MongoDB (optional)
- Seed directly from the canonical JSON:
  - `npm run seed:canonical` (upsert)
  - `npm run seed:canonical -- --clear` (fresh reseed)
  - Ensures unique index on `concepts.id` and `categories.name`

## 🛠️ Technical Stack

- **Frontend:** React 18, TypeScript, Material-UI v7, D3.js
- **Backend:** Node.js, Express, File System, MongoDB (optional)
- **Development:** npm, TypeScript, ESLint, Git

## 📈 Performance

- **Optimized Rendering:** D3.js with proper enter/update/exit patterns
- **Memoized Components:** React hooks for performance
- **Modular Architecture:** Separated concerns for maintainability
- **Efficient Data Flow:** Custom hooks for state management

## 🚨 Important Notes

- **Manual Saving:** In local mode, create a backup to persist edits
- **UI Fields:** UI/physics fields are not stored in the canonical JSON; they live in UI state only
- **Types:** Always import `BJJConcept` from `src/types/concepts.ts`; do not redeclare interfaces in data files
- **Build Safety:** Versioned TS masterlists in `src/data` are excluded from compilation

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Follow TypeScript and ESLint standards
4. Test thoroughly before submitting PR

## 📄 License

MIT License - see LICENSE file for details