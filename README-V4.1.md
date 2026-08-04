# Portfolio V4.1 — Aircraft CFD Dark Rebuild

This patch removes the white presentation-slide treatment from the aircraft CFD section.

Changes:
- Removed the large hero mesh image beside the project title.
- Replaced it with a dark, native study-overview data rail.
- Rebuilt the initial assumptions table as semantic HTML on a black background.
- Removed the blurry NACA 23012 source image and replaced it with a clean text/data treatment.
- Reduced the DesignModeler screenshot and placed it inside a dark technical frame.
- Removed white image and caption backgrounds from the mesh stage.
- Preserved all existing stage navigation and motion behavior.

Apply from the repository root:

```bash
unzip -o portfolio-v4.1-aircraft-dark-rebuild.zip -d .
rm -rf .next
npm run dev
```
