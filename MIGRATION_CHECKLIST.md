# Migration Checklist: Vercel → Cloudflare Pages

## Pre-Migration (Do This First)

### 1. Repository Setup
- [ ] Create new GitHub repository: `GrapplingPrimitives`
  - Go to GitHub → New repository
  - Name: `GrapplingPrimitives`
  - Description: "Grappling Primitives - BJJ Skill Matrix & Training Tools"
  - Visibility: Private (or Public)
  - **DO NOT** initialize with README, .gitignore, or license

### 2. Code Cleanup
- [ ] Checkout refactor branch: `git checkout obra-shadcn-ui-refactor`
- [ ] Create migration branch: `git checkout -b cloudflare-migration`
- [ ] Remove Vercel files:
  ```bash
  rm -f vercel.json
  rm -rf .vercel
  ```
- [ ] Update `.gitignore` (already done):
  - ✅ `/public/images/gifs/` 
  - ✅ `.vercel/`
- [ ] Commit cleanup:
  ```bash
  git add .gitignore
  git commit -m "chore: remove Vercel config, prepare for Cloudflare migration"
  ```

### 3. Test Build Locally
- [ ] Run production build: `npm run build`
- [ ] Verify `out/` directory is created
- [ ] Test static export: `npm run start` (if available) or serve `out/` directory
- [ ] Check all modules load correctly
- [ ] Verify no Vercel-specific code remains

### 4. R2 Bucket Preparation
- [ ] Create Cloudflare account (if not already)
- [ ] Go to R2 → Create bucket: `jelaludo-media` (or `grapplingprimitives-media`)
- [ ] Enable public access on bucket
- [ ] Note the public URL (e.g., `https://pub-jelaludo-media.r2.dev`)
- [ ] Upload GIFs to R2 (can do this later, but prepare bucket)

## Migration Day

### Step 1: Push to New Repository
```bash
# Add new remote
git remote add cloudflare https://github.com/YOUR_USERNAME/GrapplingPrimitives.git

# Push to new repo (main branch)
git push cloudflare cloudflare-migration:main

# Verify push succeeded
git remote -v
```

### Step 2: Cloudflare Pages Setup
- [ ] Go to Cloudflare Dashboard → Pages
- [ ] Click "Create a project" → "Connect to Git"
- [ ] Authorize GitHub and select `GrapplingPrimitives` repository
- [ ] Configure build settings:
  - **Framework preset**: Next.js
  - **Build command**: `npm run build`
  - **Build output directory**: `out`
  - **Root directory**: `/` (leave empty)
  - **Node version**: 20.x (or 18.x)
- [ ] Add environment variables:
  ```
  NODE_ENV=production
  NEXT_STATIC_EXPORT=true
  NEXT_PUBLIC_R2_BUCKET_URL=https://pub-jelaludo-media.r2.dev
  NEXT_PUBLIC_R2_GIFS_PATH=/gifs
  ```
- [ ] Click "Save and Deploy"
- [ ] Wait for first deployment to complete
- [ ] Note the Pages URL (e.g., `grapplingprimitives.pages.dev`)

### Step 3: Test Cloudflare Pages Deployment
- [ ] Visit the Pages URL
- [ ] Verify site loads correctly
- [ ] Test all major modules:
  - [ ] Concept Matrix
  - [ ] Games Hub
  - [ ] Flash Cards
  - [ ] Visual Notes
  - [ ] Belt Dropout
  - [ ] Beyond Offense and Defense
  - [ ] Stories
- [ ] Check mobile responsiveness
- [ ] Verify no console errors

### Step 4: DNS Configuration (Cloudflare)
- [ ] Go to Cloudflare Dashboard → DNS
- [ ] Find `grapplingprimitives.com` domain
- [ ] **Remove Vercel DNS records**:
  - [ ] Delete CNAME record pointing to Vercel (if exists)
  - [ ] Delete A record pointing to Vercel (if exists)
- [ ] **Add Cloudflare Pages custom domain**:
  - [ ] Go to Pages project → Settings → Custom domains
  - [ ] Add `grapplingprimitives.com`
  - [ ] Add `www.grapplingprimitives.com` (optional)
  - [ ] Cloudflare will auto-configure DNS records
- [ ] **Verify DNS records**:
  - [ ] Check DNS tab shows CNAME for `@` → Pages project
  - [ ] Check `www` → Pages project (if configured)

### Step 5: DNS Propagation Wait
- [ ] Wait 5-60 minutes for DNS propagation
- [ ] Check DNS propagation: `nslookup grapplingprimitives.com`
- [ ] Test domain: `curl -I https://grapplingprimitives.com`
- [ ] Verify SSL certificate is active (Cloudflare auto-provisions)

### Step 6: Final Verification
- [ ] Visit `https://grapplingprimitives.com`
- [ ] Visit `https://www.grapplingprimitives.com` (if configured)
- [ ] Test all features again on live domain
- [ ] Check browser console for errors
- [ ] Test on mobile device
- [ ] Verify R2 GIFs load (when uploaded)

## Post-Migration

### Cleanup
- [ ] Archive or delete old `bjj-skill-matrix` repository (optional)
- [ ] Remove Vercel project from Vercel dashboard
- [ ] Cancel Vercel paid plans (if applicable)
- [ ] Update any bookmarks or links

### Documentation
- [ ] Update README.md with Cloudflare deployment info
- [ ] Remove Vercel references from documentation
- [ ] Update any deployment guides

### Monitoring (First 48 Hours)
- [ ] Monitor Cloudflare Pages deployment logs
- [ ] Check error rates in Cloudflare Analytics
- [ ] Verify all modules continue working
- [ ] Test R2 GIF loading (when ready)
- [ ] Check page load times

## Rollback Plan (If Needed)

If issues occur:
1. **Immediate**: Revert DNS to Vercel (if old deployment still works)
2. **Fix Issues**: Debug in Cloudflare Pages
3. **Redeploy**: Push fixes and redeploy
4. **Re-cutover**: Update DNS again after fixes

## Quick Reference

### Cloudflare Pages URLs
- **Project Dashboard**: https://dash.cloudflare.com/[account-id]/pages
- **Deployment URL**: `https://[project-name].pages.dev`
- **Custom Domain**: `https://grapplingprimitives.com`

### Environment Variables Needed
```
NODE_ENV=production
NEXT_STATIC_EXPORT=true
NEXT_PUBLIC_R2_BUCKET_URL=https://pub-jelaludo-media.r2.dev
NEXT_PUBLIC_R2_GIFS_PATH=/gifs
```

### Build Commands
```bash
# Local test
npm run build
# Output: out/

# Deploy (automatic via Git push)
git push cloudflare main
```

## Notes
- DNS propagation: Usually 5-60 minutes, can take up to 48 hours
- Keep old Vercel deployment running during transition
- Test thoroughly before DNS cutover
- Cloudflare Pages free tier: Unlimited requests, 500 builds/month
- R2 storage: ~$0.04/month for 1.4GB GIFs
