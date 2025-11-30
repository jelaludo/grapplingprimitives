#!/bin/bash

# Script to copy refactored code to new GrapplingPrimitives repository
# Run from the bjj-skill-matrix directory

set -e

SOURCE_DIR="$(pwd)"
TARGET_DIR="../grapplingprimitives"

echo "🚀 Copying refactored code to new repository..."
echo "Source: $SOURCE_DIR"
echo "Target: $TARGET_DIR"
echo ""

# Check target exists
if [ ! -d "$TARGET_DIR" ]; then
    echo "❌ Target directory $TARGET_DIR does not exist!"
    echo "Please create it first: mkdir $TARGET_DIR"
    exit 1
fi

# Check target is empty
if [ "$(ls -A $TARGET_DIR 2>/dev/null)" ]; then
    echo "⚠️  Warning: Target directory is not empty!"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Ensure we're on the right branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "obra-shadcn-ui-refactor" ]; then
    echo "⚠️  Warning: You're on branch $CURRENT_BRANCH, not obra-shadcn-ui-refactor"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo "📦 Copying files..."

# Create .gitkeep for empty directories that need to exist
mkdir -p "$TARGET_DIR/public/images/gifs"
touch "$TARGET_DIR/public/images/gifs/.gitkeep"

# Copy essential files and directories
echo "  Copying source code..."
rsync -av \
    --exclude='node_modules' \
    --exclude='.next' \
    --exclude='out' \
    --exclude='build' \
    --exclude='dist' \
    --exclude='.vercel' \
    --exclude='.git' \
    --exclude='coverage' \
    --exclude='*.log' \
    --exclude='.DS_Store' \
    --exclude='Thumbs.db' \
    --exclude='public/images/gifs' \
    --exclude='backups' \
    --exclude='server.js' \
    --exclude='api' \
    --exclude='scripts/seed*.ts' \
    --exclude='scripts/convert*.ts' \
    --exclude='scripts/update*.js' \
    --exclude='scripts/test-*.js' \
    --exclude='scripts/debug-*.js' \
    --exclude='scripts/generate*.js' \
    --exclude='*.md' \
    --exclude='.env*' \
    "$SOURCE_DIR/" "$TARGET_DIR/"

# Copy specific markdown files we want
echo "  Copying documentation..."
cp "$SOURCE_DIR/DEPLOYMENT_PLAN.md" "$TARGET_DIR/" 2>/dev/null || true
cp "$SOURCE_DIR/MIGRATION_PLAN.md" "$TARGET_DIR/" 2>/dev/null || true
cp "$SOURCE_DIR/MIGRATION_CHECKLIST.md" "$TARGET_DIR/" 2>/dev/null || true
cp "$SOURCE_DIR/DNS_MIGRATION_GUIDE.md" "$TARGET_DIR/" 2>/dev/null || true
cp "$SOURCE_DIR/MIGRATION_SUMMARY.md" "$TARGET_DIR/" 2>/dev/null || true
cp "$SOURCE_DIR/GIF_MODULE_SETUP.md" "$TARGET_DIR/" 2>/dev/null || true

# Copy migration script
echo "  Copying scripts..."
mkdir -p "$TARGET_DIR/scripts"
cp "$SOURCE_DIR/scripts/prepare-cloudflare-migration.sh" "$TARGET_DIR/scripts/" 2>/dev/null || true

# Remove Vercel-specific files
echo "  Cleaning Vercel files..."
rm -f "$TARGET_DIR/vercel.json"
rm -rf "$TARGET_DIR/.vercel"

# Update .gitignore if needed
if [ -f "$TARGET_DIR/.gitignore" ]; then
    if ! grep -q ".vercel/" "$TARGET_DIR/.gitignore"; then
        echo "" >> "$TARGET_DIR/.gitignore"
        echo "# Vercel (migrated to Cloudflare)" >> "$TARGET_DIR/.gitignore"
        echo ".vercel/" >> "$TARGET_DIR/.gitignore"
        echo ".vercelignore" >> "$TARGET_DIR/.gitignore"
    fi
fi

# Create a clean README for the new repo
echo "  Creating new README..."
cat > "$TARGET_DIR/README.md" << 'EOF'
# Grappling Primitives

A modern, mobile-first BJJ skill matrix and training tools platform.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🏗️ Architecture

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **Language**: TypeScript
- **Deployment**: Cloudflare Pages
- **Media Storage**: Cloudflare R2

## 📊 Features

- Interactive 2×2 Concept Matrix
- Training Games Hub
- Flash Cards
- Visual Notes
- Belt Dropout Visualization
- GIF Training Library (900+ GIFs)
- And more...

## 🚀 Deployment

Deployed to Cloudflare Pages with R2 for media storage.

See `DEPLOYMENT_PLAN.md` and `MIGRATION_PLAN.md` for setup details.

## 📁 Project Structure

```
grapplingprimitives/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   ├── data/            # Module definitions and data
│   └── config/         # Configuration utilities
├── public/
│   ├── images/         # Static images
│   └── data/           # JSON data files
└── scripts/            # Utility scripts
```

## 📄 License

MIT License
EOF

echo ""
echo "✅ Copy complete!"
echo ""
echo "Next steps:"
echo "1. cd $TARGET_DIR"
echo "2. npm install"
echo "3. npm run build  # Test build"
echo "4. git init"
echo "5. git add ."
echo "6. git commit -m 'Initial commit: Grappling Primitives'"
echo "7. Create GitHub repo: GrapplingPrimitives"
echo "8. git remote add origin <github-url>"
echo "9. git push -u origin main"
echo ""

