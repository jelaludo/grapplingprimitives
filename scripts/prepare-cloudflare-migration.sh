#!/bin/bash

# Script to prepare codebase for Cloudflare Pages migration
# Run this before pushing to the new GrapplingPrimitives repository

echo "🚀 Preparing codebase for Cloudflare Pages migration..."

# Check if we're on the right branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "obra-shadcn-ui-refactor" ] && [ "$CURRENT_BRANCH" != "cloudflare-migration" ]; then
    echo "⚠️  Warning: You're not on obra-shadcn-ui-refactor or cloudflare-migration branch"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Create migration branch if it doesn't exist
if [ "$CURRENT_BRANCH" != "cloudflare-migration" ]; then
    echo "📦 Creating cloudflare-migration branch..."
    git checkout -b cloudflare-migration
fi

# Remove Vercel-specific files
echo "🧹 Removing Vercel configuration..."
if [ -f "vercel.json" ]; then
    rm vercel.json
    echo "  ✅ Removed vercel.json"
fi

if [ -d ".vercel" ]; then
    rm -rf .vercel
    echo "  ✅ Removed .vercel directory"
fi

# Update .gitignore if needed
if ! grep -q ".vercel/" .gitignore; then
    echo "" >> .gitignore
    echo "# Vercel (migrated to Cloudflare)" >> .gitignore
    echo ".vercel/" >> .gitignore
    echo ".vercelignore" >> .gitignore
    echo "  ✅ Updated .gitignore"
fi

# Check next.config.js for static export
if grep -q "output.*export" next.config.js; then
    echo "  ✅ Static export already configured in next.config.js"
else
    echo "  ⚠️  Warning: Static export may not be configured. Check next.config.js"
fi

# Test build
echo "🔨 Testing production build..."
npm run build

if [ $? -eq 0 ]; then
    echo "  ✅ Build successful! Output in out/ directory"
    
    if [ -d "out" ]; then
        echo "  ✅ out/ directory created"
        FILE_COUNT=$(find out -type f | wc -l)
        echo "  📊 Generated $FILE_COUNT files"
    else
        echo "  ⚠️  Warning: out/ directory not found"
    fi
else
    echo "  ❌ Build failed! Fix errors before migrating."
    exit 1
fi

# Summary
echo ""
echo "✅ Preparation complete!"
echo ""
echo "Next steps:"
echo "1. Review changes: git status"
echo "2. Commit cleanup: git add . && git commit -m 'chore: remove Vercel config, prepare for Cloudflare'"
echo "3. Create new GitHub repo: GrapplingPrimitives"
echo "4. Push to new repo: git remote add cloudflare <url> && git push cloudflare cloudflare-migration:main"
echo ""
echo "See MIGRATION_CHECKLIST.md for detailed steps."

