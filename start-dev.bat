@echo off
echo ========================================
echo Grappling Primitives Development Server
echo ========================================
echo.

REM Clear ESLint cache to prevent permission issues
echo Clearing ESLint cache...
if exist "node_modules\.cache\.eslintcache" (
    del /f /q "node_modules\.cache\.eslintcache" 2>nul
    echo ✓ ESLint cache cleared
) else (
    echo ✓ No ESLint cache found
)

REM Clear entire cache directory if it exists
if exist "node_modules\.cache" (
    rmdir /s /q "node_modules\.cache" 2>nul
    echo ✓ Cache directory cleared
)

REM Set environment variables to disable ESLint issues
set DISABLE_ESLINT_PLUGIN=true
set ESLINT_NO_DEV_ERRORS=true
set NODE_ENV=development
set GENERATE_SOURCEMAP=false

echo.
echo Environment variables set:
echo - DISABLE_ESLINT_PLUGIN=true
echo - ESLINT_NO_DEV_ERRORS=true
echo - NODE_ENV=development
echo - GENERATE_SOURCEMAP=false
echo.

echo Starting Next.js development server...
echo (Press Ctrl+C to stop)
echo.

npm run dev

echo.
echo Server stopped. Press any key to exit...
pause >nul
