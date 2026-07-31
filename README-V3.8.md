# Portfolio V3.8 — Exploded View Cleanup

This root-flat patch makes two focused changes to the Roots supercharger interaction:

- Moves the Explode/Assemble control inside the 3D viewer so it remains visually attached to the assembly in both states.
- Hides two unnamed, sub-5 mm Onshape export occurrences that appeared as floating fastener-like artifacts beside the timing gears.

## Files changed

- `src/components/SuperchargerSpotlight.tsx`
- `src/components/SuperchargerSpotlight.module.css`
- `src/components/SuperchargerModel.tsx`

No GLB replacement or dependency installation is required.
