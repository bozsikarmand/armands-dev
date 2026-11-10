---
title: "Személyes oldal-rendszer"
type: projects
url: /hu/projects/personal-sites/
---
Az armands.blog, az armands.cv és az armands.site nem három különálló weboldal – hanem egy rendszer közös dizájnnyelvvel és egyetlen igazságforrással.

## Egy rendszer, három oldal

- **armands.blog** – a blog (zzo téma-fork), EN/HU, teljes szöveges keresés
- **armands.cv** – az interaktív önéletrajz, nyomtatásra tökéletes, generált PDF-fel
- **armands.site** – a személyes landingoldal

Mindhárom közös Monokai-alapú dizájn-tokeneket, nyelvváltót, téma-kapcsolót és mobilmenü-mintát használ.

## Egyetlen igazságforrás

Az önéletrajz-tartalom a `data/*.json`-ban él, és mindent ez hajt: a CV-oldalt, a kétoldalas dizájnolt PDF-et (CI-ben, headless Chromium-mal épül), és a blog about-oldalait (GitLab-pipeline szinkronizálja).

## Közös kapcsolati csővezeték

Minden kapcsolati űrlap – mindhárom oldalon – egyetlen Cloudflare Workerre postol, ami Turnstile-tokent ellenőriz, és a Zoho Mail API-n át küldi az üzenetet. Sehol nem szerepel nyilvános email-cím.

## Infrastruktúra

A Hugo-build-ek GitLab CI-ben futnak és minden pushnál automatikusan a Cloudflare-re deployolódnak. A rendszer kizárólag a repókból reprodukálható.
