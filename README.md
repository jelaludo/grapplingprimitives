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
1. **Create backup:** Dev Mode → Create Backup
2. **Deploy:** Production uses latest .ts file
3. **Verify:** Check production build loads correctly

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

### File Types
- **Local (.json):** Development with MongoDB compatibility
- **Production (.ts):** Clean TypeScript for builds
- **Backups:** Timestamped versions with node counts

### Data Flow
1. **Local Development:** JSON files with _id fields
2. **Backup Creation:** Both .json and .ts files
3. **Production:** Clean .ts files without _id fields

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

- **Manual Saving:** Changes in local mode require manual backup creation
- **File Compatibility:** Never mix _id fields between local and production files
- **Development Only:** Node creation disabled in production builds

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Follow TypeScript and ESLint standards
4. Test thoroughly before submitting PR

## 📄 License

MIT License - see LICENSE file for details