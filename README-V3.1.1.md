# Portfolio V3.1.1 — Webpack Build Fix

This patch changes the production build script from:

```json
"build": "next build"
```

to:

```json
"build": "next build --webpack"
```

Next.js 16 uses Turbopack by default for production builds. The current failure is a Turbopack internal worker crash while processing `globals.css`, not a reported CSS syntax error. Webpack is already used by the stable local development script, so this makes local and Cloudflare production builds use the same bundler.

Apply from the repository root:

```bash
unzip -o portfolio-v3.1.1-webpack-build-fix.zip -d .
rm -rf .next .open-next
npm run build
```
