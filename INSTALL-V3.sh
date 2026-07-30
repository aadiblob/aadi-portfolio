#!/usr/bin/env bash
set -euo pipefail

# Remove source files and extracted folders from the failed V2.12 experiment.
rm -f src/components/SuperchargerSection.tsx
rm -f src/components/SuperchargerSection.module.css
rm -f src/components/SuperchargerModelClient.tsx
rm -rf public/models/supercharger
find . -maxdepth 1 -type d \( -name 'portfolio-v2*' -o -name 'portfolio-v3*' \) -exec rm -rf {} +

# Clear generated output only; source and Git history are preserved.
rm -rf .next .open-next

echo "Portfolio V3 Stage 1 installed."
echo "Next: npm run build && npm run dev"
