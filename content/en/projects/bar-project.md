---
title: "Bar Project"
type: projects
url: /en/projects/bar-project/
---
An interactive 3D bar visualisation I built for a university computer graphics course.

## What it does

The scene renders a stylised bar environment in the browser: procedural geometry, custom GLSL shaders for lighting and materials, and orbit-style camera controls. Everything is generated in code — no downloaded models.

## Tech stack

- **Three.js** for scene graph, camera and loaders
- **Custom GLSL shaders** for the lighting model and surface effects
- **Procedural geometry** — furniture, glasses and bottles generated from parameters
- Pure static hosting — runs entirely client-side

## What I learned

Working with the raw WebGL pipeline through Three.js gave me a much deeper understanding of what modern frameworks abstract away: buffer management, shader uniforms, render passes and the performance cost of overdraw.
