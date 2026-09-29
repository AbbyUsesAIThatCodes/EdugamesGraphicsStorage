# Levers: Load, Effort, And Distance

[Open The Asset Catalog](CATALOG.md) · [Source Record](provenance.json) ·
[Shared Visual Style](../../STYLE_GUIDE.md)

Graphics imported from the game's merged `main` at
[`9bfce52767e51ae728ffa9fec717264c554d026b`](https://github.com/AbbyUsesAIThatCodes/LeversLoadEffortDistance/tree/9bfce52767e51ae728ffa9fec717264c554d026b).

## Included

- The complete procedural lever, fulcrum, gold load crate, teal effort weight,
  hanging hardware, and weighted balance pointer.
- The classroom wall and chalkboard, floor, workbench, wood grain, cutting mat,
  paper and pencil, and potted cactus.
- All six original JavaScript modules, HTML/CSS interface styling, SVG favicon,
  palette, font files used at runtime, licenses, and relevant provenance notes.
- The source repository's entire screenshot folder, including its historical
  verification/build records.
- Fifteen portable GLB models, the generated 512 × 512 wood texture, and the
  original fallback renderer's default-state SVG diagram.

The current sources and GLBs include the latest removal of decorative force
arrows and the stationary floating marker/bracket. The beam's actual weighted
balance pointer remains present.

## Portable Models

The models use the source game's scale: **one unit equals 25 mm** along the lever;
Y is up. The GLB coordinates deliberately retain those game units. When importing
into a meter-based application, apply a scale of `0.025` if physical size matters.
They are illustrative teaching geometry, not manufacturing CAD.

Individual objects are centered in X/Z and grounded at their lowest Y point.
The complete apparatus and room exports retain their original world placement.
The complete assembly uses the default 200 g load and 100 g effort at zero tilt.
Isolated crate/weight/hanger exports use the 100 g visual size.

GLBs include geometry, PBR materials, and embedded wood texture where applicable.
They are static poses: simulation, dragging, camera controls, lighting, shadows,
and tone mapping remain in the source. Cutting-mat grid lines and cactus spines
are glTF line primitives; importers that discard lines may omit those details.

## Editable Three.js Source

Use `source/src/apparatus.js` with its `model.js` dependency and Three.js `0.180.0`:

```js
import { createApparatus } from './source/src/apparatus.js';
import { DEFAULT } from './source/src/model.js';

const apparatus = createApparatus();
apparatus.update(DEFAULT, 0);
scene.add(apparatus.moving, apparatus.base);
```

The original `WorkshopScene.makeRoom()` constructs the tabletop props and wood
texture; `LeverScene.makeRoom()` adds the classroom backdrop. The export adapter
in `../../scripts/levers-assets.js` shows how to select those objects without
starting the game's UI. Use the source for adjustable models and animation.

`source/` is an archival graphics/source snapshot, not a standalone game checkout:
upstream build scripts, tests, and deployment configuration are not included.
Its original package manifests document dependencies. For a runnable game, use
the linked upstream repository. The graphics export tools run from this
repository's root package.

## Historical References

`reference-screenshots/` is preserved byte for byte from the source repository.
Several images predate the current graphics and may show removed arrows, the
floating marker, older labels, or older UI. Use the current source and exported
models as authoritative; historical screenshots document earlier appearances.

No untracked concept art or graphics from unrelated repositories are included.
