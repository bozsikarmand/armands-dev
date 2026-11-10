---
title: "Bar Project"
type: projects
url: /hu/projects/bar-project/
---
Egy interaktív 3D bár-vizualizáció, amit egyetemi számítógépes grafika kurzusra készítettem.

## Mit csinál

A böngészőben egy stilizált bárt jelenít meg: procedurális geometria, egyedi GLSL-shaderek a világításra és anyagokra, valamint orbit-stílusú kameravezérlés. Minden kódból generálódik – letöltött modellek nélkül.

## Technológiák

- **Three.js** a scene-graph, kamera és loader-ek kezelésére
- **Egyedi GLSL-shaderek** a lighting-modell és felületi effektekhez
- **Procedurális geometria** – bútorok, poharak és palackok paraméterekből generálva
- Tisztán statikus hosting – teljesen kliensoldalon fut

## Mit tanultam belőle

A Three.js-en keresztüli nyers WebGL-pipeline kezelése sokkal mélyebb megértést adott arról, amit a modern frameworkök elrejtenek: buffer-kezelés, shader-uniformok, render-pass-ek és az overdraw teljesítménybeli költsége.
