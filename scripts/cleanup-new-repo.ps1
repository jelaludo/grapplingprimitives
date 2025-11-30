# Cleanup script for new GrapplingPrimitives repository
# Run this AFTER copying files to the new repo

$RepoDir = Get-Location

Write-Host "🧹 Cleaning up new repository..." -ForegroundColor Cyan
Write-Host "Working directory: $RepoDir"
Write-Host ""

# Update package.json
if (Test-Path "package.json") {
    Write-Host "  Updating package.json..." -ForegroundColor Gray
    $PackageJson = Get-Content "package.json" -Raw | ConvertFrom-Json
    
    # Update name and version
    $PackageJson.name = "grapplingprimitives"
    $PackageJson.version = "1.0.0"
    
    # Clean up scripts - keep only essential ones
    $PackageJson.scripts = @{
        "dev" = "next dev"
        "build" = "next build"
        "start" = "next start"
        "lint" = "next lint"
        "typecheck" = "tsc --noEmit"
    }
    
    # Remove proxy (not needed for static export)
    if ($PackageJson.PSObject.Properties.Name -contains "proxy") {
        $PackageJson.PSObject.Properties.Remove("proxy")
    }
    
    # Remove legacy config
    if ($PackageJson.PSObject.Properties.Name -contains "eslintConfig") {
        $PackageJson.PSObject.Properties.Remove("eslintConfig")
    }
    if ($PackageJson.PSObject.Properties.Name -contains "browserslist") {
        $PackageJson.PSObject.Properties.Remove("browserslist")
    }
    
    # Save updated package.json
    $PackageJson | ConvertTo-Json -Depth 10 | Set-Content "package.json"
    Write-Host "    ✅ Updated name, version, and scripts" -ForegroundColor Green
} else {
    Write-Host "    ⚠️  package.json not found" -ForegroundColor Yellow
}

# Remove Vercel files
Write-Host "  Removing Vercel files..." -ForegroundColor Gray
Remove-Item "vercel.json" -ErrorAction SilentlyContinue
Remove-Item ".vercel" -Recurse -Force -ErrorAction SilentlyContinue
Write-Host "    ✅ Removed Vercel configuration" -ForegroundColor Green

# Ensure .gitignore has correct entries
Write-Host "  Updating .gitignore..." -ForegroundColor Gray
$GitignorePath = ".gitignore"
if (Test-Path $GitignorePath) {
    $GitignoreContent = Get-Content $GitignorePath -Raw
    $NeedsUpdate = $false
    
    if ($GitignoreContent -notmatch "\.vercel/") {
        Add-Content $GitignorePath "`n# Vercel (migrated to Cloudflare)`n.vercel/`n.vercelignore"
        $NeedsUpdate = $true
    }
    
    if ($NeedsUpdate) {
        Write-Host "    ✅ Updated .gitignore" -ForegroundColor Green
    } else {
        Write-Host "    ✅ .gitignore already up to date" -ForegroundColor Green
    }
} else {
    Write-Host "    ⚠️  .gitignore not found" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "✅ Cleanup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. npm install"
Write-Host "2. npm run build  # Test build"
Write-Host "3. git init"
Write-Host "4. git add ."
Write-Host "5. git commit -m 'Initial commit: Grappling Primitives'"
Write-Host ""

