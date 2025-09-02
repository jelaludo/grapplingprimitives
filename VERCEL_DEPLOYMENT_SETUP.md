# 🚀 Vercel Deployment Setup

## Environment Variables

Set these in your Vercel dashboard > Project Settings > Environment Variables:

### 1. JWT_SECRET
```
b8d261e52a1d9f835150e151106e066a38e90b581d46860d8fa017c0da1c870
```

### 2. BETA_PASSWORD_HASHES
```
$2a$12$xUIVFnwthKlAhvppn5va7eIiezBXdtWjXpwn6UNVz.TtZ5svDaGXS
```

## Beta Access Credentials

- **Password**: `bjj-beta-2025`
- **Hash**: `$2a$12$xUIVFnwthKlAhvppn5va7eIiezBXdtWjXpwn6UNVz.TtZ5svDaGXS`

## Deployment Steps

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

4. **Set Environment Variables** in Vercel dashboard:
   - Go to Project Settings > Environment Variables
   - Add `JWT_SECRET` with the value above
   - Add `BETA_PASSWORD_HASHES` with the hash above

5. **Redeploy** (to pick up environment variables):
   ```bash
   vercel --prod
   ```

## Testing

1. Visit your deployed app
2. Click "Beta Access" button
3. Enter password: `bjj-beta-2025`
4. You should get access to the app

## Troubleshooting

- If you get "Server configuration error", check that `BETA_PASSWORD_HASHES` is set
- If JWT verification fails, check that `JWT_SECRET` is set
- Make sure to redeploy after setting environment variables
