# Pakistan School of Excellence

Static site for Pakistan School of Excellence. This repository contains a small static HTML/CSS/JS site.

How to publish to GitHub Pages

1. Install Git: https://git-scm.com/download/win
2. (Optional) Install GitHub Desktop: https://desktop.github.com/
3. In PowerShell (after installing Git) run the `push_to_github.ps1` script included in this repo to initialize and push the project.

```powershell
.\tools\push_to_github.ps1 -RepoUrl "https://github.com/YOUR_USERNAME/YOUR_REPO.git"
```

Notes
- The repo contains a GitHub Actions workflow `.github/workflows/pages.yml` that deploys the repository root to GitHub Pages when you push to `main`.
- If the repo is private, GitHub Pages may require specific settings or a workflow-based deployment — this workflow will work on public repos.

If you want, tell me when you've pushed and I will verify the Pages deployment.
