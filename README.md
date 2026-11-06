# WeRnds — mint noir site

Een vijf-pagina's site voor WeBrnds (maatwerksoftware voor het MKB) in de
donkere mint-noir stijl van de Skillry-skill `bs-mint-noir-saas-site`.

## Starten

```
node server.mjs
```

Daarna open je <http://localhost:4321>. Op Windows kun je ook
`start-site.bat` dubbelklikken.

## Pagina's

| Route | Pagina | Wat er gebeurt |
| --- | --- | --- |
| `#home` | Diensten | Hero, procesvenster met vier werkwijzestappen, diensten, bento-grid, belofte |
| `#pricing` | Prijzen | Wissel bouwen / bouwen + onderhoud, drie pakketten, vergelijkingstabel, FAQ |
| `#resources` | Kennisbank | Zoekfunctie over zes onderwerpen, artikelen, handleidingen |
| `#events` | Agenda | Aftellen naar de volgende sessie, filters, inschrijven, nieuwsbrief |
| `#changelog` | Changelog | Release-tijdlijn, oudere releases laden |

Alle vijf pagina's zitten in één `index.html` met een hash-router, zoals de
sjabloon van de skill.

## Mappen

```
index.html          de vijf pagina's, het woordmerk en de iconensprite
assets/css/         de stijl (sjabloon + aanpassingen voor WeBrnds)
assets/js/          router en alle interacties
assets/fonts/       Geist, Geist Mono en Instrument Serif als lokale woff2
assets/img/         sprite.svg met de Lucide-iconen (in de HTML geïnlined)
server.mjs          lokale server
```

## Wat lokaal is gerund

- Lettertypen, iconen en stylesheet staan in de map; de site maakt geen
  enkele externe aanroep.
- Het enige accent is mint `#6ee7c8`; er is geen paars of violet.
- Teksten komen uit `WebRnds-Bureau-Site/OPDRACHT.md` en `WEBSITES.md`:
  prijzen, werkwijze, KvK 42127859, Rozenburg, klantsites, reactietijd en
  broncode-eigendom.

## Wat nog nagekeken moet worden

- Het e-mailadres `schreuderdarren@gmail.com` komt uit de oude preview en is
  nooitextern geverifieerd.
- De sessies op de agenda staan gepland, niet georganiseerd. De countdown
  verwijst naar 20 november 2026.
- De prijzen zijn vanaf-bedragen uit de preview en kunnen per project
  afwijken.
