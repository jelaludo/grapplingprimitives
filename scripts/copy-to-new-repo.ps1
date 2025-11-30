# PowerShell script to copy refactored code to new GrapplingPrimitives repository
# Run from the bjj-skill-matrix directory

$SourceDir = Get-Location
$TargetDir = Join-Path (Split-Path $SourceDir) "grapplingprimitives"

Write-Host "🚀 Copying refactored code to new repository..." -ForegroundColor Cyan
Write-Host "Source: $SourceDir"
Write-Host "Target: $TargetDir"
Write-Host ""

# Check target exists
if (-not (Test-Path $TargetDir)) {
    Write-Host "❌ Target directory $TargetDir does not exist!" -ForegroundColor Red
    Write-Host "Please create it first: New-Item -ItemType Directory -Path $TargetDir"
    exit 1
}

# Check target is empty
if ((Get-ChildItem $TargetDir -Force | Measure-Object).Count -gt 0) {
    Write-Host "⚠️  Warning: Target directory is not empty!" -ForegroundColor Yellow
    $response = Read-Host "Continue anyway? (y/n)"
    if ($response -ne "y") {
        exit 1
    }
}

# Check current branch
$CurrentBranch = git branch --show-current
if ($CurrentBranch -ne "obra-shadcn-ui-refactor") {
    Write-Host "⚠️  Warning: You're on branch $CurrentBranch, not obra-shadcn-ui-refactor" -ForegroundColor Yellow
    $response = Read-Host "Continue anyway? (y/n)"
    if ($response -ne "y") {
        exit 1
    }
}

Write-Host "📦 Copying files..." -ForegroundColor Cyan

# Create directory structure
New-Item -ItemType Directory -Path "$TargetDir\public\images\gifs" -Force | Out-Null
New-Item -ItemType File -Path "$TargetDir\public\images\gifs\.gitkeep" -Force | Out-Null

# Copy essential files (excluding build artifacts and legacy code)
$ExcludePatterns = @(
    "node_modules",
    ".next",
    "out",
    "build",
    "dist",
    ".vercel",
    ".git",
    "coverage",
    "*.log",
    ".DS_Store",
    "Thumbs.db",
    "public\images\gifs\*",
    "backups",
    "server.js",
    "api",
    "scripts\seed*.ts",
    "scripts\convert*.ts",
    "scripts\update*.js",
    "scripts\test-*.js",
    "scripts\debug-*.js",
    "scripts\generate*.js",
    "*.md",
    ".env*"
)

# Copy files using robocopy (more reliable on Windows)
Write-Host "  Copying source code..." -ForegroundColor Gray
robocopy $SourceDir $TargetDir /E /XD node_modules .next out build dist .vercel .git coverage backups api /XF vercel.json *.log .DS_Store Thumbs.db .env* /XD public\images\gifs /XF server.js /NFL /NDL /NJH /NJS

# Copy specific markdown files we want
Write-Host "  Copying documentation..." -ForegroundColor Gray
$DocsToCopy = @(
    "DEPLOYMENT_PLAN.md",
    "MIGRATION_PLAN.md",
    "MIGRATION_CHECKLIST.md",
    "DNS_MIGRATION_GUIDE.md",
    "MIGRATION_SUMMARY.md",
    "GIF_MODULE_SETUP.md"
)

foreach ($doc in $DocsToCopy) {
    if (Test-Path "$SourceDir\$doc") {
        Copy-Item "$SourceDir\$doc" "$TargetDir\" -Force
    }
}

# Copy migration script
Write-Host "  Copying scripts..." -ForegroundColor Gray
New-Item -ItemType Directory -Path "$TargetDir\scripts" -Force | Out-Null
if (Test-Path "$SourceDir\scripts\prepare-cloudflare-migration.sh") {
    Copy-Item "$SourceDir\scripts\prepare-cloudflare-migration.sh" "$TargetDir\scripts\" -Force
}

# Remove Vercel-specific files
Write-Host "  Cleaning Vercel files..." -ForegroundColor Gray
Remove-Item "$TargetDir\vercel.json" -ErrorAction SilentlyContinue
Remove-Item "$TargetDir\.vercel" -Recurse -Force -ErrorAction SilentlyContinue

# Update .gitignore
if (Test-Path "$TargetDir\.gitignore") {
    $GitignoreContent = Get-Content "$TargetDir\.gitignore" -Raw
    if ($GitignoreContent -notmatch "\.vercel/") {
        Add-Content "$TargetDir\.gitignore" "`n# Vercel (migrated to Cloudflare)`n.vercel/`n.vercelignore"
    }
}

# Update package.json name
Write-Host "  Updating package.json..." -ForegroundColor Gray
if (Test-Path "$TargetDir\package.json") {
    $PackageJson = Get-Content "$TargetDir\package.json" -Raw | ConvertFrom-Json
    $PackageJson.name = "grapplingprimitives"
    $PackageJson.version = "1.0.0"
    
    # Remove legacy scripts
    $ScriptsToKeep = @("dev", "build", "start", "lint", "typecheck")
    $PackageJson.scripts = @{}
    foreach ($script in $ScriptsToKeep) {
        if ($PackageJson.scripts.PSObject.Properties.Name -contains $script) {
            $PackageJson.scripts.$script = $PackageJson.scripts.$script
        }
    }
    # Add scripts manually
    $PackageJson.scripts.dev = "next dev"
    $PackageJson.scripts.build = "next build"
    $PackageJson.scripts.start = "next start"
    $PackageJson.scripts.lint = "next lint"
    $PackageJson.scripts.typecheck = "tsc --noEmit"
    
    # Remove legacy dependencies (keep only what's needed for Next.js)
    $DepsToRemove = @(
        "@emotion/react", "@emotion/styled",
        "@mui/icons-material", "@mui/material",
        "@vercel/analytics",
        "bcryptjs", "cors", "express", "form-data",
        "jsonwebtoken", "mongodb", "multer",
        "node-fetch", "pdf-parse", "pdf2json",
        "react-scripts", "web-vitals"
    )
    foreach ($dep in $DepsToRemove) {
        if ($PackageJson.dependencies.PSObject.Properties.Name -contains $dep) {
            $PackageJson.dependencies.PSObject.Properties.Remove($dep)
        }
    }
    
    # Remove legacy devDependencies
    $DevDepsToRemove = @("@types/bcryptjs", "@types/jest", "ts-node")
    foreach ($dep in $DevDepsToRemove) {
        if ($PackageJson.devDependencies.PSObject.Properties.Name -contains $dep) {
            $PackageJson.devDependencies.PSObject.Properties.Remove($dep)
        }
    }
    
    # Remove proxy (not needed for static export)
    $PackageJson.PSObject.Properties.Remove("proxy")
    
    # Remove legacy config
    $PackageJson.PSObject.Properties.Remove("eslintConfig")
    $PackageJson.PSObject.Properties.Remove("browserslist")
    
    $PackageJson | ConvertTo-Json -Depth 10 | Set-Content "$TargetDir\package.json"
}

# Create a clean README for the new repo
Write-Host "  Creating new README..." -ForegroundColor Gray
$ReadmeLines = @(
    "# Grappling Primitives",
    "",
    "A modern, mobile-first BJJ skill matrix and training tools platform.",
    "",
    "## 🚀 Quick Start",
    "",
    "```bash",
    "# Install dependencies",
    "npm install",
    "",
    "# Start development server",
    "npm run dev",
    "",
    "# Build for production",
    "npm run build",
    "```",
    "",
    "## 🏗️ Architecture",
    "",
    "- **Framework**: Next.js 16 (App Router)",
    "- **Styling**: Tailwind CSS + shadcn/ui",
    "- **Language**: TypeScript",
    "- **Deployment**: Cloudflare Pages",
    "- **Media Storage**: Cloudflare R2",
    "",
    "## 📊 Features",
    "",
    "- Interactive 2×2 Concept Matrix",
    "- Training Games Hub",
    "- Flash Cards",
    "- Visual Notes",
    "- Belt Dropout Visualization",
    "- GIF Training Library (900+ GIFs)",
    "- And more...",
    "",
    "## 🚀 Deployment",
    "",
    "Deployed to Cloudflare Pages with R2 for media storage.",
    "",
    "See `DEPLOYMENT_PLAN.md` and `MIGRATION_PLAN.md` for setup details.",
    "",
    "## 📁 Project Structure",
    "",
    "```",
    "grapplingprimitives/",
    "├── src/",
    "│   ├── app/              # Next.js App Router pages",
    "│   ├── components/       # React components",
    "│   ├── data/            # Module definitions and data",
    "│   └── config/         # Configuration utilities",
    "├── public/",
    "│   ├── images/         # Static images",
    "│   └── data/           # JSON data files",
    "└── scripts/            # Utility scripts",
    "```",
    "",
    "## 📄 License",
    "",
    "MIT License"
)
Set-Content "$TargetDir\README.md" $ReadmeLines

Write-Host ""
Write-Host "✅ Copy complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. cd $TargetDir"
Write-Host "2. npm install"
Write-Host "3. npm run build  # Test build"
Write-Host "4. git init"
Write-Host "5. git add ."
Write-Host "6. git commit -m 'Initial commit: Grappling Primitives'"
Write-Host "7. Create GitHub repo: GrapplingPrimitives"
Write-Host "8. git remote add origin <github-url>"
Write-Host "9. git push -u origin main"
Write-Host ""

