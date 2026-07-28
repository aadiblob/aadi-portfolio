# Portfolio V2 — Design System Preview

This patch replaces the first portfolio experience with the approved minimal direction:

- Minimal fixed navigation
- Large typographic hero
- Selected-work index
- Full-screen interactive Wheel V3 reveal
- V1/V3 interactive geometry toggle
- Current ANSYS maximum-principal-stress comparison
- Minimal about/footer sections

## Apply in GitHub Codespaces

From the repository root, after uploading `portfolio-v2-update.zip`:

```bash
unzip -o portfolio-v2-update.zip -d .
npm install
npm run dev
```

Open port 3000 in the Ports panel.

When approved:

```bash
git add .
git commit -m "Redesign portfolio and add interactive wheel"
git push
```

Cloudflare should deploy automatically.

## Deliberately not finalized yet

- Wheel mass values: waiting for final confirmed V1/V3 values.
- Load case / constraints / mesh: next wheel case-study section.
- ANSYS stress contour mapping: next engineering-visualization pass.
- Resume, email, LinkedIn and GitHub links still use placeholders unless you already replaced them.
