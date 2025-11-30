# Quick Start - GrapplingPrimitives

## ⚡ 5-Minute Setup

### 1. Clean Up (Delete These)
```
vercel.json
.vercel/
node_modules/
.next/
out/
build/
```

### 2. Update package.json
Change line 2:
```json
"name": "grapplingprimitives",
```

### 3. Install & Test
```powershell
npm install
npm run build
```

### 4. Git Init
```powershell
git init
git add .
git commit -m "Initial commit: Grappling Primitives"
```

### 5. Create GitHub Repo
- Name: `GrapplingPrimitives`
- Don't initialize with files
- Push: `git remote add origin <url> && git push -u origin main`

## 📦 Dependencies Explained

**Q: Where do dependencies come from?**
**A: From `package.json`** - it lists all npm packages needed.

When you run `npm install`:
1. npm reads `package.json`
2. Finds all packages in `"dependencies"` and `"devDependencies"`
3. Downloads them from npm registry
4. Installs to `node_modules/` folder

**You don't need to manually install anything** - `package.json` has everything!

## 🚀 Next: Cloudflare Pages

See `CONTEXT_FOR_NEW_REPO.md` for full details.

