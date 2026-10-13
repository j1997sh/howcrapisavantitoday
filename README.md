# How Crap Is Avanti Today? — Version 2

An independent, satirical, emoji-free dashboard for GitHub Pages.

## Deploy to GitHub

1. Upload **all contents of this folder** to the repository root on the `main` branch, including `.github/workflows/publish.yml`. On macOS, hidden `.github` folders may not show in Finder; use Command+Shift+Period to reveal them.
2. Go to repository **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Open **Actions → Publish website → Run workflow** (or push a change to `main`).
4. Visit `https://j1997sh.github.io/howcrapisavantitoday/` after deployment completes.

## Data integrity

The GitHub Actions workflow checks whether Avanti's official live status page is reachable every 15 minutes and publishes a status snapshot. It **does not scrape or calculate train-level disruption statistics**. Dashboard metrics, historical statistics and route scores deliberately remain unavailable until a suitable authorised free service-level feed is integrated. A reachable page is not evidence of trains running on time.

GitHub's scheduled workflows may run late. Free usage is subject to GitHub's terms and limits.

## Files

- `public/` — GitHub Pages site
- `scripts/update.py` — source availability check
- `.github/workflows/publish.yml` — scheduled update and deployment

No Node.js installation or API keys needed for this version.
