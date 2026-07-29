# Roots Supercharger — Website Export Guide

## Files to prepare

Place these in one folder before uploading:

```text
Roots_Supercharger_Website/
├── supercharger-assembly.glb
├── supercharger-exploded.glb        # optional separate exploded state
├── supercharger-animated.glb        # preferred if animation is embedded
├── supercharger-hero.png            # clean isometric render
├── supercharger-section.png         # transparent/sectioned housing render
├── supercharger-exploded.png        # reference image
├── cfd-velocity.png
├── cfd-pressure.png
└── project-details.txt
```

## Assembly organization

Keep these as separate named groups/parts in the GLB:

- Housing / shell
- Snout
- Front seal or end plate
- Rear bearing plate
- Front bearing plate
- Left rotor
- Right rotor
- Rotor shafts
- Timing gears
- Bearings
- Pulley
- Fasteners (optional; combine small repeated hardware when possible)

Do not merge the major moving parts into one mesh. Separate part names let the website animate, highlight, hide, and explode them.

## Model cleanup

- Remove threads, tiny chamfers, cosmetic hardware, hidden washers, and duplicate parts that add file size without helping the story.
- Keep the original CAD assembly private; publish only the triangulated GLB.
- Use a consistent assembly origin near the rotor centerline.
- Keep the installed assembly in its true assembled position.
- Export with mesh compression enabled.

## Recommended exploded sequence

1. Pulley and snout move forward along the shaft axis.
2. Front plate and bearings move forward slightly.
3. Housing moves upward or rearward to reveal the rotors.
4. Rotor pair separates laterally by a small amount.
5. Timing gears move outward on the opposite side.
6. Rear plate and bearings move rearward.

The exploded distances should be visually readable rather than dimensionally literal.

## Project details to include

```text
Project objective:
CAD platform:
Analysis tools:
Overall length / envelope (approximate is fine):
Model mass (only if trustworthy):
Rotor type and key design decisions:
Housing / shaft / gear / bearing materials:
How timing was constrained:
How leakage paths were addressed:
CFD boundary conditions:
Inlet mass flow:
Outlet mass flow:
Main result:
What was learned:
Anything that should remain private:
```
