# 💩 How Crap Is Avanti Today?

Unofficial, sarcastic Avanti West Coast disruption-notice dashboard, designed for **GitHub Pages** and **GitHub Actions**, without a paid API or server.

## Publish on GitHub

1. Create a **public** GitHub repository and upload the **contents of this folder** to its `main` branch (including `.github/workflows/publish.yml`).
2. In repository **Settings → Pages → Build and deployment**, select **GitHub Actions**.
3. Go to **Actions → Update data and publish GitHub Pages → Run workflow** to publish immediately.
4. Open the Pages URL shown in the workflow deployment or Settings → Pages. Typically `https://USERNAME.github.io/REPOSITORY/`.

GitHub Actions attempts to fetch new data **every five minutes** and republishes the static site. GitHub scheduled workflows can run late or be disabled on inactive repositories. The browser checks the published JSON every two minutes; it does **not** fetch Avanti directly. The timestamp makes old snapshots visible. GitHub Actions/Pages free usage and eligibility depend on GitHub's current terms.

## Local development

```bash
npm install
npm run update
python3 -m http.server 8000 --directory public
```

Open `http://localhost:8000/`. Node.js 20+ required.

## Data limitations

- Scrapes Avanti's **public status page**, which may change markup, block bots, or restrict automated access. Check the website's terms before public deployment. This is **not** an official API or a guaranteed reliable data source.
- The scraper detects only **train-specific notices it can parse**. A zero count may mean *no parsed notices*, not zero disruption.
- Notice counts are **not** percentages of all Avanti trains. The humorous verdict is **not** a measured reliability score.
- No route leaderboard or true punctuality statistics are claimed. These require comprehensive service-level data.
- When a fetch fails, the last published snapshot remains, and the site shows its age. Initial JSON is an explicitly marked placeholder.
- This is an unofficial parody project and not affiliated with Avanti West Coast. Always verify travel with official sources.
