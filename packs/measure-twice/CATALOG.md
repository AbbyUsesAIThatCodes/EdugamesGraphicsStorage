# MeasureTwice Asset Catalog

Source snapshot: `0aa38965fd781fa4cf3d66b404aa0ccf379e466c`, unmerged prior review.
Replacement final identity is pending. [Reuse And Scale](README.md) · [Provenance](provenance.json)

| Asset | Editable Source | Review |
| --- | --- | --- |
| Sunny Woodshop | [Workshop Generator](source/0aa38965fd781fa4cf3d66b404aa0ccf379e466c/src/workshop.js) | [Live Demo](demo/index.html): Workshop |
| Timber House | [Exact 17-Piece Schedule](source/0aa38965fd781fa4cf3d66b404aa0ccf379e466c/data/house.json) and [Placement Source](source/0aa38965fd781fa4cf3d66b404aa0ccf379e466c/src/app.js) | Live Demo: 17-Piece House |
| Wood Comparison Rack | [Rack Geometry](source/0aa38965fd781fa4cf3d66b404aa0ccf379e466c/src/app.js) and [Aligned Placement](source/0aa38965fd781fa4cf3d66b404aa0ccf379e466c/src/model.js) | Live Demo: Comparison Rack, including second layer |
| Selection And Inspection | [Original Material/Geometry Logic](source/0aa38965fd781fa4cf3d66b404aa0ccf379e466c/src/app.js) and [Palette](palette.json) | Live Demo: Neutral, Too Short, Too Long, Correct Fit, Selected Piece |
| Ruler, Marker, And Sawdust | [Original Procedural Graphics](source/0aa38965fd781fa4cf3d66b404aa0ccf379e466c/src/app.js) | Source reference; full timing remains in the game |
| Interface Vectors And Checkmark | [HTML/SVG](source/0aa38965fd781fa4cf3d66b404aa0ccf379e466c/public/index.html), [Styles](source/0aa38965fd781fa4cf3d66b404aa0ccf379e466c/public/style.css), [Reference Styles](source/0aa38965fd781fa4cf3d66b404aa0ccf379e466c/public/reference.css) | Preserved originals; reduced-motion checkmark also demonstrated |
| Approved Workshop Ancestor | [Original Fragment](source/0aa38965fd781fa4cf3d66b404aa0ccf379e466c/docs/mockups/predict-cut-inspect/source.fragment.html) | Historical source; not the current asset demo |
| Upstream Asset Manifest | [Manifest](source/0aa38965fd781fa4cf3d66b404aa0ccf379e466c/docs/ASSET_MANIFEST.json) | Exact worker handoff |

The demo requires the local server described in the README. Screenshots are
review references, not portable meshes. No GLB, baked texture export, or new game
build is claimed. [Integrity Inventory](checksums.sha256) covers every pack file.

## Rendered Review Examples

These references show the live adapter using the preserved prior source snapshot,
not a new upstream game build:

- [17-Piece House](reference-screenshots/0aa38965fd781fa4cf3d66b404aa0ccf379e466c/house.png)
- [Short Inspection](reference-screenshots/0aa38965fd781fa4cf3d66b404aa0ccf379e466c/short-inspection.png)
- [Comparison Rack At 1024 × 768](reference-screenshots/0aa38965fd781fa4cf3d66b404aa0ccf379e466c/comparison-rack.png)
- [Browser Verification Record](reference-screenshots/0aa38965fd781fa4cf3d66b404aa0ccf379e466c/verification.json)
