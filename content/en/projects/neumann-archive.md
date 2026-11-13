---
title: "Neumann archive"
type: projects
url: /en/projects/neumann-archive/
---
In 2013–14 our school team entered the IKEA "At Home in the Forest" competition with a community-driven, multilingual website. The original WordPress 3.8.5 site went offline years ago — this is its resurrection as a static, maintenance-free archive.

## The original site

- **WordPress 3.8.5** with WPML (HU/EN), NextGEN galleries, quizzes, panoramas — 200+ pages and roughly a thousand photos
- Built during an internship, then maintained by teachers and students

## The port

- The old database and files were resurrected in Docker and frozen into a **static snapshot** — no PHP, no database, nothing to hack or maintain
- The 2014 design is kept pixel-for-pixel; the few things a static site cannot do (contact form, feedback modal, timeline) were reimplemented on modern, free infrastructure
- Galleries, quizzes, bird-sound audio, panoramas and a frozen 2014 Twitter feed all work as they did back then

## Infrastructure

Served from Cloudflare Pages, so it stays online for free. Its forms use the same contact Worker + Turnstile pipeline as the rest of this ecosystem.

**Live:** [neumann.armands.dev](https://neumann.armands.dev)
