# Quick cleanup script for Next.js development issues
# Run this when you encounter build or TypeScript issues

Write-Host "🧹 Cleaning Next.js project..." -ForegroundColor Cyan

# Stop any running Next.js processes
Write-Host "Stopping Next.js processes..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowTitle -like "*next*" } | Stop-Process -Force

# Clean build artifacts
Write-Host "Removing build artifacts..." -ForegroundColor Yellow
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .vercel -ErrorAction SilentlyContinue

# Clean TypeScript cache
Write-Host "Cleaning TypeScript cache..." -ForegroundColor Yellow
Remove-Item *.tsbuildinfo -ErrorAction SilentlyContinue

# Clean Sanity build artifacts
Write-Host "Cleaning Sanity artifacts..." -ForegroundColor Yellow
Remove-Item -Recurse -Force sanity\dist -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force sanity\node_modules -ErrorAction SilentlyContinue

# Reinstall dependencies
Write-Host "Reinstalling dependencies..." -ForegroundColor Green
npm install

Write-Host "✅ Cleanup complete! Try running 'npm run dev' now." -ForegroundColor Green
