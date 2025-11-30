# GIF Training Module - Setup Guide

## Current Status
✅ Module structure created
✅ Routing configured
✅ Media URL utility created
✅ Gitignore updated
⏳ GIF manifest/list needed
⏳ R2 bucket setup needed

## Next Steps

### 1. Local Development Setup
1. Create directory: `public/images/gifs/`
2. Add your GIF files to this directory (for local testing)
3. The module will automatically use local files in development mode

### 2. Create GIF Manifest
You have two options:

#### Option A: Hardcoded List (Simple)
Edit `src/components/modules/gif-training/gif-training.tsx`:
```typescript
const getAllGifs = (): GifInfo[] => {
  return [
    { filename: 'technique1.gif', name: 'Armbar from Guard' },
    { filename: 'technique2.gif', name: 'Triangle Choke' },
    // ... add all 900 GIFs
  ];
};
```

#### Option B: Manifest File (Recommended)
1. Create `public/manifests/gifs.json`:
```json
[
  { "filename": "technique1.gif", "name": "Armbar from Guard" },
  { "filename": "technique2.gif", "name": "Triangle Choke" }
]
```

2. Update `gif-training.tsx` to fetch it:
```typescript
useEffect(() => {
  fetch('/manifests/gifs.json')
    .then(res => res.json())
    .then(data => setAllGifs(data))
    .catch(console.error);
}, []);
```

### 3. Cloudflare R2 Setup
1. **Create R2 Bucket**:
   - Go to Cloudflare Dashboard → R2
   - Create bucket: `jelaludo-media`
   - Enable public access

2. **Upload GIFs**:
   ```bash
   # Install Wrangler
   npm install -g wrangler
   wrangler login
   
   # Upload all GIFs
   for file in public/images/gifs/*.gif; do
     wrangler r2 object put jelaludo-media/gifs/$(basename $file) $file
   done
   ```

3. **Get Public URL**:
   - R2 Dashboard → Bucket → Settings
   - Copy public URL (e.g., `https://pub-jelaludo-media.r2.dev`)

### 4. Environment Variables
Add to `.env.local` (for local testing with R2):
```env
NEXT_PUBLIC_R2_BUCKET_URL=https://pub-jelaludo-media.r2.dev
NEXT_PUBLIC_R2_GIFS_PATH=/gifs
```

For Cloudflare Pages, add these in the dashboard under:
Settings → Environment Variables → Production

### 5. Test Locally
```bash
npm run dev
# Navigate to /modules/gif-training
# Should see GIFs loading from local files
```

### 6. Deploy to Cloudflare Pages
1. Connect GitHub repo to Cloudflare Pages
2. Set build command: `npm run build`
3. Set output directory: `out`
4. Add environment variables (see step 4)
5. Deploy!

## File Structure
```
public/
  images/
    gifs/              # Local GIFs (gitignored)
  manifests/
    gifs.json          # Optional: GIF manifest (committed)

src/
  components/
    modules/
      gif-training/
        gif-training.tsx
  config/
    media.ts           # URL utility (local vs R2)
```

## Component Features
- ✅ Search/filter GIFs
- ✅ Grid layout with hover effects
- ✅ Fullscreen modal viewer
- ✅ Lazy loading
- ✅ Responsive design
- ⏳ GIF metadata (tags, categories)
- ⏳ Playback controls
- ⏳ Favorites/bookmarks

## Notes
- GIFs are excluded from Git (see `.gitignore`)
- Local files work in development automatically
- Production uses R2 URLs via environment variables
- Component is ready, just needs GIF list/manifest

