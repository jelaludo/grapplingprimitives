# Setup Local Environment Variables
# This script creates a .env.local file with a generated JWT_SECRET

Write-Host "Setting up local environment variables..." -ForegroundColor Cyan

$envFile = ".env.local"

# Check if .env.local already exists
if (Test-Path $envFile) {
    Write-Host "⚠ .env.local already exists. Skipping creation." -ForegroundColor Yellow
    Write-Host "If you need to regenerate JWT_SECRET, delete .env.local and run this script again." -ForegroundColor Gray
    exit
}

# Generate JWT_SECRET
Write-Host "Generating JWT_SECRET..." -ForegroundColor Yellow
$jwtSecret = node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Create .env.local file content
$lines = @(
    "# Local Development Environment Variables",
    "# This file is gitignored and will not be committed",
    "",
    "# JWT Secret for beta authentication (auto-generated)",
    "JWT_SECRET=$jwtSecret",
    "",
    "# MongoDB URI (optional - only needed if using MongoDB features)",
    "# Uncomment and fill in when needed:",
    "# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority&appName=AppName",
    "# MONGODB_DB=BJJSkillMatrix",
    "",
    "# Beta Password Hashes (optional - for beta authentication)",
    "# BETA_PASSWORD_HASHES=hash1,hash2,hash3"
)

Set-Content -Path $envFile -Value $lines

Write-Host "✓ Created .env.local with generated JWT_SECRET" -ForegroundColor Green
Write-Host ""
Write-Host "You can now run:" -ForegroundColor Cyan
Write-Host "  node server.js" -ForegroundColor White
Write-Host "or" -ForegroundColor Cyan
Write-Host "  npm run dev" -ForegroundColor White
