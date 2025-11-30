# Grappling Primitives Development Server - PowerShell Version
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Grappling Primitives Development Server" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Clear ESLint cache to prevent permission issues
Write-Host "Clearing ESLint cache..." -ForegroundColor Yellow
try {
    if (Test-Path "node_modules\.cache\.eslintcache") {
        Remove-Item "node_modules\.cache\.eslintcache" -Force -ErrorAction Stop
        Write-Host "✓ ESLint cache cleared" -ForegroundColor Green
    } else {
        Write-Host "✓ No ESLint cache found" -ForegroundColor Green
    }
    
    if (Test-Path "node_modules\.cache") {
        Remove-Item "node_modules\.cache" -Recurse -Force -ErrorAction Stop
        Write-Host "✓ Cache directory cleared" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠ Warning: Could not clear cache: $($_.Exception.Message)" -ForegroundColor Yellow
}

# Set environment variables to disable ESLint issues
$env:DISABLE_ESLINT_PLUGIN = "true"
$env:ESLINT_NO_DEV_ERRORS = "true"
$env:NODE_ENV = "development"
$env:GENERATE_SOURCEMAP = "false"

Write-Host ""
Write-Host "Environment variables set:" -ForegroundColor Yellow
Write-Host "- DISABLE_ESLINT_PLUGIN=true" -ForegroundColor Gray
Write-Host "- ESLINT_NO_DEV_ERRORS=true" -ForegroundColor Gray
Write-Host "- NODE_ENV=development" -ForegroundColor Gray
Write-Host "- GENERATE_SOURCEMAP=false" -ForegroundColor Gray
Write-Host ""

Write-Host "Starting Next.js development server..." -ForegroundColor Green
Write-Host "(Press Ctrl+C to stop)" -ForegroundColor Gray
Write-Host ""

try {
    npm run dev
} catch {
    Write-Host "Error starting server: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "Server stopped. Press any key to exit..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
