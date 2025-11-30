# Context Document: GrapplingPrimitives Migration

## 🎯 What Happened

This repository (`grapplingprimitives`) was created by copying the refactored code from `bjj-skill-matrix` repository. The old repo had:
- Legacy MUI-based code (old implementation)
- New Next.js 16 + Tailwind + shadcn/ui refactor (on `obra-shadcn-ui-refactor` branch)
- Vercel deployment configuration
- Mixed old/new codebase

The new repo contains **only the refactored code** (Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui) and is being prepared for **Cloudflare Pages deployment** with **R2 storage** for media files.

## 📋 Current State

### ✅ What's Already Done
- Code copied from `bjj-skill-matrix` (refactor branch)
- Module system with Next.js App Router
- All components ported to Tailwind/shadcn/ui
- Static export configured (`next.config.js` with `output: "export"`)
- `.gitignore` configured (excludes Vercel, build artifacts, GIFs)
- Migration documentation created (DEPLOYMENT_PLAN.md, MIGRATION_PLAN.md, etc.)

### ⏳ What Needs to Be Done

#### 1. **Immediate Cleanup** (Do This First)
- [x] Delete `vercel.json` (if exists) ✅
- [x] Delete `.vercel/` folder (if exists) ✅
- [x] Delete build artifacts: `.next/`, `out/`, `build/` ✅
- [x] Update `package.json`: Change `"name"` from `"bjj-skill-matrix"` to `"grapplingprimitives"` ✅
- [x] Remove Vercel Analytics dependency ✅
- [x] Remove MUI dependencies (legacy code) ✅
- [x] Remove legacy `src/modules/` directory ✅
- [x] Remove legacy `src/layouts/` directory ✅

#### 2. **Install Dependencies**
```powershell
npm install
```
This reads `package.json` and installs all dependencies listed there. No need to worry - all dependency info is in package.json.

#### 3. **Test Build**
```powershell
npm run build
```
Should create `out/` directory with static files. If this works, you're ready for Cloudflare Pages.

#### 4. **Initialize Git & Push to GitHub**
```powershell
git init
git add .
git commit -m "Initial commit: Grappling Primitives"
# Create repo on GitHub: GrapplingPrimitives
git remote add origin https://github.com/YOUR_USERNAME/GrapplingPrimitives.git
git branch -M main
git push -u origin main
```

#### 5. **Set Up Cloudflare Pages**
- Connect GitHub repo to Cloudflare Pages
- Build command: `npm run build`
- Output directory: `out`
- Environment variables:
  - `NODE_ENV=production`
  - `NEXT_STATIC_EXPORT=true`
  - `NEXT_PUBLIC_R2_BUCKET_URL=https://pub-jelaludo-media.r2.dev` (after R2 setup)
  - `NEXT_PUBLIC_R2_GIFS_PATH=/gifs`

#### 6. **Set Up R2 for GIFs** (900 GIFs, ~1.4GB)
- Create R2 bucket: `jelaludo-media` (or `grapplingprimitives-media`)
- Enable public access
- Upload GIFs from `public/images/gifs/` to R2
- Update environment variables with R2 URL

#### 7. **DNS Migration**
- Remove Vercel DNS records from Cloudflare
- Add Cloudflare Pages custom domain: `grapplingprimitives.com`
- Wait for DNS propagation (5-60 minutes)

## 🏗️ Architecture

### Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Language**: TypeScript
- **Deployment**: Cloudflare Pages (static export)
- **Media Storage**: Cloudflare R2 (for GIFs)
- **Domain**: grapplingprimitives.com

### Project Structure
```
grapplingprimitives/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Landing page
│   │   ├── modules/[slug]/     # Dynamic module pages
│   │   └── layout.tsx          # Root layout
│   ├── components/
│   │   ├── modules/            # Module components
│   │   │   ├── concept-matrix/
│   │   │   ├── games/
│   │   │   ├── belt-dropout/
│   │   │   ├── visual-notes/
│   │   │   ├── gif-training/  # New module (needs GIF manifest)
│   │   │   └── ...
│   │   └── ui/                 # shadcn/ui components
│   ├── data/
│   │   └── modules.ts          # Module registry
│   └── config/
│       └── media.ts             # R2 URL utility (local vs production)
├── public/
│   ├── images/
│   │   ├── gifs/               # Local GIFs (gitignored, for dev only)
│   │   └── visualnotes/        # Visual notes images
│   └── data/                   # JSON data files
└── scripts/                     # Utility scripts
```

## 🔑 Key Files to Know

### Configuration Files
- `next.config.js` - Next.js config with static export enabled
- `package.json` - Dependencies and scripts (needs name update)
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `.gitignore` - Already configured correctly

### Important Components
- `src/app/modules/[slug]/page.tsx` - Dynamic module router
- `src/data/modules.ts` - Module registry (add new modules here)
- `src/config/media.ts` - Utility for R2 URLs (`getGifUrl()` function)
- `src/components/modules/gif-training/gif-training.tsx` - GIF module (needs manifest)

### Documentation Files
- `DEPLOYMENT_PLAN.md` - Cloudflare Pages + R2 setup guide
- `MIGRATION_PLAN.md` - Complete migration strategy
- `MIGRATION_CHECKLIST.md` - Step-by-step checklist
- `DNS_MIGRATION_GUIDE.md` - DNS configuration guide
- `GIF_MODULE_SETUP.md` - GIF Training module setup
- `SIMPLE_MIGRATION.md` - Quick reference guide

## 🚨 Important Notes

### Dependencies
- **All dependencies are in `package.json`** - running `npm install` will install everything needed
- No need to manually track dependencies - npm reads package.json automatically
- The package.json was copied from the old repo, so all dependencies are preserved

### Static Export
- Next.js is configured for static export (`output: "export"` in next.config.js)
- This means no server-side features (API routes, server components with dynamic data)
- All pages are pre-rendered at build time
- Perfect for Cloudflare Pages (CDN hosting)

### Media Files (GIFs)
- GIFs are stored locally in `public/images/gifs/` for development
- In production, they'll be served from Cloudflare R2
- The `getGifUrl()` function in `src/config/media.ts` handles the switch automatically
- GIFs are gitignored (won't be committed to repo)

### Environment Variables
- Development: Uses local files automatically
- Production: Needs `NEXT_PUBLIC_R2_BUCKET_URL` and `NEXT_PUBLIC_R2_GIFS_PATH`
- Set in Cloudflare Pages dashboard → Settings → Environment Variables

## 🐛 Common Issues & Solutions

### Build Fails
- Check `next.config.js` has `output: "export"` for production builds
- Ensure all imports are correct (no server-only code)
- Check TypeScript errors: `npm run typecheck`

### GIFs Not Loading
- Development: Check `public/images/gifs/` exists and has files
- Production: Verify R2 bucket URL in environment variables
- Check `getGifUrl()` function in `src/config/media.ts`

### Module Not Showing
- Add module to `src/data/modules.ts`
- Import component in `src/app/modules/[slug]/page.tsx`
- Check module slug matches

## 📝 Next Steps After Initial Setup

1. **Test Everything Locally**
   - `npm run dev` - Start dev server
   - Test all modules
   - Verify GIF module works (when GIFs are added)

2. **Set Up R2 Bucket**
   - Create bucket in Cloudflare R2
   - Upload GIFs (see `GIF_MODULE_SETUP.md`)
   - Get public URL

3. **Deploy to Cloudflare Pages**
   - Connect GitHub repo
   - Configure build settings
   - Add environment variables
   - Deploy and test

4. **Migrate DNS**
   - Remove Vercel DNS records
   - Add Cloudflare Pages custom domain
   - Wait for propagation

5. **Add GIF Manifest**
   - Create manifest file or hardcode list in `gif-training.tsx`
   - See `GIF_MODULE_SETUP.md` for options

## 🎯 Goals

- ✅ Clean, modern codebase (Next.js 16, TypeScript, Tailwind)
- ✅ Cloudflare Pages deployment (static, fast, free)
- ✅ R2 storage for media (900 GIFs, ~1.4GB)
- ✅ Domain: grapplingprimitives.com
- ✅ All modules working
- ✅ Mobile-first, dark-mode UI

## 📚 Reference

- Old repo: `bjj-skill-matrix` (for reference only)
- New repo: `grapplingprimitives` (this one)
- Branch: Code came from `obra-shadcn-ui-refactor` branch
- Domain: grapplingprimitives.com (currently pointing to Vercel, needs migration)

---

**When in doubt**: Check the migration documentation files, especially `MIGRATION_CHECKLIST.md` for step-by-step guidance.

