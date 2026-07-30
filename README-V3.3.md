# Portfolio V3.3 — Supercharger Turntable Controls

This root-flat patch only replaces `src/components/SuperchargerModel.tsx`.

Changes:
- full 360-degree horizontal rotation remains available
- vertical orbit is limited to a useful engineering viewing range
- slower rotation sensitivity and smoother damping
- slightly calmer automatic rotation
- double-click resets the camera to the default hero orientation
- material tuning from V3.2 is preserved
- no exploded animation added yet

Apply from the repository root:

```bash
unzip -o portfolio-v3.3-supercharger-turntable-controls.zip -d .
rm -rf .next
npm run dev
```
