# Thomas John — Portfolio

Personal portfolio site. React + Vite, client-side routed, content driven from a single JSON file.

**Live:** _add your URL here once deployed_

---

## Run it locally

```bash
npm install
npm run dev
```

Opens on `http://localhost:5173`.

```bash
npm run build     # production build into dist/
npm run preview   # preview the production build locally
```

---

## How it's put together

```
src/
  data/projects.json     ← all project content lives here
  pages/Home.jsx         ← landing page: hero, work rows, side projects, stack
  pages/Project.jsx      ← the case-study page (one component, all projects)
  pages/NotFound.jsx
  components/            ← Header, Footer, Chips, SectionHead
  hooks/useTheme.js      ← light/dark, remembers your choice
  hooks/useReveal.js     ← scroll-in animations
  styles.css             ← design tokens + all styling
```

Routes:

| Path | Page |
|---|---|
| `/` | Home |
| `/work/:slug` | Project case study |
| anything else | 404 |

---

## Adding or editing a project

Everything is in **`src/data/projects.json`**. No component changes needed — the
homepage rows and the case-study page both render from this file, and prev/next
navigation is derived from array order.

```jsonc
{
  "slug": "my-project",          // becomes /work/my-project
  "num": "09",
  "group": "work",               // "work" (Corestrat rows) or "side" (personal cards)
  "name": "My Project",
  "status": "live",              // "live" = accent badge, anything else = grey
  "statusLabel": "Live",
  "kicker": "Live · 2026",       // small label, side projects only
  "short": "One-line summary shown on the homepage.",
  "tags": "Python · FastAPI",    // right-hand column on work rows (HTML allowed)
  "sub": "Longer intro shown under the title on the project page.",
  "chips": ["FastAPI", "Redis"], // side-project card chips
  "facts":   [{ "k": "Role", "v": "Backend engineer" }],
  "metrics": [{ "v": "95%", "k": "faster runs" }],
  "role": "What I did, one or two sentences.",
  "stack": ["Python", "FastAPI"],
  "links": [{ "label": "Visit →", "href": "https://example.com" }],
  "note": "Internal product — happy to walk through it on a call.",
  "doc": "<h2>What it is</h2><p>Full case study as HTML…</p>"
}
```

The `doc` field accepts the styling already in `styles.css`:

- `<h2>` — small uppercase section label
- `<h3>` — bold sub-heading
- `<p>`, `<ul><li>`, `<ol><li>`
- `<div class="arch">` — the monospace architecture diagram box (`<b>` node, `<i>` arrow)
- `<div class="pull"><p>…</p></div>` — accent-bar callout

## Changing the look

All colours, both themes, live at the top of `src/styles.css` as CSS variables.
Change `--accent` and the whole site follows.

---

## Deploying

### Vercel (easiest)

1. Push this repo to GitHub.
2. On vercel.com → **Add New → Project** → import the repo.
3. Framework preset: **Vite**. Everything else is auto-detected. Deploy.

`vercel.json` already handles the SPA rewrite so `/work/finsight` resolves on a hard refresh.

### Netlify

Same flow — `netlify.toml` sets the build command, publish directory and redirect.

### GitHub Pages

A workflow is included at `.github/workflows/deploy.yml`.

1. Push to `main`.
2. Repo **Settings → Pages → Source: GitHub Actions**.
3. Done — it builds and deploys on every push.

**If this is a project site** (`github.com/tojonoy/portfolio` → `tojonoy.github.io/portfolio/`)
you must set the base path, or assets 404. Uncomment the `env` block in the workflow:

```yaml
      env:
        BASE: /portfolio/
      - run: npm run build
```

**If this is a user site** (repo named `tojonoy.github.io`) leave it as-is — base is `/`.

`npm run build` also writes `dist/404.html`, which is how GitHub Pages serves
client-side routes.

---

## First push

```bash
git init
git add .
git commit -m "Portfolio site"
git branch -M main
git remote add origin https://github.com/tojonoy/portfolio.git
git push -u origin main
```
