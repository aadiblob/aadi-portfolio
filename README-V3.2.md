# Portfolio V3.2 — Supercharger Material Tuning

This root-flat patch only replaces `src/components/SuperchargerModel.tsx`.

Changes:
- housing changed from overexposed white to machined silver-gray
- gold rotor/shaft components retained
- belt-drive, gears, pulley, and dark accessories rendered charcoal gray
- secondary hardware receives separate mid-gray material tiers
- lighting/exposure rebalanced to match the wheel viewer more closely
- no exploded animation included yet

Apply from the repository root:

```bash
unzip -o portfolio-v3.2-supercharger-material-tuning.zip -d .
rm -rf .next
npm run dev
```
