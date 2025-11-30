# Migration Plan: Vercel → Cloudflare Pages

## Overview
Migrating from Vercel to Cloudflare Pages with a clean repository structure.

## Strategy: New Repository Approach

### Why New Repo?
- ✅ Clean slate without legacy Vercel configuration
- ✅ Matches domain name (GrapplingPrimitives → grapplingprimitives.com)
- ✅ Easier to set up Cloudflare Pages from scratch
- ✅ No merge conflicts or branch confusion
- ✅ Clear separation from old deployment

## Migration Steps

### Phase 1: Prepare New Repository

#### 1.1 Create New GitHub Repository
- **Name**: `GrapplingPrimitives` (matches domain)
- **Visibility**: Private (or Public, your choice)
- **Initialize**: Don't add README, .gitignore, or license (we'll push existing code)

#### 1.2 Prepare Current Codebase
```bash
# Ensure you're on the refactor branch
git checkout obra-shadcn-ui-refactor

# Create a clean branch without Vercel-specific files
git checkout -b cloudflare-migration

# Remove Vercel-specific files
rm -f vercel.json
# Keep .vercel/ if it exists for reference, but add to .gitignore

# Update .gitignore to exclude Vercel
echo ".vercel/" >> .gitignore
echo ".vercelignore" >> .gitignore

# Commit cleanup
git add .gitignore
git commit -m "chore: remove Vercel configuration, prepare for Cloudflare"
```

#### 1.3 Push to New Repository
```bash
# Add new remote
git remote add cloudflare https://github.com/YOUR_USERNAME/GrapplingPrimitives.git

# Push to new repo
git push cloudflare cloudflare-migration:main

# Set upstream
git branch --set-upstream-to=cloudflare/main main
```

### Phase 2: Cloudflare Setup

#### 2.1 DNS Configuration (Cloudflare Dashboard)
1. Go to Cloudflare Dashboard → DNS
2. Find `grapplingprimitives.com` domain
3. **Remove/Update Vercel DNS records**:
   - Delete or update A/CNAME records pointing to Vercel
   - Remove Vercel's nameservers if they were set

4. **Add Cloudflare Pages DNS**:
   - After Pages deployment, Cloudflare will provide a CNAME
   - Add CNAME record: `@` → `pages.dev` (or custom subdomain)
   - Or use Cloudflare's automatic DNS management

#### 2.2 Cloudflare Pages Setup
1. Go to Cloudflare Dashboard → Pages
2. Click "Create a project" → "Connect to Git"
3. Select `GrapplingPrimitives` repository
4. Configure build settings:
   - **Framework preset**: Next.js
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
   - **Root directory**: `/` (or leave empty)
   - **Node version**: 18.x or 20.x

5. **Environment Variables**:
   ```
   NODE_ENV=production
   NEXT_PUBLIC_R2_BUCKET_URL=https://pub-jelaludo-media.r2.dev
   NEXT_PUBLIC_R2_GIFS_PATH=/gifs
   ```

6. **Custom Domain**:
   - After first deployment, go to Settings → Custom domains
   - Add `grapplingprimitives.com` and `www.grapplingprimitives.com`
   - Cloudflare will automatically configure DNS

#### 2.3 R2 Bucket Setup
1. Create R2 bucket: `jelaludo-media` (or `grapplingprimitives-media`)
2. Enable public access
3. Upload GIFs (see `DEPLOYMENT_PLAN.md`)
4. Note the public URL for environment variables

### Phase 3: Code Updates

#### 3.1 Remove Vercel References
- ✅ Already removed `vercel.json` in Phase 1
- Update any hardcoded Vercel URLs in code
- Update README with Cloudflare deployment info

#### 3.2 Update Configuration Files
- `next.config.js`: Ensure `output: 'export'` is set
- `.env.example`: Add Cloudflare environment variables
- `package.json`: Update deployment scripts if needed

#### 3.3 Test Locally
```bash
npm run build
npm run start  # Test production build locally
```

### Phase 4: Deployment & Verification

#### 4.1 Initial Deployment
1. Push to `main` branch in new repo
2. Cloudflare Pages will auto-deploy
3. Check deployment logs for errors
4. Verify site loads at Cloudflare Pages URL

#### 4.2 DNS Cutover
1. **Before cutover**: Test site at Cloudflare Pages URL
2. **Update DNS**:
   - Point `grapplingprimitives.com` to Cloudflare Pages
   - Wait for DNS propagation (5-60 minutes)
3. **Verify**:
   - Check `grapplingprimitives.com` loads correctly
   - Check `www.grapplingprimitives.com` (if configured)
   - Test all modules and features

#### 4.3 Post-Migration
- Monitor for 24-48 hours
- Check analytics/error logs
- Verify R2 GIFs load correctly
- Test all interactive features

### Phase 5: Cleanup

#### 5.1 Old Repository
- Archive or delete old repo (optional)
- Or keep as backup for reference

#### 5.2 Vercel
- Remove project from Vercel dashboard
- Cancel any paid plans if applicable
- Keep account for future projects (optional)

## Alternative: Merge Approach (Not Recommended)

If you want to merge instead:

```bash
# On old repo
git checkout main
git merge obra-shadcn-ui-refactor
# Resolve conflicts
git push origin main
```

**Issues with merge approach**:
- May have Vercel config conflicts
- Branch history confusion
- Need to clean up old branches
- More complex DNS transition

## Checklist

### Pre-Migration
- [ ] Create new GitHub repo `GrapplingPrimitives`
- [ ] Clean up Vercel config from codebase
- [ ] Test build locally (`npm run build`)
- [ ] Prepare R2 bucket and upload GIFs
- [ ] Document all environment variables

### Migration Day
- [ ] Push code to new repo
- [ ] Set up Cloudflare Pages project
- [ ] Configure build settings
- [ ] Add environment variables
- [ ] Deploy and verify Pages URL works
- [ ] Update DNS records in Cloudflare
- [ ] Wait for DNS propagation
- [ ] Test domain loads correctly

### Post-Migration
- [ ] Verify all modules work
- [ ] Test GIF loading from R2
- [ ] Check mobile responsiveness
- [ ] Monitor error logs
- [ ] Update bookmarks/links
- [ ] Archive old repo (optional)

## DNS Record Reference

### Current (Vercel)
```
Type: CNAME
Name: @
Target: cname.vercel-dns.com
```

### New (Cloudflare Pages)
```
Type: CNAME
Name: @
Target: [your-pages-project].pages.dev
```

Or use Cloudflare's automatic DNS management (recommended).

## Rollback Plan

If issues occur:
1. Revert DNS to Vercel (if old deployment still works)
2. Fix issues in Cloudflare Pages
3. Redeploy
4. Re-cutover DNS

## Notes
- DNS propagation can take up to 48 hours (usually 5-60 minutes)
- Keep old Vercel deployment running during transition
- Test thoroughly before DNS cutover
- Cloudflare Pages has generous free tier (unlimited requests, 500 builds/month)

