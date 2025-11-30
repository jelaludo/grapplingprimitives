# DNS Migration Guide: Vercel → Cloudflare Pages

## Overview
This guide explains how to migrate DNS from Vercel to Cloudflare Pages for `grapplingprimitives.com`.

## Current Setup (Vercel)

### Typical Vercel DNS Configuration
When you deploy to Vercel and add a custom domain, Vercel typically sets up:

**Option 1: CNAME Record**
```
Type: CNAME
Name: @ (or root domain)
Target: cname.vercel-dns.com
```

**Option 2: A Records**
```
Type: A
Name: @
Target: 76.76.21.21 (Vercel's IP)
```

**Option 3: Nameservers**
- Vercel may have changed your nameservers to their own
- Check in your domain registrar

## New Setup (Cloudflare Pages)

### Step 1: Cloudflare Pages Custom Domain
1. Deploy your site to Cloudflare Pages first
2. Go to Pages project → Settings → Custom domains
3. Add `grapplingprimitives.com`
4. Add `www.grapplingprimitives.com` (optional)
5. Cloudflare will show you the required DNS records

### Step 2: Update DNS Records

#### If Domain is Already on Cloudflare
If `grapplingprimitives.com` is already using Cloudflare DNS:

1. Go to Cloudflare Dashboard → DNS → Records
2. **Remove Vercel records**:
   - Delete CNAME pointing to `cname.vercel-dns.com`
   - Delete A records pointing to Vercel IPs
3. **Cloudflare Pages will auto-add records** when you add custom domain:
   - CNAME: `@` → `[your-project].pages.dev`
   - CNAME: `www` → `[your-project].pages.dev` (if configured)

#### If Domain is NOT on Cloudflare
You have two options:

**Option A: Move DNS to Cloudflare (Recommended)**
1. Add domain to Cloudflare
2. Update nameservers at your registrar to Cloudflare's nameservers
3. Wait for DNS propagation
4. Add custom domain in Pages (DNS auto-configures)

**Option B: Keep Current DNS Provider**
1. In your current DNS provider (e.g., GoDaddy, Namecheap):
2. **Remove Vercel records**:
   - Delete CNAME to `cname.vercel-dns.com`
   - Delete A records to Vercel IPs
3. **Add Cloudflare Pages records**:
   - CNAME: `@` → `[your-project].pages.dev`
   - CNAME: `www` → `[your-project].pages.dev` (if configured)

## DNS Record Reference

### Before (Vercel)
```
Type: CNAME
Name: @
Target: cname.vercel-dns.com
TTL: Auto
Proxy: (if using Cloudflare proxy)
```

### After (Cloudflare Pages)
```
Type: CNAME
Name: @
Target: grapplingprimitives.pages.dev
TTL: Auto
Proxy: Enabled (orange cloud) - Recommended
```

## Step-by-Step Migration

### Phase 1: Preparation (Before DNS Change)
1. ✅ Deploy to Cloudflare Pages
2. ✅ Test Pages URL works
3. ✅ Add custom domain in Pages settings
4. ✅ Note the DNS records Cloudflare shows

### Phase 2: DNS Update
1. **Go to your DNS provider** (Cloudflare DNS or registrar)
2. **Remove Vercel records**:
   - Delete CNAME to `cname.vercel-dns.com`
   - Delete any A records to Vercel IPs
3. **Add Cloudflare Pages records**:
   - CNAME: `@` → `[project].pages.dev`
   - CNAME: `www` → `[project].pages.dev` (optional)
4. **Enable Cloudflare Proxy** (orange cloud icon) - Recommended for:
   - DDoS protection
   - SSL/TLS encryption
   - CDN caching

### Phase 3: Verification
1. **Wait 5-60 minutes** for DNS propagation
2. **Check DNS propagation**:
   ```bash
   # Check current DNS
   nslookup grapplingprimitives.com
   dig grapplingprimitives.com
   
   # Should show Cloudflare Pages CNAME
   ```
3. **Test domain**:
   ```bash
   curl -I https://grapplingprimitives.com
   # Should return 200 OK from Cloudflare Pages
   ```
4. **Verify SSL certificate**:
   - Cloudflare auto-provisions SSL
   - Should be active within minutes
   - Check: https://www.ssllabs.com/ssltest/

### Phase 4: Final Checks
- [ ] Domain loads: `https://grapplingprimitives.com`
- [ ] WWW loads: `https://www.grapplingprimitives.com` (if configured)
- [ ] SSL certificate active (green lock)
- [ ] All pages/modules work
- [ ] No redirect loops
- [ ] Mobile works correctly

## Troubleshooting

### Issue: Domain Still Points to Vercel
**Solution**: 
- Check DNS propagation: `nslookup grapplingprimitives.com`
- Clear DNS cache: `ipconfig /flushdns` (Windows) or `sudo dscacheutil -flushcache` (Mac)
- Wait longer (can take up to 48 hours)

### Issue: SSL Certificate Not Active
**Solution**:
- Cloudflare auto-provisions SSL, usually within 15 minutes
- Check Cloudflare Dashboard → SSL/TLS → Edge Certificates
- Ensure "Always Use HTTPS" is enabled

### Issue: Redirect Loop
**Solution**:
- Check Cloudflare Page Rules
- Ensure no conflicting redirects
- Check Next.js redirects in `next.config.js`

### Issue: Mixed Content Warnings
**Solution**:
- Ensure all assets use HTTPS
- Check R2 URLs use HTTPS
- Enable "Always Use HTTPS" in Cloudflare

## Rollback Plan

If you need to rollback to Vercel:

1. **Revert DNS records**:
   - Change CNAME back to `cname.vercel-dns.com`
   - Or restore A records to Vercel IPs

2. **Wait for DNS propagation** (5-60 minutes)

3. **Verify Vercel site loads**

4. **Fix issues in Cloudflare Pages**

5. **Re-migrate when ready**

## DNS Propagation Timeline

- **Fast**: 5-15 minutes (most common)
- **Normal**: 15-60 minutes
- **Slow**: 1-24 hours (rare)
- **Maximum**: 48 hours (TTL-dependent)

## Cloudflare-Specific Features

### Automatic Features (No Setup Needed)
- ✅ SSL/TLS certificates (auto-provisioned)
- ✅ DDoS protection (if proxy enabled)
- ✅ CDN caching (if proxy enabled)
- ✅ HTTP/2 and HTTP/3 support

### Recommended Settings
1. **SSL/TLS Mode**: Full (strict)
2. **Always Use HTTPS**: On
3. **Automatic HTTPS Rewrites**: On
4. **Minimum TLS Version**: 1.2
5. **Opportunistic Encryption**: On

## Quick Reference

### Cloudflare Dashboard Locations
- **DNS Records**: Dashboard → DNS → Records
- **SSL/TLS**: Dashboard → SSL/TLS
- **Pages Custom Domains**: Pages → [Project] → Settings → Custom domains
- **Page Rules**: Dashboard → Rules → Page Rules

### Useful Commands
```bash
# Check DNS
nslookup grapplingprimitives.com
dig grapplingprimitives.com

# Check SSL
openssl s_client -connect grapplingprimitives.com:443

# Test HTTPS
curl -I https://grapplingprimitives.com
```

## Notes
- Keep Vercel deployment running during transition
- Test thoroughly before DNS cutover
- DNS changes are reversible
- Cloudflare proxy (orange cloud) is recommended
- SSL certificates are free and auto-managed

