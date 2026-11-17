---
title: "Késésfigyelő v3"
type: projects
url: /en/projects/kesesfigyelo-v3/
---
A real-time delay tracker for Budapest's public transit — the third
incarnation of a project that keeps coming back better. It collects the BKK
GTFS-RT feeds (TripUpdates, VehiclePositions, Alerts) every minute and turns
them into per-line delay statistics: which line, when, and where the schedule
breaks down.

## Third time's the charm

- **v1** — Oracle APEX application
- **v2** — Laravel + SQLite rebuild
- **v3** — Cloudflare-native: everything runs on the free tier, 0 Ft/month
  maintenance cost

The collector philosophy survived every rewrite: raw layer + dedup + rebuild.
Every minute the collector fetches the feeds, deduplicates by
`feed_timestamp`, stores the raw payload in KV (3 h TTL) and batches the
metadata into D1 (`fetch_log` + `heartbeat`). A sliced parse chain respects
the 10 ms Workers CPU limit — on peak hours it simply continues in the next
minute's tick.

## The free tier, pushed but not over

| Resource | Free limit | v3 usage |
|---|---|---|
| Workers requests | 100 000/day | ~5–10k/day |
| Workers CPU | 10 ms/invocation | ~6–8 ms/min, sliced parse chain |
| D1 writes | 100 000 rows/day | ~28k/day (with retention) |
| D1 storage | 5 GB | ~150 MB, years with retention |
| KV writes | 100 000/day | ~8k/day |
| R2 | 10 GB | 2 × 5.6 MB/day, 7-day expiry |

## A BKK quirk nobody documents

BKK does **not** populate the GTFS-RT `delay` field, and only ~14% of
stop-time-updates carry a schedule anchor (in the realcity extension, field
1006). The delay is therefore computed as *estimated departure − scheduled
departure*, resolving trip anchors against the static GTFS feed — the
offline-tested resolver solves 99.8% of trips.

## Live

The collector's status page is already live with per-minute uptime boxes and
top-delayed lines — the full 9-page Astro frontend arrives in phase 4.
