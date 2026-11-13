---
title: "Neumann-archívum"
type: projects
url: /hu/projects/neumann-archive/
---
2013–14-ben az iskolai csapatunkkal az IKEA „Otthon az erdőben" pályázatára készítettünk egy közösségi, kétnyelvű weboldalt. Az eredeti, WordPress 3.8.5-ös oldal évekkel ezelőtt leállt – ez a feltámasztása, statikus, karbantartásmentes archívumként.

## Az eredeti oldal

- **WordPress 3.8.5** WPML-lel (HU/EN), NextGEN-galériákkal, kvízekkel, panorámákkal – 200+ oldal és nagyjából ezer fénykép
- Szakmai gyakorlaton kezdtem, aztán tanárok és diákok közösen írták tovább

## A portolás

- A régi adatbázist és fájlokat Dockerben támasztottuk fel, aztán **statikus pillanatkétté** fagyasztottuk – PHP nélkül, adatbázis nélkül, nincs mit feltörni vagy karbantartani
- A 2014-es dizájnt pixelre megtartottuk; amit egy statikus oldal nem tud (kapcsolati űrlap, visszajelző-modal, idővonal), azt modern, ingyenes infrastruktúrára építettük újra
- A galériák, kvízek, madárhangos audiók, panorámák és a befagyasztott 2014-es Twitter-feed mind úgy működnek, ahogy annak idején

## Infrastruktúra

Cloudflare Pages szolgáltatja, így örökre ingyen elérhető marad. Az űrlapjai ugyanazt a kapcsolati Worker + Turnstile-csővezetéket használják, mint ennek az ökoszisztémának a többi oldala.

**Élőben:** [neumann.armands.dev](https://neumann.armands.dev)
