# Levers Graphics Catalog

Source: `9bfce52767e51ae728ffa9fec717264c554d026b` (merged September 29, 2026).

## Portable 3D Models

All files use the latest merged geometry. See [scale and origin notes](README.md#portable-models).

| Model | Contents | Download |
| --- | --- | --- |
| Complete Lever Assembly | Default 200 g load / 100 g effort; beam, fulcrum, attachments, and pointer. | [GLB](exports/0.1.0_Integrated-Core_local-a6e61ea2_build-003_20260929T221804Z_g27d9760d104d-dirty-4db42f56_graphics/lever-assembly.glb) |
| Lever Beam | Steel rail, cross-members, brass end caps, and tick marks. | [GLB](exports/0.1.0_Integrated-Core_local-a6e61ea2_build-003_20260929T221804Z_g27d9760d104d-dirty-4db42f56_graphics/lever-beam.glb) |
| Fulcrum Support | Purple base, steel uprights, axle, bearing rings, and caps. | [GLB](exports/0.1.0_Integrated-Core_local-a6e61ea2_build-003_20260929T221804Z_g27d9760d104d-dirty-4db42f56_graphics/fulcrum-support.glb) |
| Gold Load Crate | Reference 100 g crate with horizontal and vertical bands. | [GLB](exports/0.1.0_Integrated-Core_local-a6e61ea2_build-003_20260929T221804Z_g27d9760d104d-dirty-4db42f56_graphics/load-crate-100g.glb) |
| Teal Effort Weight | Reference 100 g cylindrical weight and brass rims. | [GLB](exports/0.1.0_Integrated-Core_local-a6e61ea2_build-003_20260929T221804Z_g27d9760d104d-dirty-4db42f56_graphics/effort-weight-100g.glb) |
| Effort Weight With Hanger | Weight with cord, hook, neck, and application-point sphere. | [GLB](exports/0.1.0_Integrated-Core_local-a6e61ea2_build-003_20260929T221804Z_g27d9760d104d-dirty-4db42f56_graphics/effort-hanger-100g.glb) |
| Weighted Balance Pointer | Hub, brass rod, bob, and purple face; rotates with the beam. | [GLB](exports/0.1.0_Integrated-Core_local-a6e61ea2_build-003_20260929T221804Z_g27d9760d104d-dirty-4db42f56_graphics/balance-pointer.glb) |
| Complete Classroom And Lever | Full environment and default apparatus in source coordinates. | [GLB](exports/0.1.0_Integrated-Core_local-a6e61ea2_build-003_20260929T221804Z_g27d9760d104d-dirty-4db42f56_graphics/classroom-and-lever.glb) |
| Workshop Environment | Room, tabletop, cutting mat, grid, cactus, paper, and pencil. | [GLB](exports/0.1.0_Integrated-Core_local-a6e61ea2_build-003_20260929T221804Z_g27d9760d104d-dirty-4db42f56_graphics/workshop-environment.glb) |
| Wood Workbench | Table mesh with embedded procedural wood-grain texture. | [GLB](exports/0.1.0_Integrated-Core_local-a6e61ea2_build-003_20260929T221804Z_g27d9760d104d-dirty-4db42f56_graphics/workbench.glb) |
| Cutting Mat And Grid | Teal mat with line grid. | [GLB](exports/0.1.0_Integrated-Core_local-a6e61ea2_build-003_20260929T221804Z_g27d9760d104d-dirty-4db42f56_graphics/cutting-mat.glb) |
| Paper And Pencil | Paper layers and pencil resting on top. | [GLB](exports/0.1.0_Integrated-Core_local-a6e61ea2_build-003_20260929T221804Z_g27d9760d104d-dirty-4db42f56_graphics/paper-and-pencil.glb) |
| Potted Cactus | Terracotta pot and rim, soil, stem, arms, and spine lines. | [GLB](exports/0.1.0_Integrated-Core_local-a6e61ea2_build-003_20260929T221804Z_g27d9760d104d-dirty-4db42f56_graphics/potted-cactus.glb) |
| Classroom Backdrop | Wall, frame, chalkboard, and chalk tray. | [GLB](exports/0.1.0_Integrated-Core_local-a6e61ea2_build-003_20260929T221804Z_g27d9760d104d-dirty-4db42f56_graphics/classroom-backdrop.glb) |
| Floor | The original 200 × 200 game-unit floor plane. | [GLB](exports/0.1.0_Integrated-Core_local-a6e61ea2_build-003_20260929T221804Z_g27d9760d104d-dirty-4db42f56_graphics/floor.glb) |

## Textures, Diagrams, Icon, And Fonts

| Asset | File | Notes |
| --- | --- | --- |
| Wood Grain | [Open](exports/0.1.0_Integrated-Core_local-a6e61ea2_build-003_20260929T221804Z_g27d9760d104d-dirty-4db42f56_graphics/wood-grain.png) | 512 × 512 PNG; repeat 3 × 1 on the table. |
| Default Lever Diagram | [Open](exports/0.1.0_Integrated-Core_local-a6e61ea2_build-003_20260929T221804Z_g27d9760d104d-dirty-4db42f56_graphics/lever-diagram.svg) | Exact upstream SVG renderer at zero tilt, default masses. |
| Game Icon | [Open](source/public/favicon.svg) | Original SVG favicon. |
| Comic Neue Regular | [Open](fonts/comic-neue-regular.woff2) | Latin, weight 400, normal. |
| Comic Neue Bold | [Open](fonts/comic-neue-bold.woff2) | Latin, weight 700, normal. |
| Role And Material Palette | [Open](palette.json) | Machine-readable sRGB values and renderer settings. |
| Original Interface Styling | [Open](source/public/style.css) | All original CSS colors, type, panels, labels, and outlines. |

## Editable Sources

| Component | File |
| --- | --- |
| Apparatus Geometry And Materials | [apparatus.js](source/src/apparatus.js) |
| Room, Props, Texture, And Lighting | [workshop.js](source/src/workshop.js) |
| Classroom Backdrop And Scene Behavior | [scene.js](source/src/scene.js) |
| Fallback SVG, Leaders, Labels, And UI | [app.js](source/src/app.js) |
| Geometry-Related State And Motion | [model.js](source/src/model.js) |
| Equation Presentation | [math.js](source/src/math.js) |

## Historical Screenshots

All 41 upstream PNGs are preserved. They include older UI and removed geometry; they are historical references, not the current model specification.

- [balanced.png](reference-screenshots/balanced.png)
- [extreme-raised-load.png](reference-screenshots/extreme-raised-load.png)
- [issue-10/after-laptop.png](reference-screenshots/issue-10/after-laptop.png)
- [issue-10/after-projector.png](reference-screenshots/issue-10/after-projector.png)
- [issue-10/before-laptop.png](reference-screenshots/issue-10/before-laptop.png)
- [issue-10/before-projector.png](reference-screenshots/issue-10/before-projector.png)
- [issue-10/negative-stop.png](reference-screenshots/issue-10/negative-stop.png)
- [issue-10/positive-stop.png](reference-screenshots/issue-10/positive-stop.png)
- [issue-7/after-compact.png](reference-screenshots/issue-7/after-compact.png)
- [issue-7/after-desktop.png](reference-screenshots/issue-7/after-desktop.png)
- [issue-7/before-compact.png](reference-screenshots/issue-7/before-compact.png)
- [issue-7/before-desktop.png](reference-screenshots/issue-7/before-desktop.png)
- [issue-8/after-diagram-level.png](reference-screenshots/issue-8/after-diagram-level.png)
- [issue-8/after-diagram-negative-stop.png](reference-screenshots/issue-8/after-diagram-negative-stop.png)
- [issue-8/after-diagram-positive-stop.png](reference-screenshots/issue-8/after-diagram-positive-stop.png)
- [issue-8/after-webgl-level.png](reference-screenshots/issue-8/after-webgl-level.png)
- [issue-8/after-webgl-negative-stop.png](reference-screenshots/issue-8/after-webgl-negative-stop.png)
- [issue-8/after-webgl-positive-stop.png](reference-screenshots/issue-8/after-webgl-positive-stop.png)
- [issue-8/before-diagram-level.png](reference-screenshots/issue-8/before-diagram-level.png)
- [issue-8/before-diagram-negative-stop.png](reference-screenshots/issue-8/before-diagram-negative-stop.png)
- [issue-8/before-diagram-positive-stop.png](reference-screenshots/issue-8/before-diagram-positive-stop.png)
- [issue-8/before-webgl-level.png](reference-screenshots/issue-8/before-webgl-level.png)
- [issue-8/before-webgl-negative-stop.png](reference-screenshots/issue-8/before-webgl-negative-stop.png)
- [issue-8/before-webgl-positive-stop.png](reference-screenshots/issue-8/before-webgl-positive-stop.png)
- [issue-9/after-compact-touch.png](reference-screenshots/issue-9/after-compact-touch.png)
- [issue-9/after-fallback.png](reference-screenshots/issue-9/after-fallback.png)
- [issue-9/after-laptop.png](reference-screenshots/issue-9/after-laptop.png)
- [issue-9/after-projector.png](reference-screenshots/issue-9/after-projector.png)
- [issue-9/before-compact-touch.png](reference-screenshots/issue-9/before-compact-touch.png)
- [issue-9/before-laptop.png](reference-screenshots/issue-9/before-laptop.png)
- [issue-9/before-projector.png](reference-screenshots/issue-9/before-projector.png)
- [issue-9/force-math.png](reference-screenshots/issue-9/force-math.png)
- [issue-9/keyboard-tooltip.png](reference-screenshots/issue-9/keyboard-tooltip.png)
- [issue-9/touch-tooltip.png](reference-screenshots/issue-9/touch-tooltip.png)
- [phone.png](reference-screenshots/phone.png)
- [swapped-released.png](reference-screenshots/swapped-released.png)
- [weighted-pointer/fallback-balanced.png](reference-screenshots/weighted-pointer/fallback-balanced.png)
- [weighted-pointer/projector.png](reference-screenshots/weighted-pointer/projector.png)
- [weighted-pointer/true-balanced.png](reference-screenshots/weighted-pointer/true-balanced.png)
- [weighted-pointer/true-settling.png](reference-screenshots/weighted-pointer/true-settling.png)
- [weighted-pointer/true-small-imbalance.png](reference-screenshots/weighted-pointer/true-small-imbalance.png)

## Export Record

Export ID: `0.1.0_Integrated-Core_local-a6e61ea2_build-003_20260929T221804Z_g27d9760d104d-dirty-4db42f56_graphics`

[Manifest](exports/0.1.0_Integrated-Core_local-a6e61ea2_build-003_20260929T221804Z_g27d9760d104d-dirty-4db42f56_graphics/manifest.json) · [Provenance](provenance.json) · [Integrity Inventory](checksums.sha256)
