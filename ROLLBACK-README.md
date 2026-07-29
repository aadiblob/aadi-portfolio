# Stable rollback — Portfolio V2.11

This package restores the last stable homepage and wheel viewer before the supercharger section.
It preserves the current `package.json`, `package-lock.json`, and installed dependencies.

After unzipping into the repository root, run:

```bash
bash ROLLBACK-TO-V2.11.sh
npm run dev
```

Expected stable features:
- Angels Landing hero/about layout
- Repeating Selected Work waterfall
- Centered wheel spotlight
- Unified V1/V3 CAD / Bearing Load / Mesh / Principal Stress viewer
- V1 mass: 10.37 kg
- Design Practice heading removed
- No supercharger section on the homepage
