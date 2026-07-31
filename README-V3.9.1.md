# Portfolio V3.9.1 — Rotor Centerline Fix

This patch corrects the engaged supercharger motion without changing the GLB, materials, airflow, transparency, explode behavior, or controls.

## Root cause
The Roots lobes are asymmetric, so their geometry bounding-box centers do not sit exactly on their shaft axes. The earlier animation created each rotation pivot from that bounding-box center, making the lobes orbit slightly and visually intersect.

## Fix
Each rotor, shaft, timing gear, coupling, drive shaft, and pulley now rotates around a pivot derived from its matching cylindrical shaft centerline. The parts remain independently parented, so the existing exploded animation still separates them correctly.

## Apply
```bash
unzip -o portfolio-v3.9.1-rotor-axis-fix.zip -d .
rm -rf .next
npm run dev
```

No package installation is required.
