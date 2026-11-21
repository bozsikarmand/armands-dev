---
title: "Vivace"
type: projects
url: /hu/projects/vivace/
---
Single-tenant, config-as-code státuszoldal. Egy `status.yml`, egy SQLite
adatbázis, egy statikus frontend — fiókok, admin felület és build
keretrendszer nélkül. **Cloudflare Workeren** fut (cron + D1), vagy sima
**Node.js-en** (beépített scheduler + `node:sqlite`): ugyanaz a
platformfüggetlen mag, két vékony adapterrel.

## Miért kellett még egy státuszoldal

A meglévő opciók egyik sem volt egészen jó. A Cachet PHP-stacket és
babusgatós adatbázist kér; az Upptime teljesen a GitHubon belül él; a SaaS
státuszoldalak fiókot, üléseket és előfizetést akarnak. Én olyat szerettem
volna, ami úgy működik, mint a többi infrastruktúrám: **Gitben deklarálva,
CI-val telepítve, szövegszerkesztővel karbantartva**.

Egy szolgáltatás hozzáadása ötsoros YAML-bejegyzés. Egy incidens bejelentése
egy markdown fájl bedobása az `incidents/` mappába front matterrel. Ez a
teljes admin felület.

## Architektúra

```
status.yml ──build──▶ src/generated/config.js ─┐
incidents/*.md ─build▶ src/generated/incidents.js
                                                │
   src/core (platformfüggetlen)                 ▼
   config · checker · stats · incidents · api
            │                │
   ┌────────┴───────┐   ┌────┴─────────────────┐
   │ Cloudflare     │   │ Node.js               │
   │ Worker fetch() │   │ node:http + scheduler │
   │ cron trigger   │   │ node:sqlite           │
   └───────┬────────┘   └────┬─────────────────┘
           │                 │
        D1 (SQLite)      SQLite fájl (data/vivace.db)
           └───────┬─────────┘
              /api/status ──▶ web/ (statikus, tematizálható)
```

- **Ellenőrzés** — HTTP(S) státusz + opcionális body-részlet, timeout, szolgáltatásonkénti intervallum (1/5/15 perc)
- **Előzmények** — napi üzemidő-sávok 90 napra, aktuális állapot, válaszidő
- **Két checker-mód** — a platform saját ütemezéssel mér, *vagy* független rendszer tolja be az eredményeket `POST /api/ingest`-tel bearer tokennel
- **i18n** — angol és magyar felületi szövegek
- **Apró lábnyom** — az egyetlen függőség a `yaml` (build lépés); Node 22+ a beépített SQLite-ot használja, így `npm install && npm start` Docker nélküli self-hostot is ad

## A mérés szándékosan független

Az armands-ökoszisztéma élő telepítése (`status.armands.dev`) szándékosan
ingest-módot használ: egy ütemezett GitLab CI job méri kívülről az összes
oldalt, és tolja be az eredményeket D1-be. A státuszoldal sosem magát méri —
megjelenítés és mérés külön infrastruktúrán fut, így egy elakadt Cloudflare
cron nem tudja csendben lefagyasztani egy zöld dashboardot.

## Úgy tesztelve, ahogy kell

A maglogikát `node:test` suite fedi le — konfiguráció-feldolgozás, checker,
statisztika-aggregálás, incidenskezelés és mindkét storage-backend —, mert
egy hazudó státuszoldal rosszabb, mint a semmi.

## Élőben

Az egész armands-ökoszisztéma rajta jelent: https://status.armands.dev
