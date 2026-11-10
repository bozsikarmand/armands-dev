---
title: "Personal site ecosystem"
type: projects
url: /en/projects/personal-sites/
---
armands.blog, armands.cv and armands.site are not three separate websites — they are one system with a shared design language and a single source of truth.

## One system, three sites

- **armands.blog** — the blog (zzo theme fork), EN/HU, full-text search
- **armands.cv** — the interactive CV with a generated, print-perfect PDF
- **armands.site** — the personal landing page

All three share the Monokai-based design tokens, the same language switcher, theme toggle and mobile menu patterns.

## Single source of truth

The CV content lives in `data/*.json` and drives everything: the CV page, the two-page designed PDFs (built in CI with headless Chromium), and the blog's about pages (synced by a GitLab pipeline).

## Shared contact pipeline

Every contact form — on all three sites — posts to one Cloudflare Worker, which verifies a Turnstile token and sends the message through the Zoho Mail API. No email address is exposed anywhere on the sites.

## Infrastructure

Hugo builds run in GitLab CI and deploy to Cloudflare automatically on every push. The whole system is reproducible from the repositories alone.
