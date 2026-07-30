# Portfolio V3 — Stage 1

This build starts the Roots Supercharger case study using the same stable Three.js rendering pattern as the wheel model.

## Added
- Interactive 360-degree supercharger assembly
- Slow auto-rotation until first user interaction
- Drag rotation and scroll zoom
- World-space recentering after the presentation rotation
- Responsive desktop/mobile layout
- Selected Work link to the new section

## Web-model optimization
The supplied assembly was converted into a presentation-only GLB for this first stage:
- Source GLB: approximately 7.66 MB
- V3 web GLB: approximately 5.70 MB
- The displayed geometry is merged because Stage 1 only needs a complete rotating assembly
- The original separated source remains the basis for the later exploded animation

## Intentionally not included yet
- Exploded animation
- Rotor animation
- CFD data or contours
- Unverified dimensions or performance claims

## Install
Extract this archive at the repository root beside `package.json`, then run:

```bash
bash INSTALL-V3.sh
npm run build
npm run dev
```

No new dependency was added, so `npm install` is not required when the current stable portfolio already runs.

The archive is root-flat. It does not contain a nested portfolio folder.
