# Next.js Art Portfolio - Troubleshooting Guide

## Quick Fix for Common Issues

If you encounter build or compilation issues, run one of these commands:

### Option 1: Quick Cache Clear
```bash
npm run clean:cache
npm run dev
```

### Option 2: Full Reset
```bash
npm run clean
```

### Option 3: Manual PowerShell Cleanup
```powershell
.\cleanup.ps1
```

## Prevention Steps

### 1. OneDrive Exclusions
Run this once to exclude build folders from OneDrive sync:
```powershell
.\exclude-from-onedrive.ps1
```

### 2. Environment Setup
1. Copy `.env.example` to `.env.local`
2. Fill in your actual API keys and configuration

### 3. Regular Maintenance
- After pulling changes: `npm run clean:cache`
- After updating dependencies: `npm run clean`
- If TypeScript errors persist: Restart VS Code TypeScript server (Ctrl+Shift+P → "TypeScript: Restart TS Server")

## Common Issues & Solutions

### "JSX element implicitly has type 'any'"
**Cause:** TypeScript configuration or React types conflict
**Solution:** 
```bash
npm run clean:cache
# Restart VS Code or TypeScript server
```

### "EINVAL: invalid argument, readlink"
**Cause:** OneDrive sync conflict with build files
**Solution:**
```bash
npm run clean:cache
.\exclude-from-onedrive.ps1
```

### Server hanging on compilation
**Cause:** File system watchers or cache issues
**Solution:**
```bash
# Kill any Node processes
Get-Process -Name "node" | Stop-Process -Force
npm run clean
```

### Module resolution errors
**Cause:** Conflicting dependencies or cache corruption
**Solution:**
```bash
npm run clean
```

## Development Workflow

1. **Starting development:**
   ```bash
   npm run dev
   ```

2. **If issues occur:**
   ```bash
   npm run clean:cache
   npm run dev
   ```

3. **For persistent issues:**
   ```bash
   npm run clean
   ```

## File Structure to Keep Clean

These folders should be excluded from version control and OneDrive:
- `node_modules/`
- `.next/`
- `build/`
- `dist/`
- `.vercel/`
- `*.tsbuildinfo`
- `sanity/node_modules/`
- `sanity/dist/`

## VS Code Settings

Add these to your VS Code workspace settings (`.vscode/settings.json`):
```json
{
  "typescript.preferences.includePackageJsonAutoImports": "off",
  "typescript.suggest.autoImports": false,
  "files.watcherExclude": {
    "**/node_modules/**": true,
    "**/.next/**": true,
    "**/build/**": true,
    "**/dist/**": true
  }
}
```
