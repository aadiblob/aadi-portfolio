# Portfolio V3.9.2 — Stationary Shaft Guard

This patch keeps the bolted shaft-guard/support flange stationary during Engage mode.

## Changed

- Removed occurrence index 17 from the rotating drive train.
- The drive shaft and pulley still rotate together.
- Rotors, rotor shafts, and timing gears remain synchronized.
- The guard still separates correctly during the exploded-view animation.
- No GLB, material, airflow, camera, or layout changes.

## Install

```bash
unzip -o portfolio-v3.9.2-stationary-shaft-guard.zip -d .
rm -rf .next
npm run dev
```
