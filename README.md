# Edugames Graphics Storage

A shared graphics collection for our educational games: editable source, portable
models, textures, icons, fonts, and visual references with traceable origins.

## Available Packs

| Pack | Contents | Source |
| --- | --- | --- |
| [Levers: Load, Effort, and Distance](packs/levers-load-effort-distance/README.md) | 15 GLB models; procedural Three.js sources; wood texture; SVG diagram and icon; fonts; reference screenshots | Latest merged game snapshot, September 29, 2026 |
| [MeasureTwice](packs/measure-twice/README.md) | Sunny Woodshop; 17-piece house; comparison rack; feedback materials; local procedural demo | Final unmerged game review, September 30, 2026 |

Start with the pack's [asset catalog](packs/levers-load-effort-distance/CATALOG.md)
to choose an object or the [visual style guide](STYLE_GUIDE.md) to match its look.

## Organization

Each game has a pack under `packs/<game-slug>/`. Keep related models, their editable
sources, exports, fonts, and references together. This preserves dependencies and
attribution while making it easy to copy a complete asset into another game.

- `source/`: original, unmodified source files and original notices.
- `exports/<export-id>/`: portable assets from a specific, recorded source.
- `fonts/`: the actual fonts used by the game, with license links.
- `reference-screenshots/`: original screenshots for visual reference.
- `provenance.json`: upstream repository, exact commit, source mapping, and hashes.
- `current-export.json`: points to the latest verified export in this pack.
- `checksums.sha256`: integrity inventory for the pack's files.

## Reuse

Download individual GLBs through the catalog, or clone this repository and copy
the chosen files into the consuming game's own assets directory. Record the pack,
export ID, and source commit there. Pin a revision so later artwork updates can be
reviewed deliberately. The games do not depend on live GitHub asset URLs.

The GLBs are static models. Keep the procedural source when a game needs changing
masses, movable attachments, pointer motion, or a different room composition.

See [Adding Graphics](CONTRIBUTING.md), [Export Identity](docs/BUILD_IDENTITY.md),
and [Third-Party Notices](THIRD_PARTY_NOTICES.md).

## Tools

Node.js 20 or later:

```sh
npm ci
npm run verify
npm run export:levers
```

Exporting creates a new identified folder and updates `current-export.json`.
Refresh the catalog links and integrity inventory before committing a new export.
This is an asset repository; it does not build or deploy a playable game.
