---
title: "Késésfigyelő v3"
type: projects
url: /hu/projects/kesesfigyelo-v3/
---
A budapesti közösségi közlekedés valós idejű késésfigyelője — egy projekt
harmadik, immáron véglegesnek szánt megvalósítása. Percenként gyűjti a BKK
GTFS-RT feedjeit (TripUpdates, VehiclePositions, Alerts), és per vonal
mutatja meg: mikor és hol romlik el a menetrend.

## Harmadszorra sikerül

- **v1** — Oracle APEX alkalmazás
- **v2** — Laravel + SQLite újraépítés
- **v3** — Cloudflare-native: minden a free tieren fut, 0 Ft/hó fenntartási
  költség

A gyűjtő-szemlélet minden újraírást túlélt: nyers réteg + dedup + rebuild. A
collector percenként letölti a feedeket, `feed_timestamp` alapján deduplikál,
a nyers payloadot KV-ba teszi (3 óra TTL), a metaadatokat pedig D1-be
batch-eli (`fetch_log` + `heartbeat`). A szeletelt parse-lánc tiszteli a
10 ms-es Workers CPU-limitet — csúcsidőben egyszerűen a következő perces
tickben folytatódik.

## A free tier kihasználva, de túl nem lépve

| Erőforrás | Free limit | A v3 fogyasztása |
|---|---|---|
| Workers request | 100 000/nap | ~5–10k/nap |
| Workers CPU | 10 ms/invocation | ~6–8 ms/perc, szeletelt parse |
| D1 írás | 100 000 sor/nap | ~28k/nap (retencióval) |
| D1 tárhely | 5 GB | ~150 MB, retencióval évekig |
| KV írás | 100 000/nap | ~8k/nap |
| R2 | 10 GB | 2 × 5,6 MB/nap, 7 napos lejárat |

## Egy BKK-sajátosság, amit senki nem dokumentál

A BKK **nem tölti ki** a GTFS-RT `delay` mezőt, és az STU-k mindössze
~14%-ához küld menetrendi horgonyt a realcity kiterjesztésben (1006-os
mező). A késés ezért: *becsült indulás − menetrendi indulás*, ahol a
trip-horgonyt a statikus GTFS-hez igazítva oldja fel a resolver — offline
teszten 99,8%-os feloldással.

## Élőben

A collector státuszoldala már él: percdoboz, üzemidő, top késett vonalak —
a teljes 9 oldalas Astro frontend a 4. fázisban érkezik.
