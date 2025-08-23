# BJJ Skill Matrix - New Computer Migration Checklist

## 🖥️ System Requirements Check
- [ ] **Node.js**: Install Node.js version 18.0.0 or higher
  - Download from: https://nodejs.org/
  - Verify with: `node --version`
  - Verify npm: `npm --version`
- [ ] **Git**: Ensure Git is installed and configured
  - Verify with: `git --version`
  - Configure user: `git config --global user.name "Your Name"`
  - Configure email: `git config --global user.email "your.email@example.com"`

## 📁 Project Setup
- [ ] **Clone Repository** (if not already done):
  ```bash
  git clone <your-repo-url> bjj-skill-matrix
  cd bjj-skill-matrix
  ```
- [ ] **Verify Git Status**:
  ```bash
  git status
  git remote -v
  ```
- [ ] **Check for Untracked Files**:
  ```bash
  git log --oneline -5
  ```

## 📦 Dependencies Installation
- [ ] **Install Node Dependencies**:
  ```bash
  npm install
  ```
- [ ] **Verify Installation**:
  ```bash
  npm list --depth=0
  ```
- [ ] **Check for Missing Dependencies**:
  ```bash
  npm audit
  ```

## 🔧 Development Environment Setup
- [ ] **TypeScript Configuration**:
  - Verify `tsconfig.json` exists and is valid
  - Run type check: `npm run typecheck`
- [ ] **Environment Variables** (if needed):
  - Check for `.env` files in `.gitignore`
  - Create any missing environment files
- [ ] **IDE/Editor Setup**:
  - Install TypeScript support
  - Install React/JSX support
  - Configure ESLint if using VS Code

## 🚀 Application Testing
- [ ] **Start Development Server**:
  ```bash
  npm start
  ```
  - Should open at http://localhost:3000
  - Check for any console errors
- [ ] **Start Backend Server** (in separate terminal):
  ```bash
  node server.js
  ```
  - Should run on http://localhost:3001
  - Check for any startup errors
- [ ] **Test API Endpoints**:
  ```bash
  npm run test:server
  ```

## 📊 Data Verification
- [ ] **Check Data Files**:
  - Verify `public/data/BJJMasterList.json` exists
  - Verify `src/data/productionData.ts` exists
  - Check backup files in `backups/` directory
- [ ] **Test Data Loading**:
  - Open app and verify skills load correctly
  - Check for any missing images or assets
- [ ] **Verify MongoDB Connection** (if using):
  - Check `api/lib/mongodb.js` configuration
  - Test database connectivity

## 🧪 Testing & Validation
- [ ] **Run TypeScript Compilation**:
  ```bash
  npm run typecheck
  ```
- [ ] **Run Tests** (if available):
  ```bash
  npm test
  ```
- [ ] **Test Build Process**:
  ```bash
  npm run build
  ```
- [ ] **Validate Data Integrity**:
  ```bash
  npm run validate:data
  ```

## 🔐 Authentication & Security
- [ ] **Check Beta Authentication**:
  - Verify `src/data/betaPasswords.json` exists (if needed)
  - Test login functionality
- [ ] **JWT Configuration**:
  - Check JWT_SECRET in server.js
  - Verify authentication endpoints work

## 📁 File Structure Verification
- [ ] **Core Directories**:
  - [ ] `src/components/` - React components
  - [ ] `src/modules/` - Feature modules
  - [ ] `public/data/` - Static data files
  - [ ] `backups/` - Backup files
  - [ ] `api/` - Backend API routes
  - [ ] `scripts/` - Utility scripts
- [ ] **Key Files**:
  - [ ] `package.json` - Dependencies and scripts
  - [ ] `tsconfig.json` - TypeScript configuration
  - [ ] `server.js` - Express server
  - [ ] `src/App.tsx` - Main React component

## 🎮 Feature Testing
- [ ] **Core Features**:
  - [ ] Skill matrix visualization
  - [ ] Card system functionality
  - [ ] Memory game
  - [ ] Training modules
  - [ ] Calendar/session tracking
  - [ ] Article system
- [ ] **Admin Features**:
  - [ ] Beta dashboard access
  - [ ] Data management tools
- [ ] **Games & Tools**:
  - [ ] Centroid game
  - [ ] Armbar shearing simulation
  - [ ] Skill assessment

## 🔄 Git Workflow Verification
- [ ] **Branch Management**:
  ```bash
  git branch -a
  ```
- [ ] **Pull Latest Changes**:
  ```bash
  git pull origin main
  ```
- [ ] **Test Commit Process**:
  ```bash
  git add .
  git commit -m "test: migration verification"
  git push origin main
  ```

## 📋 Optional Setup
- [ ] **Development Tools**:
  - [ ] Install React Developer Tools browser extension
  - [ ] Install Redux DevTools (if using Redux)
  - [ ] Configure VS Code extensions for React/TypeScript
- [ ] **Performance Monitoring**:
  - [ ] Set up Vercel Analytics (if deployed)
  - [ ] Configure error tracking

## 🚨 Troubleshooting Checklist
- [ ] **Common Issues**:
  - [ ] Port conflicts (3000/3001)
  - [ ] Node version compatibility
  - [ ] Missing environment variables
  - [ ] CORS issues between frontend/backend
  - [ ] TypeScript compilation errors
  - [ ] Missing dependencies

## ✅ Final Verification
- [ ] **Full Application Test**:
  - [ ] Frontend loads without errors
  - [ ] Backend API responds correctly
  - [ ] All major features work
  - [ ] Data persistence functions
  - [ ] Authentication works (if applicable)
- [ ] **Documentation**:
  - [ ] README.md is up to date
  - [ ] Development workflow documented
  - [ ] API endpoints documented

## 📝 Notes
- **Node Version**: Requires Node.js >= 18.0.0
- **Ports**: Frontend (3000), Backend (3001)
- **Database**: MongoDB (if configured)
- **Key Dependencies**: React 19, TypeScript, Express, D3, Material-UI

## 🔗 Useful Commands
```bash
# Start development
npm start

# Start backend server
node server.js

# Type checking
npm run typecheck

# Build for production
npm run build

# Test server endpoints
npm run test:server

# Validate data
npm run validate:data

# Seed data (if needed)
npm run seed:concepts
npm run seed:categories
```

---
**Migration completed on**: [Date]
**Node version**: [Version]
**Issues encountered**: [List any problems]
**Additional setup required**: [Any custom configuration]

