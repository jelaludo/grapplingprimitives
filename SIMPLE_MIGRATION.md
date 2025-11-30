# Simple Migration Guide

## Step 1: Copy Everything
1. Open File Explorer
2. Go to `C:\01_Projects\01a_Coding\02_CodingProjects\bjj-skill-matrix`
3. Select **ALL** files and folders (Ctrl+A)
4. Copy (Ctrl+C)
5. Go to `C:\01_Projects\01a_Coding\02_CodingProjects\grapplingprimitives`
6. Paste (Ctrl+V)

## Step 2: Clean Up (Manual)

### Remove These Files/Folders:
- `vercel.json` (delete it)
- `.vercel/` folder (delete it)
- `node_modules/` (delete it - we'll reinstall)
- `.next/` (delete it - build artifact)
- `out/` (delete it - build artifact)
- `build/` (delete it - build artifact)

### Keep These:
- ✅ All `src/` folder
- ✅ All `public/` folder (including structure for gifs)
- ✅ All config files: `package.json`, `tsconfig.json`, `tailwind.config.js`, `next.config.js`, etc.
- ✅ `.gitignore`

## Step 3: Update package.json

Open `package.json` and change:
```json
"name": "bjj-skill-matrix",
```
to:
```json
"name": "grapplingprimitives",
```

That's it! The rest can stay.

## Step 4: Initialize Git & Install

```powershell
cd C:\01_Projects\01a_Coding\02_CodingProjects\grapplingprimitives

# Initialize git
git init

# Install dependencies
npm install

# Test build
npm run build
```

If build succeeds, you're good!

## Step 5: Create GitHub Repo

1. Go to GitHub.com
2. Click "New repository"
3. Name: `GrapplingPrimitives`
4. **Don't** initialize with README, .gitignore, or license
5. Click "Create repository"

## Step 6: Push to GitHub

```powershell
# Add all files
git add .

# Commit
git commit -m "Initial commit: Grappling Primitives"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/GrapplingPrimitives.git

# Push
git branch -M main
git push -u origin main
```

## Step 7: Set Up Cloudflare Pages

1. Go to Cloudflare Dashboard → Pages
2. "Create a project" → "Connect to Git"
3. Select `GrapplingPrimitives` repo
4. Build settings:
   - Framework: Next.js
   - Build command: `npm run build`
   - Output directory: `out`
5. Add environment variables:
   - `NODE_ENV=production`
   - `NEXT_STATIC_EXPORT=true`
6. Deploy!

## That's It!

Much simpler than all those scripts. The drag-and-drop approach works perfectly fine.

