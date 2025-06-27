# PowerShell script to exclude build folders from OneDrive sync
# Run this script as Administrator to prevent OneDrive sync issues

Write-Host "Excluding build folders from OneDrive sync..." -ForegroundColor Green

# Get the current directory
$projectPath = Get-Location

# Folders to exclude from OneDrive sync
$foldersToExclude = @(
    "node_modules",
    ".next",
    "build",
    "dist",
    ".vercel",
    "coverage",
    "sanity\node_modules",
    "sanity\dist",
    "sanity\.sanity"
)

# Set OneDrive exclusions
foreach ($folder in $foldersToExclude) {
    $fullPath = Join-Path $projectPath $folder
    if (Test-Path $fullPath) {
        try {
            # Set the folder to not sync with OneDrive
            Set-ItemProperty -Path $fullPath -Name Attributes -Value ([System.IO.FileAttributes]::Directory -bor [System.IO.FileAttributes]::NotContentIndexed)
            Write-Host "✓ Excluded: $folder" -ForegroundColor Green
        }
        catch {
            Write-Host "⚠ Could not exclude: $folder - $($_.Exception.Message)" -ForegroundColor Yellow
        }
    }
    else {
        Write-Host "→ Folder doesn't exist yet: $folder" -ForegroundColor Gray
    }
}

Write-Host "`nDone! These folders will be excluded from OneDrive sync." -ForegroundColor Green
Write-Host "Note: If folders are created later, run this script again." -ForegroundColor Yellow
