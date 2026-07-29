#!/usr/bin/env bash
set -euo pipefail

# Remove only files introduced by the unstable supercharger build.
rm -f src/components/SuperchargerSection.tsx
rm -f src/components/SuperchargerSection.module.css
rm -f src/components/SuperchargerModel.tsx
rm -f PORTFOLIO-V2.12-NOTES.md PORTFOLIO-V2.12.1-NOTES.md
rm -rf public/models/supercharger

# Remove stale build caches; dependencies and lockfile are intentionally preserved.
rm -rf .next

printf '\nRollback cleanup complete. Start the site with:\n  npm run dev\n\n'
