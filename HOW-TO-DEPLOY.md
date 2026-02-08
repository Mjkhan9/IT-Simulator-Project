# Deployment Instructions

## Steps

### 1. Download Your Project
Download the entire project folder and save it somewhere on your computer.

### 2. Run the Deployment Script
1. Open the project folder
2. Right-click on `DEPLOY.ps1`
3. Select "Run with PowerShell"

The script will:
- Initialize git
- Add all files
- Commit with a professional message
- Push to GitHub
- Open GitHub Pages settings

### 3. Enable GitHub Pages
The script opens GitHub Pages settings automatically.

1. Source: **main**
2. Click **Save**
3. Wait 2 minutes
4. Visit: `https://Mjkhan9.github.io/IT-Simulator-Project/`

---

## If PowerShell Won't Run the Script

If you get a security error, run this first:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

Then run `DEPLOY.ps1` again.

---

## URLs

- **Repository**: https://github.com/Mjkhan9/IT-Simulator-Project
- **Live Site**: https://Mjkhan9.github.io/IT-Simulator-Project/
- **Pages Settings**: https://github.com/Mjkhan9/IT-Simulator-Project/settings/pages
