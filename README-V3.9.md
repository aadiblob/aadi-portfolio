# Portfolio V3.9 — Supercharger Engage Mode

This root-flat update builds on V3.8 and changes only the supercharger component files.

## Added

- A black-and-white `ENGAGE` button beside `EXPLODE` in the assembled view.
- `ENGAGE` is available only while the supercharger is assembled.
- Clicking `EXPLODE` automatically stops the mechanism first.
- The two lobed rotors spin at equal speed in opposite directions.
- Both timing gears, both rotor shafts, the drive shaft, couplings, and pulley rotate with the correct rotor line.
- Smooth acceleration and deceleration instead of an instant on/off motion.
- The snout housing, front cover, and timing-drive bracket fade translucent during engagement.
- A subtle pale-blue airflow streak animation moves from the top inlet toward the lower side of the rotor chamber.
- The airflow is a conceptual visualization, not CFD data.

## Preserved

- V3.8 exploded animation and assembly control placement.
- V3.6 desktop right shift.
- V3.4 corrected model axes and turntable behavior.
- V3.2 metallic material hierarchy.
- The source GLB is unchanged.

## Install

From the repository root:

```bash
unzip -o portfolio-v3.9-supercharger-engage.zip -d .
rm -rf .next
npm run dev
```

No `npm install` is required.

## Test

1. Keep the model assembled and click `ENGAGE`.
2. Confirm the rotors and timing drive accelerate smoothly.
3. Confirm the snout/front structures fade without the full housing disappearing.
4. Confirm the airflow streaks travel from the inlet toward the bottom of the chamber.
5. Click `STOP` and confirm the mechanism decelerates smoothly.
6. Click `EXPLODE` and confirm engage mode stops and the exploded view still works.
7. Click `ASSEMBLE` and confirm `ENGAGE` returns.
