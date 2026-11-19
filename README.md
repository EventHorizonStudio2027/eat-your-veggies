# Eat Your Veggies 🥦

A gentle, magical, browser-first 3D adventure for young children. **Three.js is the active engine**; earlier Unity prototype code remains in `Assets/` for reference.

## Play locally
Open a local web server from the repository root (ES modules cannot reliably load from `file://`):

```sh
python3 -m http.server 8000
```

Then visit http://localhost:8000. Three.js currently loads from a public CDN, so an internet connection is required on first load.

## Hosting
The repository includes `.github/workflows/deploy-pages.yml` to deploy the root site to GitHub Pages. In repository Settings → Pages, set **Build and deployment → Source → GitHub Actions**. When the deployment succeeds, the expected project URL is `https://fatespassage.github.io/eat-your-veggies/`. That URL is **not verified live** yet.

## Design principles
- Exploration and food discovery are optional. Never require eating, tasting or rewards tied to food consumption.
- No child analytics, ads or child-facing purchases.
- Touch-first, parent-safe, mobile-friendly and accessible.
- Broccoli Forest is an early procedural prototype, not final artwork.

## Active work
See [Docs/ACTIVE_ISSUES.md](Docs/ACTIVE_ISSUES.md).
