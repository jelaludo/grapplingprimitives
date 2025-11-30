# Copy Code to New Repository - Step by Step

## Quick Copy (PowerShell)

Run this from the `bjj-skill-matrix` directory:

```powershell
.\scripts\copy-to-new-repo.ps1
```

## Manual Copy Steps

If you prefer to do it manually or the script doesn't work:

### 1. Navigate to Source Directory
```powershell
cd C:\01_Projects\01a_Coding\02_CodingProjects\bjj-skill-matrix
```

### 2. Ensure You're on Refactor Branch
```powershell
git checkout obra-shadcn-ui-refactor
```

### 3. Copy Essential Files

**Copy these directories:**
- `src/` - All source code
- `public/` - But exclude `public/images/gifs/` (we'll add GIFs later)
- `scripts/` - But only keep `prepare-cloudflare-migration.sh`
- Root config files: `package.json`, `tsconfig.json`, `tailwind.config.js`, `postcss.config.js`, `next.config.js`, `.gitignore`, `.eslintrc.json` (if exists)

**DO NOT copy:**
- `node_modules/`
- `.next/`
- `out/`
- `build/`
- `dist/`
- `.vercel/`
- `.git/`
- `backups/`
- `api/`
- `server.js`
- `vercel.json`
- Legacy scripts (seed, convert, update, test, debug, generate scripts)
- Most `.md` files (except migration docs)

### 4. Copy Migration Documentation
Copy these specific files:
- `DEPLOYMENT_PLAN.md`
- `MIGRATION_PLAN.md`
- `MIGRATION_CHECKLIST.md`
- `DNS_MIGRATION_GUIDE.md`
- `MIGRATION_SUMMARY.md`
- `GIF_MODULE_SETUP.md`

### 5. Create GIF Directory Structure
```powershell
New-Item -ItemType Directory -Path "..\grapplingprimitives\public\images\gifs" -Force
New-Item -ItemType File -Path "..\grapplingprimitives\public\images\gifs\.gitkeep" -Force
```

### 6. Update package.json
In the new repo, update `package.json`:
- Change `"name"` from `"bjj-skill-matrix"` to `"grapplingprimitives"`
- Remove legacy scripts (start:legacy, build:legacy, seed:*, convert:*, etc.)
- Keep only: `dev`, `build`, `start`, `lint`

### 7. Clean Up .gitignore
Ensure `.gitignore` includes:
- `.vercel/`
- `.vercelignore`
- `/public/images/gifs/`
- `/gifs/`

### 8. Remove Vercel Files
```powershell
Remove-Item "..\grapplingprimitives\vercel.json" -ErrorAction SilentlyContinue
Remove-Item "..\grapplingprimitives\.vercel" -Recurse -Force -ErrorAction SilentlyContinue
```

## After Copying

### 1. Navigate to New Directory
```powershell
cd ..\grapplingprimitives
```

### 2. Run Cleanup Script
```powershell
.\scripts\cleanup-new-repo.ps1
```

This will:
- Update `package.json` name to `grapplingprimitives`
- Remove legacy scripts
- Remove Vercel files
- Update `.gitignore`

### 3. Install Dependencies
```powershell
npm install
```

### 3. Test Build
```powershell
npm run build
```

Should create `out/` directory with static files.

### 4. Initialize Git
```powershell
git init
git add .
git commit -m "Initial commit: Grappling Primitives - Cloudflare Pages ready"
```

### 5. Create GitHub Repository
1. Go to GitHub
2. Create new repository: `GrapplingPrimitives`
3. **Don't** initialize with README, .gitignore, or license

### 6. Connect and Push
```powershell
git remote add origin https://github.com/YOUR_USERNAME/GrapplingPrimitives.git
git branch -M main
git push -u origin main
```

## Verify Everything Works

1. ✅ `npm run build` succeeds
2. ✅ `out/` directory is created
3. ✅ No Vercel files present
4. ✅ `.gitignore` excludes GIFs and Vercel
5. ✅ All modules load in dev mode: `npm run dev`
6. ✅ README.md is updated for new project

## Next Steps

After copying and pushing:
1. Set up Cloudflare Pages (connect GitHub repo)
2. Configure environment variables
3. Deploy and test
4. Migrate DNS (see `DNS_MIGRATION_GUIDE.md`)
5. Upload GIFs to R2 (see `GIF_MODULE_SETUP.md`)

