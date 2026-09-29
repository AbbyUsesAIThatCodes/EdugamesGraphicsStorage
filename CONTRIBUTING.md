# Adding Graphics

1. Add a pack under `packs/<game-slug>/` and a row in the root catalog.
2. Preserve editable originals. Record the source repository, full commit,
   original paths, creator/attribution information, and existing license notices.
3. Keep screenshots and mockups labeled as references. Label obsolete appearances
   so they cannot accidentally become the current design reference.
4. Add portable exports where useful. State units, scale, up axis, origin,
   dependencies, supported formats, and whether animation is included.
5. Link assets from a readable catalog. Record role colors and materials in a
   palette file and explain any intentional style differences.
6. Run `npm run verify` before uploading. After changing a pack, regenerate its
   SHA-256 inventory and review the changes; do not rewrite an existing export ID.

Keep current consuming games on their existing copies until their own update is
requested. This repository stores and documents shared art; a transfer here does
not authorize changing the games that use it.

Preserve each asset's original licensing. Do not assume a repository-wide license
when none is provided, or add private curriculum/CAD material to a public pack.

For generated exports, follow [Export Identity](docs/BUILD_IDENTITY.md).
