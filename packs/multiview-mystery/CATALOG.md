# Asset Catalog

| Asset | Current Editable Source | Notes |
| --- | --- | --- |
| Cube Solids And Shaded Faces | [Scene](source-current/dist/scene.mjs) | 3D coordinates projected to Canvas; no texture files |
| Building Grid And Front Marker | [Scene](source-current/dist/scene.mjs) | Fixed semantic directions, movable camera |
| Orthographic Drawings | [Drawing Generator](source-current/dist/app.js) and [Projection Logic](source-current/dist/logic.mjs) | SVG target and student outlines; suppresses coplanar seams |
| Brand, Orientation Icon, Favicon | [HTML/SVG](source-current/dist/index.html) | Original inline vectors |
| Panels, Definition Cards, Celebration | [Styles](source-current/dist/style.css) | Responsive layout and reduced-motion animation |
| Column And Drawing Colors | [Palette](palette.json) | Machine-readable color roles |
| Regular And Bold Fonts | [Regular](source-current/dist/fonts/comic-neue-regular.woff2), [Bold](source-current/dist/fonts/comic-neue-bold.woff2), [License](source-current/dist/fonts/LICENSE.txt) | Comic Neue fallback; system Comic Sans preferred |
| Original Appearance | [Original Scene](source-original/dist/scene.mjs) and [Original Styles](source-original/dist/style.css) | Historical reference, not the current palette |

No screenshots are represented as meshes or original editable art. The source
snapshot includes its game scaffolding so the procedural graphics remain usable.
