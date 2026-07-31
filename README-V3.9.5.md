# Portfolio V3.9.5 — Final V3 Accuracy Pass

Changes:
- Replaces the V1 CAD placeholder with the clean-sheet Onshape design story.
- Corrects the wheel load case: rear mounting face fixed, 1000 N bearing load on the inner barrel in the model Y direction.
- Updates the load overlay labels to match the actual boundary conditions.
- Swaps the supercharger timing gears and seal/shield exploded positions so the gears sit behind the sealing plate.

Apply from the repository root:

```bash
unzip -o portfolio-v3.9.5-wheel-copy-load-explode-order.zip -d .
rm -rf .next
npm run dev
```

No dependency installation is required.
