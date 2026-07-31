# Portfolio V3.9.3 — Stationary Guard + Hero Image Restore

## Fixes

- Keeps the combined drive-shaft / bolted guard occurrence stationary during Engage mode.
- Continues rotating the separately exported pulley, rotors, rotor shafts, and timing gears.
- Restores `public/images/angels-landing.webp`.
- Serves the hero image directly with `unoptimized` so it does not depend on the Next.js image optimizer in Codespaces or Cloudflare.

## Install

```bash
unzip -o portfolio-v3.9.3-stationary-guard-hero-fix.zip -d .
rm -rf .next
npm run dev
```
