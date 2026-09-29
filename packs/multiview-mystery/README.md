# Multiview Mystery Graphics

Complete procedural graphics sources from the original game and its September 29
review update. See [Asset Catalog](CATALOG.md), [Palette](palette.json), and
[Provenance](provenance.json) for exact commits and original paths.

The current snapshot is **unmerged review work** from
[Multiview Mystery PR 1](https://github.com/AbbyUsesAIThatCodes/MultiviewMystery/pull/1).
The original snapshot is retained separately and should not be confused with the
brighter current palette or three-purpose interface.

## Reuse

`source-current/dist/` is a self-contained browser source snapshot. Serve it over
HTTP, or copy the procedural renderer and its dependencies into a consuming game.
The snapshots are byte-for-byte copies; `checksums.sha256` covers this pack.
No GLB export is claimed: these graphics are generated from cube geometry and SVG.

- One cube is one unit; the workspace is 4×4×4.
- Y is up; X is right in Front; Z increases toward Front.
- The camera is orthographic with arcball rotation and named views.
- Color is stable by column; face shading distinguishes orientation.
- The renderer needs browser Canvas 2D and standard DOM APIs; no Three.js dependency.
- The completion animation is CSS, with reduced-motion support.

The original game has no blanket source-art license. Preserve that unspecified
status and obtain permission for redistribution beyond the owner's projects.
Comic Neue retains its bundled SIL Open Font License in the source snapshot.
Comic Sans is a preferred system font and is not included.
