# CLAUDE.md — Vite-Vis-Project

## Projekt-Überblick

Vue 3 + Vite Visualisierungs-Frontend für ioBroker-Daten (Smart Home Dashboard).
Verbindet sich über `@iobroker/socket-client` mit einer ioBroker-Instanz und stellt Sensor- und Systemdaten dar.

**Stack:** Vue 3 · TypeScript · Vite · Pinia · Tailwind CSS · shadcn/vue (radix-vue) · Apollo/GraphQL · Vitest · Cypress

---

## Befehle

```bash
yarn dev              # Dev-Server starten
yarn build            # Produktions-Build (vue-tsc + vite)
yarn test             # Vitest (watch)
yarn coverage         # Vitest mit Coverage
yarn lint             # ESLint mit Auto-Fix
yarn test:e2e:open    # Cypress E2E öffnen
yarn release          # Release-Skript
```

---

## Projektstruktur

```
src/
  components/
    ui/           # shadcn-Komponenten (Card, Progress, Dialog, …)
    shared/       # Wiederverwendbare App-Komponenten (Page, Button, …)
    section/      # Seitenspezifische Abschnitte (home/, …)
    layout/       # Layout-Komponenten (PageHeader, …)
  lib/            # Reine Utility-Funktionen (testbar, kein Vue-Overhead)
  pages/vis/      # Seiten (home.vue, system.vue, …)
  store/          # Pinia Stores (ioBrokerStore, app-store, …)
```

---

## Coding-Regeln

### Komponenten
- **Ausschließlich shadcn-Komponenten** aus `@/components/ui/` verwenden — kein rohes HTML für UI-Elemente wenn eine shadcn-Komponente existiert.
- Verfügbare shadcn-Komponenten: `Card`, `CardHeader`, `CardTitle`, `CardContent`, `CardFooter`, `CardDescription`, `Progress`, `Dialog`, `Sheet`, `Switch`, `Checkbox`, `Select`, `Table`, `Collapsible`, `Toast`, `Input`, `Label`, `Textarea`, `DropdownMenu`, `Pagination`.

### Utility-Funktionen
- Logik-Funktionen gehören in `src/lib/`, **nicht** direkt in `<script setup>`.
- Jede Lib-Datei bekommt eine gleichnamige `.spec.ts`-Datei (z.B. `system.ts` → `system.spec.ts`).
- Lib-Funktionen müssen pure sein (kein Vue-State, keine Composables) damit Vitest sie direkt testen kann.

### ESLint
- **Immer geschweifte Klammern** nach `if`/`else` setzen — `curly`-Regel ist aktiv.
- Kein `return val ? ... : ...` als Einzeiler wenn die Regel greift; stattdessen explizite `if`-Blöcke.

### Imports
- Immer `@/`-Aliase verwenden, keine relativen Pfade außerhalb desselben Ordners.

---

## Konventionen für Daten-Anzeige

### Zeitwerte (Uptime in Sekunden)
Immer `formatUptime()` aus `@/lib/system` nutzen:
- Gibt `Xd Yh Zm` aus (Tage, Stunden, Minuten).
- Stunden werden auch angezeigt wenn Tage vorhanden sind (`1d 0h 5m`, nicht `1d 5m`).
- `undefined`/`null` → `"–"`.

### Speicherwerte (MiB → GiB)
Immer `miBToGiB()` aus `@/lib/system` nutzen:
- Gibt `"X.XX GB"` aus.
- `undefined`/`null` → `"0 GB"`.

---

## Tests

- **Unit-Tests:** Vitest, Dateien als `*.spec.ts` neben der Quelldatei in `src/lib/`.
- **E2E / Component-Tests:** Cypress in `cypress/`.
- Tests werden mit `yarn test` oder `yarn coverage` ausgeführt.
- Testbeispiel: `src/lib/system.spec.ts` für `miBToGiB` und `formatUptime`.