# Vite Vis Project

Ein Vue-3-Projekt mit TypeScript und Vite für Visualisierung, Formulare, Tests und die Anbindung an externe Systeme wie ioBroker, GraphQL und InfluxDB.

## Tech-Stack

- Vue 3
- TypeScript
- Vite
- Pinia
- Apollo / GraphQL
- Tailwind CSS
- Cypress
- Vitest

## Wichtige Skripte

- `yarn dev` – Entwicklungsserver starten
- `yarn build` – Projekt für die Produktion bauen
- `yarn build-production` – Build explizit mit `production`-Mode
- `yarn test` – Vitest starten
- `yarn coverage` – Test-Coverage ausführen
- `yarn lint` – Linting mit Auto-Fix für `src`
- `yarn test:e2e:open` – Cypress im interaktiven Modus
- `yarn test:e2e:run` – Cypress im Headless-Modus

## Umgebungsvariablen

Beim Build werden die Werte aus `.env.production` verwendet. Dort sollten die produktiven Konfigurationen stehen, zum Beispiel:

- GraphQL-URL
- API-Endpunkte
- weitere produktive Zugriffe

## Hinweise zur Entwicklung

- Für Test-Selektoren wird im Projekt die `v-e2e`-Directive genutzt.
- Dokumentation und kleinere Projekt-Hinweise liegen im `docs`-Ordner.
- Wenn du an Build- oder Deploy-Themen arbeitest, prüfe immer auch die aktuellen `.env.*`-Dateien.

## Doku

Eine Übersicht aller Projekt-Dokumentationen findest du hier:

- [`docs/README.md`](./docs/README.md)
