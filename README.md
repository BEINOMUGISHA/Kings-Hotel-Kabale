# Kings Hotel Kabale — Official Website

Official website for **Kings Hotel Kabale** located in Kigongi, Kabale Municipality, Western Uganda.

Features comprehensive hotel room reservations, restaurant dining showcase, Google Maps location integration, verified Google & TripAdvisor review highlights, and Lake Bunyonyi / Bwindi gorilla tracking safari inquiry assistance.

---

## 🚀 Dual Hosting: Vercel & GitHub Pages

This project is configured out of the box to run simultaneously on **both Vercel and GitHub Pages** with zero manual configuration changes needed.

### 1. Deploying to Vercel (Fast & Global CDN)

#### Option A: Import via Vercel Dashboard (Easiest)
1. Push your repository to GitHub.
2. Log in to [vercel.com](https://vercel.com) and click **"Add New..."** > **"Project"**.
3. Select your GitHub repository (`kings-hotel-kabale`).
4. Vercel will automatically detect:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **"Deploy"**. Your site will be live within 30 seconds with a free `.vercel.app` domain and instant global SSL.

#### Option B: Deploy via Vercel CLI
```bash
npm install -g vercel
vercel
```

*Note: The included `vercel.json` file automatically configures SPA routing rewrites to `/index.html` and sets high-performance caching headers for all images and CSS/JS chunks.*

---

### 2. Deploying to GitHub Pages (Free GitHub Native Hosting)

#### Option A: One-Command Deployment with `gh-pages` (Simplest & Fastest)
Run:
```bash
npm run deploy
```
This automatically builds the project and publishes the `dist` folder to the `gh-pages` branch.
Then in your GitHub repository:
1. Go to **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
3. Select branch `gh-pages` / folder `/ (root)` and click **Save**.
Your website will be live at `https://<your-username>.github.io/<repo-name>/`!

#### Option B: GitHub Actions Workflow (Directly via GitHub Web UI)
If you prefer GitHub Actions to auto-deploy on every commit:
1. Go to your repository on GitHub.com.
2. Click **Actions** > **New workflow** > **set up a workflow yourself**.
3. Name it `.github/workflows/deploy.yml` and paste:
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: ["main"]
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: "pages"
  cancel-in-progress: false
jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - uses: actions/configure-pages@v5
        id: pages
      - run: npm ci || npm install
      - run: npm run build
        env:
          VITE_BASE_PATH: ${{ steps.pages.outputs.base_path }}
      - uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - id: deployment
        uses: actions/deploy-pages@v4
```
4. Click **Commit changes**.
5. Under **Settings** > **Pages**, ensure Source is set to **GitHub Actions**.

---

## 🔒 100% API-Free & Keyless Architecture

- **No Google Maps API Key**: Powered by open-source **OpenStreetMap** with **Leaflet**.
- **No Cloud Backend or Database Required**: The entire site is pre-rendered and static.
- **Zero Ongoing Costs**: Completely free to run on GitHub Pages or Vercel indefinitely.
- **Zero Rate Limits**: OpenStreetMap tiles stream freely without monthly quotas.

---

## 🛠️ How Dual Compatibility Works Under the Hood

1. **Dynamic Base Path (`vite.config.ts`)**:
   - When building on **Vercel** (`process.env.VERCEL`), Vite uses root path `/` for canonical routes.
   - When building on **GitHub Pages**, Vite uses the repository path from `actions/configure-pages` or `./` (relative path), preventing any broken asset or image paths.
2. **SPA Routing Fallback**:
   - **Vercel**: Handled via `vercel.json` rewrite rules (`"source": "/(.*)", "destination": "/index.html"`).
   - **GitHub Pages**: Handled via Vite plugin copying `dist/index.html` to `dist/404.html`.
3. **Asset Resolution (`src/data/hotelData.ts`)**:
   - All hotel photos, menus, and room images use `resolveAsset()`, which dynamically prefixes paths using Vite's `import.meta.env.BASE_URL`.
4. **Jekyll Bypass**:
   - `public/.nojekyll` prevents GitHub Pages from ignoring directories starting with an underscore or dot.

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start Vite development server (port 3000)
npm run dev

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```
