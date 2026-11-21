---
title: "Vivace"
type: projects
url: /en/projects/vivace/
---
A single-tenant, config-as-code status page. One `status.yml`, one SQLite
database, one static frontend — no accounts, no admin UI, no build framework.
It runs on **Cloudflare Workers** (cron + D1) or **plain Node.js** (built-in
scheduler + `node:sqlite`): the same platform-neutral core with two thin
adapters.

## Why another status page

The existing options were never quite right. Cachet needs a PHP stack and a
database you babysit; Upptime lives entirely inside GitHub; SaaS status pages
want accounts, seats and subscriptions. I wanted something that works the way
the rest of my infrastructure does: **declared in Git, deployed by CI,
editable with a text editor**.

Adding a service is a five-line YAML entry. Declaring an incident is dropping
a markdown file in `incidents/` with front matter. That is the entire admin
interface.

## Architecture

```
status.yml ──build──▶ src/generated/config.js ─┐
incidents/*.md ─build▶ src/generated/incidents.js
                                                │
   src/core (platform-neutral)                  ▼
   config · checker · stats · incidents · api
            │                │
   ┌────────┴───────┐   ┌────┴─────────────────┐
   │ Cloudflare     │   │ Node.js               │
   │ Worker fetch() │   │ node:http + scheduler │
   │ cron trigger   │   │ node:sqlite           │
   └───────┬────────┘   └────┬─────────────────┘
           │                 │
        D1 (SQLite)      SQLite file (data/vivace.db)
           └───────┬─────────┘
              /api/status ──▶ web/ (static, themeable)
```

- **Checks** — HTTP(S) status + optional body substring, timeout, per-service interval (1/5/15 min)
- **History** — daily uptime bars up to 90 days, current state, latency
- **Two checker modes** — the platform checks on its own schedule, *or* you push results from an independent system via `POST /api/ingest` with a bearer token
- **i18n** — English and Hungarian UI strings
- **Tiny footprint** — the only dependency is `yaml` (build step); Node 22+ uses the built-in SQLite, so `npm install && npm start` gives you a Docker-free self-host too

## The measurement is deliberately independent

The armands ecosystem's live deployment (`status.armands.dev`) uses the ingest
mode on purpose: a scheduled GitLab CI job measures all the sites from the
outside and pushes the results into D1. The status page never checks itself —
display and measurement run on separate infrastructure, so a broken Cloudflare
cron cannot silently freeze a green dashboard.

## Tested like it matters

The core logic is covered by a `node:test` suite — config parsing, the
checker, stats aggregation, incident handling and both storage backends —
because a status page that lies is worse than no status page.

## Live

The whole armands ecosystem reports on it: https://status.armands.dev
