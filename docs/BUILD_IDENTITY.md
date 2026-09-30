# Export Identity

This repository stores game artwork. An export is an asset snapshot, not a new
game release. It retains the upstream version and codename and has its own
explicitly local export scope and ordinal.

`scripts/export-levers.mjs` reserves each ordinal atomically in the checkout's
`.git/graphics-export/ledger.json`, using an exclusive lock directory. Failed
attempts consume their reservations. A new checkout gets a new UUID scope;
local exports never claim a PR ordinal. No CI/PR export entrypoint exists.

The export ID contains the source release version/codename, local scope, ordinal,
one UTC timestamp, storage-repository revision, dirty-input fingerprint when
applicable, and `graphics` target. The manifest separately records the exact
upstream game commit. The input fingerprint covers the exporter scripts, source
snapshot, provenance, and dependency manifests present at export time.

## Location Inventory

| Surface | Location | Status |
| --- | --- | --- |
| Version And Codename | Pack `source/release.json`, copied without changes | Preserved Upstream |
| Ordinal Allocator | `.git/graphics-export/ledger.json` | Local, Atomic |
| Console | Export start, success, and failure lines | Implemented |
| Distribution Folder | Pack `exports/<full-id>/` | Implemented |
| Manifest | Export folder `manifest.json` | Implemented |
| Embedded Model Metadata | GLB root node `extras.buildId` | Implemented |
| Current Export | Pack `current-export.json` | Implemented |
| Asset Catalog | Pack `CATALOG.md` | Links To Identified Files |
| Game UI And Deployment | No game UI or deployment in this repository | Inapplicable |

GLB round-trip validation reloads each file through Three.js and compares bounds,
mesh/line/texture counts, and vertex counts. `npm run verify` checks stored
identities, source hashes, file inventories, GLB structure, and catalog links.
Opening, copying, or verifying an existing export preserves its identity.

## MeasureTwice Source Demonstration

`packs/measure-twice/source/<full-commit>/` preserves immutable upstream graphics
sources. `provenance.json` records the source commit and links the byte-preserved
upstream build manifest under `history/<upstream-build-id>/`. These references
retain the upstream identity; the storage repository does not allocate a new
game ordinal or relabel that artifact.

`packs/measure-twice/demo/` is an unbundled live source demonstration. Its visible
footer and console identify that status, exact source snapshot, and full upstream
build reference. It is not a new game build, GLB export, or deployment. Catalog,
palette, and README links identify the same snapshot. A future actual export
must allocate its own identity under the conventions above.

## ThreeKindsOfLevers Source Demonstration

`packs/three-kinds-of-levers/source/<full-commit>/` archives original Git blobs.
The checkpoint containing the handoff manifest can differ from the integrated
runtime source. Both identities are recorded independently in `provenance.json`.
The exact upstream `fullId` manifest retains source and overlay-packager identities
and dirty flags without reinterpretation. `demo/` is an unbundled local source
demo, with source and upstream build reference in its footer. The catalog,
palette and source-keyed screenshots identify the same revision. It allocates no
game build ordinal and makes no portable export or deployment claim.

## EasyAsPie Source Demonstration

`packs/easy-as-pie/source/<full-commit>/` contains exact original generator and
geometry-test Git blobs. The evidence checkpoint's JSON handoff pins a separate
runtime source; both are recorded in `provenance.json`. Its `upstreamBuild` retains
the original `id` and `sha` fields from `history/<upstream-build-id>/build.json`.
Historical source/build manifests and source-keyed screenshots remain unchanged.
The demo, palette, README and catalog identify the current source and upstream
build reference without allocating a new ordinal. `demo/` installs Three.js
0.186.1 locally and does not alter older packs' engines. It is an unbundled source
asset demo, not a new game build, portable GLB export or deployment. Teacher
visual acceptance remains pending.
