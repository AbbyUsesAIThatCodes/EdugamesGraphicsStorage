# Shared Visual Style

This first style reference records the existing Levers workshop. Future packs can
add deliberately named variants without overwriting their source artwork.

## Materials And Shapes

- Use readable, tangible teaching objects: simple silhouettes, visible contact
  points, and recognizable weight, support, and attachment shapes.
- Combine muted steel, warm brass, teal, gold, purple, cream paper, and sage surroundings.
- Preserve role color across 3D models, labels, and diagrams. Pair color with a
  label or distinct silhouette.
- Use physically based materials and soft shadows. Apparatus materials use
  metalness `0.45` and roughness `0.4`; the workbench uses roughness `0.8`.
- Keep decorative detail quieter than the objects students manipulate.

## Palette

These are sRGB hex inputs from the original source, before lighting and tone mapping.
The darker UI shades are intentional; they differ from the 3D object colors.

| Role Or Surface | 3D Color | UI/Text Color |
| --- | --- | --- |
| Effort | `#257E73` | `#176B61` |
| Fulcrum | `#7952A0` | `#714896` |
| Load | `#BF8630` | `#89500B` |
| Brass | `#B68D46` | — |
| Steel | `#8BA0A0` | — |
| Crate Bands | `#E9BA61` | — |
| Cutting Mat | `#426663` | — |
| Wood Base | `#BDA684` | — |
| Cactus | `#527E58` | — |
| Terracotta | `#C79069` | — |
| Room/Floor | `#E0E7D9` | — |
| Interface Ink | — | `#163B39` |
| Interface Background | — | `#DFE6D9` |
| Cream Panel | — | `#FFFDF3` |

Machine-readable values: [palette.json](packs/levers-load-effort-distance/palette.json).

## Lighting And Typography

The original workshop uses a warm hemisphere light (`#FFF9E4` / `#788D78`,
intensity `2.3`), warm key light (`#FFF4DD`, intensity `3`, position `-15,24,18`),
and cool fill (`#DCECEC`, intensity `1.8`, position `16,10,-10`). Three.js uses sRGB
output, ACES filmic tone mapping, exposure `1.16`, and PCF soft shadows.
These renderer settings are not baked into the exported models.

Use the original font stack when matching the classroom interface:
`"Comic Sans MS", "Comic Sans", "Comic Neue", cursive`. Comic Neue regular and
bold are included; Comic Sans remains a system font. Use Title Case for titles
and headings. Exact CSS and the full typography declaration remain in the source.
