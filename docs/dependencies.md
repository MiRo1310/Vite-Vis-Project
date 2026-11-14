# Dependencies

Kurzübersicht aller Pakete aus `package.json` und wofür sie im Projekt da sind.

## Dependencies (Runtime)

| Paket | Zweck |
| --- | --- |
| `vue` | UI-Framework (Vue 3, Composition API) |
| `vue-router` | Routing zwischen den Dashboard-Seiten |
| `pinia` | State-Management (Stores, z. B. `ioBrokerStore`) |
| `pinia-plugin-persistedstate` | Speichert Pinia-Stores im `localStorage` |
| `@iobroker/socket-client` | WebSocket-Verbindung zur ioBroker-Instanz (States lesen/schreiben) |
| `@iobroker/types` | TypeScript-Typen für ioBroker-Objekte und States |
| `@apollo/client` | GraphQL-Client (Cache, Queries, Mutations) |
| `@vue/apollo-composable` | Vue-Composables für Apollo (`useQuery`, `useMutation`) |
| `graphql` | GraphQL-Kernbibliothek (Parser, Typen), Peer von Apollo/Codegen |
| `@influxdata/influxdb-client` | Abfragen von Zeitreihen aus InfluxDB (Diagramme) |
| `reka-ui` | Headless-UI-Primitives, Basis der shadcn/vue-Komponenten |
| `class-variance-authority` | Varianten-Definition für Komponenten-Klassen (`cva`, z. B. Button-Varianten) |
| `clsx` | Bedingtes Zusammensetzen von CSS-Klassen |
| `tailwind-merge` | Löst kollidierende Tailwind-Klassen auf (`cn()`-Helper) |
| `tailwindcss-animate` | Animations-Utilities für Tailwind (shadcn Ein-/Ausblenden) |
| `@tailwindcss/forms` | Tailwind-Plugin mit Basis-Styles für Formularelemente |
| `@tailwindcss/vite` | Tailwind-v4-Integration als Vite-Plugin |
| `@lucide/vue` | Icon-Set (einzige Icon-Quelle im Projekt) |
| `@tanstack/vue-table` | Headless-Tabellenlogik (Sortierung, Pagination) für `TableBasic` |
| `@unovis/ts` | Chart-Bibliothek (Kern) |
| `@unovis/vue` | Vue-Wrapper für Unovis-Charts |
| `leaflet` | Interaktive Karten |
| `@vue-leaflet/vue-leaflet` | Vue-Komponenten für Leaflet |
| `vee-validate` | Formular-Validierung |
| `@vee-validate/zod` | Adapter: Zod-Schemas in vee-validate nutzen |
| `zod` | Schema-Validierung mit Typ-Inferenz |
| `@vueuse/core` | Sammlung nützlicher Composables (`useDebounceFn`, `useStorage`, …) |
| `@vueuse/router` | VueUse-Composables für Route-Query/-Params |
| `vite-svg-loader` | SVG-Dateien als Vue-Komponenten importieren |

## DevDependencies (Build, Test, Tooling)

### Build

| Paket | Zweck |
| --- | --- |
| `vite` | Dev-Server und Bundler |
| `@vitejs/plugin-vue` | Vite-Plugin zum Kompilieren von `.vue`-Dateien |
| `vite-plugin-pwa` | Macht die App zur PWA (Service Worker, Manifest, Updates) |
| `@vite-pwa/assets-generator` | Erzeugt PWA-Icons (`yarn generate-pwa-assets`) |
| `typescript` | TypeScript-Compiler |
| `vue-tsc` | Type-Check für `.vue`-Dateien (läuft in `yarn build`) |
| `@vue/language-server` | Vue Language Server (IDE-Support, Volar) |
| `@vue/compiler-core` | Vue-Compiler-Kern, Peer für Tooling |
| `tailwindcss` | Tailwind CSS v4 |
| `@tailwindcss/postcss` | Tailwind als PostCSS-Plugin |
| `postcss` | CSS-Transformation (Tailwind-Pipeline) |
| `sass` | SCSS-Unterstützung |
| `ts-node` | Führt TS-Skripte direkt aus (`release.ts`, `copy.ts`) |
| `@types/node` | Node-Typen für Configs und Skripte |

### GraphQL-Codegen

| Paket | Zweck |
| --- | --- |
| `@graphql-codegen/cli` | Generiert TS-Typen aus dem GraphQL-Schema (`yarn codegen`) |
| `@graphql-codegen/client-preset` | Preset für typisierte Client-Operationen (`graphql()`-Funktion) |
| `@graphql-codegen/introspection` | Exportiert das Schema als Introspection-JSON |

### Tests

| Paket | Zweck |
| --- | --- |
| `vitest` | Unit-Test-Runner |
| `@vitest/coverage-v8` | Coverage-Reports für Vitest (`yarn coverage`) |
| `jsdom` | Browser-DOM-Simulation für Vitest |
| `cypress` | E2E- und Component-Tests |
| `@cypress/vue` | Vue-Mounting für Cypress-Component-Tests |
| `@faker-js/faker` | Erzeugt Testdaten |

### Linting & Formatierung

| Paket | Zweck |
| --- | --- |
| `eslint` | Linter |
| `@eslint/js` | Empfohlene JS-Basisregeln |
| `@eslint/eslintrc` | Kompatibilität für alte `.eslintrc`-Configs (FlatCompat) |
| `typescript-eslint` | TypeScript-Parser und -Regeln für ESLint |
| `eslint-plugin-vue` | Vue-spezifische Lint-Regeln |
| `vue-eslint-parser` | Parser für `.vue`-Dateien in ESLint |
| `globals` | Vordefinierte globale Variablen (browser, node) für ESLint |
| `prettier` | Code-Formatierer |
| `prettier-plugin-tailwindcss` | Sortiert Tailwind-Klassen automatisch |

## `node_modules` neu installieren

Wenn sich Pakete komisch verhalten (z. B. `yarn codegen` scheitert mit `Invalid value used in weak set`, weil Babel 7 und 8 gemischt in `node_modules` liegen), passt `node_modules` meist nicht mehr zum `yarn.lock`. Dann neu installieren:

```bash
rm -rf ./node_modules                     # Git Bash
Remove-Item -Recurse -Force node_modules  # PowerShell
npx rimraf node_modules                   # überall

yarn install --frozen-lockfile
```

Tritt der Fehler danach wieder auf, mit `yarn why <paket>` prüfen, welche Dependency die falsche Version nachzieht.

## Resolutions

Die `resolutions` in `package.json` erzwingen Mindestversionen transitiver Pakete (`qs`, `esbuild`, `glob`, `minimatch`, …) – meist um Sicherheitslücken zu schließen. Nicht direkt im Code genutzt.
