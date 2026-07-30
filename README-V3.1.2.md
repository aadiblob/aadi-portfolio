# Portfolio V3.1.2 — Build Pipeline Stabilization

This patch removes the unused Tailwind/PostCSS native pipeline and keeps the existing custom CSS unchanged.

Changes:
- Removes `@import "tailwindcss"` from `src/app/globals.css`.
- Removes Tailwind packages from `package.json`.
- Uses an empty PostCSS configuration.
- Enables Next.js Webpack build-worker and memory optimizations.
- Caps each Node build process at a 2 GB heap.
- Narrows TypeScript scanning to the real source/config files.

After extracting at the repository root, run:

```bash
rm -rf .next .open-next node_modules
npm install --include=optional
npm run build
```
