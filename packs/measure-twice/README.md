# MeasureTwice Graphics

The Sunny Woodshop, exact timber-house schedule, comparison rack, and implemented
selection/inspection graphics from [MeasureTwice PR #14](https://github.com/AbbyUsesAIThatCodes/MeasureTwice/pull/14).
See the [Asset Catalog](CATALOG.md), [Material Palette](palette.json), and
[Source Record](provenance.json).

**Preparation Snapshot:** source `0aa38965fd781fa4cf3d66b404aa0ccf379e466c` is
preserved while the game worker corrects assessment labels. Final current-source
provenance and publication await the replacement identity. This is unmerged review
work, not a release or a claim of classroom readiness.

## Quick Local Review

From the repository root, with Node.js 20 or later:

```sh
npm ci
node scripts/serve-assets.mjs 18551
```

Open `http://127.0.0.1:18551/packs/measure-twice/demo/`. Choose **17-Piece House**,
**Comparison Rack**, then **Too Short**, **Too Long**, **Correct Fit**, and
**Selected Piece**. Drag the workshop to change the camera. The server listens
only on the local computer; stop it with Ctrl+C. No Pages or external services
are used. The browser loads the repository's pinned Three.js `0.180.0` locally.

The [editable demonstration](demo/demo.mjs) imports the exact workshop and
comparison-placement generators. Its small adapter reproduces the source's house
placement, rack, and static material states. It does not implement the game's
measurement/assessment loop or promise a GLB export. The original application,
HTML/SVG, and CSS are retained as editable graphics references; this selected
source archive is not a complete game checkout.

## Scale And Geometry

- Two world units represent one inch; one world unit is 12.7 mm. Y is up.
- Timber length is X, thickness Y, and width Z before house rotation. The fixed
  cross-section is `0.22 × 0.63` world units (`0.11 × 0.315` inches).
- House endpoints are integer sixteenths of an inch. Divide by 8 to obtain world
  units, then add the source origin `[3.35, 2.76, -0.9]`. Do not stretch pieces.
- The schedule contains eight 1¼-inch pieces, four 2-inch pieces, and five 1-inch
  pieces. It is illustrative teaching geometry, not manufacturing CAD.
- Comparison pieces start at X `0.3`. Their Z spacing is `0.63 + 0.09`; eight
  pieces occupy each layer, with successive layers raised by `0.4` world units.
- Wood grain is generated on a 512 × 128 canvas. Lighting, camera, shadows,
  tone mapping, material behavior, and animation remain procedural.

## Feedback Materials

| State | Visual Cue | Additional Meaning |
| --- | --- | --- |
| Neutral | Natural wood | No target comparison |
| Selected | Cyan emissive `#15A8BA`, intensity `0.35` | Selected object label; not correctness |
| Correct Fit | Green emissive `#279E52`, intensity `0.25` | Equal lengths and checkmark |
| Incorrect Fit | Red emissive `#CD3023`, intensity `0.18` | Explicit Too Short / Too Long label |
| Too Short | Red translucent `#ED6055` extension | Missing wood beyond the actual endpoint |
| Too Long | Red translucent `#E94C41` overlay and `#B84236` cut line | Extra wood beyond the target endpoint |

The palette records original opacity, depth-write behavior, dimension colors,
renderer settings, and checkmark timing. Correctness colors belong after a
committed cut; the game holds inspection until acknowledgement. Selection clones
the object's material and restores previous emissive values on deselection.
The checkmark uses a 0.45-second scale/fade animation; reduced motion disables it.
These are MeasureTwice's implemented meanings, not a forced cross-game palette.

## Provenance And Licensing

The archived `source/<commit>/` files are unchanged. They include the approved
workshop fragment with SHA-256
`dc9a6aa15a42497c54bb52d3fc6d72d5fa6a358904ff7950dd1c86d1954ad992`.
The adapted workshop and new house/rack are distinct from the Levers pack;
existing exports and fonts have not been duplicated or replaced.

Original-art licensing remains unspecified. No license is inferred from this
import. Three.js is MIT; its [license](licenses/three-LICENSE.txt) is included.
Comic Sans is a system-font reference; no font binaries are copied.

The [prior upstream build manifest](history/0.1.0_Predict-Cut-Inspect_pr-14_build-001_20260930T031537Z_g0aa38965fd78_web/build-manifest.json)
is preserved byte for byte and shown as a source reference in the live demo.
It is not the identity of a newly built game or storage export. Opening the demo
does not reserve or consume the game's PR build ordinal.
