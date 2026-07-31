# Portfolio V3.9.4 — Stationary Silver Guard

This patch targets the exact silver bolted guard/flange shown in the latest screenshot.

## Change
- Occurrence 10 (silver guard/flange) is excluded from the engaged rotation.
- Occurrence 12 (concentric drive shaft + black pulley geometry) rotates instead.
- Exploded-view offsets and all other rotor/gear motion are unchanged.

## Apply
```bash
unzip -o portfolio-v3.9.4-stationary-silver-guard.zip -d .
rm -rf .next
npm run dev
```
