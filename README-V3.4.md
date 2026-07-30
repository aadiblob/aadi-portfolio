# Portfolio V3.4 — Supercharger Axis Correction

This root-flat patch changes only `src/components/SuperchargerModel.tsx`.

## Fix

- Remaps the incorrect Onshape export axes before OrbitControls sees the model.
- Makes the assembly's true vertical direction match world Y.
- Uses a conventional three-quarter hero camera.
- Keeps full 360-degree horizontal turntable rotation.
- Allows a wider but still controlled top/bottom inspection range.
- Double-click still restores the corrected hero view.
- Preserves all V3.2 materials and colors.

No model re-export or dependency installation is required.
