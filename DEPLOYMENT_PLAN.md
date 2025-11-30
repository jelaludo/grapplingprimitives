# Cloudflare Pages + R2 Deployment Plan

## Overview
This project will migrate from Vercel to Cloudflare Pages for hosting, with Cloudflare R2 for media storage (900 GIFs, ~1.4GB).

## Architecture

### GitHub + Cloudflare Separation
- **Code**: Keep in GitHub repo (code-only, no media)
- **Deployment**: Cloudflare Pages via direct Git integration
  - Supports up to 25 MiB per file
  - 20,000 files total
  - 500 builds/month free tier
- **Media Storage**: Cloudflare R2 (S3-compatible)
  - No file size limits (practical up to TBs)
  - Zero egress fees to Cloudflare CDN
  - Public buckets serve GIFs/videos directly
  - Cost: ~$0.015/GB storage monthly (2.8 GB = ~$0.04/month)

## File Structure

### Local Development
```
public/
  images/
    gifs/          # Local GIFs for development (gitignored)
    visualnotes/   # Existing images (committed)
```

### Production URLs
- **R2 Public Bucket**: `https://pub-jelaludo-media.r2.dev/gifs/`
- **Custom Domain** (optional): `https://media.jelaludo.com/gifs/`
- **Pages Function Proxy** (optional): `/media/gifs/*` → R2

## Deployment Workflow

### 1. Gitignore Setup
Add to `.gitignore`:
```
/public/images/gifs/
/gifs/
```

### 2. GitHub Actions (Optional - Automated Upload)
Create `.github/workflows/sync-gifs-to-r2.yml`:
```yaml
name: Sync GIFs to R2
on:
  push:
    paths:
      - 'public/images/gifs/**'
  workflow_dispatch:

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
        env:
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
      - name: Upload GIFs to R2
        run: |
          wrangler r2 object put jelaludo-media/gifs/ --directory public/images/gifs/
```

### 3. Manual Upload (Alternative)
Using Wrangler CLI:
```bash
# Install Wrangler
npm install -g wrangler

# Authenticate
wrangler login

# Upload directory
wrangler r2 object put jelaludo-media/gifs/filename.gif ./public/images/gifs/filename.gif

# Or bulk upload
for file in public/images/gifs/*.gif; do
  wrangler r2 object put jelaludo-media/gifs/$(basename $file) $file
done
```

### 4. Cloudflare Pages Setup
1. Connect GitHub repo in Cloudflare Pages dashboard
2. Select repository
3. Build settings:
   - **Build command**: `npm run build`
   - **Output directory**: `out`
   - **Root directory**: `/`
4. Environment variables:
   - `NEXT_PUBLIC_R2_BUCKET_URL`: `https://pub-jelaludo-media.r2.dev`
   - `NEXT_PUBLIC_R2_GIFS_PATH`: `/gifs`
   - `NODE_ENV`: `production`

### 5. R2 Bucket Configuration
1. Create bucket: `jelaludo-media`
2. Enable public access:
   - Settings → Public Access → Enable
   - Or use custom domain: `media.jelaludo.com`
3. Optional: Set up Worker/Pages Function for proxying:
   ```javascript
   // functions/media/[...path].js
   export async function onRequest(context) {
     const { request, env } = context;
     const url = new URL(request.url);
     const path = url.pathname.replace('/media/', '');
     
     const object = await env.R2_BUCKET.get(path);
     if (!object) {
       return new Response('Not found', { status: 404 });
     }
     
     return new Response(object.body, {
       headers: {
         'Content-Type': object.httpMetadata?.contentType || 'image/gif',
         'Cache-Control': 'public, max-age=31536000',
       },
     });
   }
   ```

## Code Updates

### Environment Configuration
Create `src/config/media.ts`:
```typescript
const isDevelopment = process.env.NODE_ENV === 'development';
const r2BaseUrl = process.env.NEXT_PUBLIC_R2_BUCKET_URL || '';
const r2GifsPath = process.env.NEXT_PUBLIC_R2_GIFS_PATH || '/gifs';

export const getGifUrl = (filename: string): string => {
  if (isDevelopment) {
    // Use local files in development
    return `/images/gifs/${filename}`;
  }
  // Use R2 URLs in production
  return `${r2BaseUrl}${r2GifsPath}/${filename}`;
};
```

### Component Usage
```typescript
import { getGifUrl } from '@/config/media';

const gifUrl = getGifUrl('technique-name.gif');
<img src={gifUrl} alt="BJJ technique" />
```

## Migration Checklist

- [ ] Add `/public/images/gifs/` to `.gitignore`
- [ ] Create R2 bucket `jelaludo-media`
- [ ] Upload all GIFs to R2 (manual or via Actions)
- [ ] Set up Cloudflare Pages project
- [ ] Configure environment variables
- [ ] Create `src/config/media.ts` utility
- [ ] Update GIF module to use `getGifUrl()`
- [ ] Test locally with local files
- [ ] Test production build with R2 URLs
- [ ] Deploy to Cloudflare Pages
- [ ] Verify GIFs load correctly
- [ ] Set up custom domain (optional)
- [ ] Configure CDN caching headers

## Cost Estimate
- **Cloudflare Pages**: Free (500 builds/month)
- **R2 Storage**: ~$0.04/month (1.4GB × $0.015/GB)
- **R2 Egress**: $0 (to Cloudflare CDN)
- **Total**: ~$0.04/month

## Notes
- Keep GIFs locally for development
- Use environment variables to switch between local/R2 URLs
- Consider lazy loading for GIFs to improve performance
- R2 public buckets are accessible via direct URLs
- Custom domain requires DNS configuration in Cloudflare

