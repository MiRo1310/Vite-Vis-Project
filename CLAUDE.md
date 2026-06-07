# CLAUDE.md — Vite-Vis-Project

## Projekt-Überblick

Vue 3 + Vite Visualisierungs-Frontend für ioBroker-Daten (Smart Home Dashboard).
Verbindet sich über `@iobroker/socket-client` mit einer ioBroker-Instanz und stellt Sensor- und Systemdaten dar.

**Stack:** Vue 3 · TypeScript · Vite · Pinia · Tailwind CSS · shadcn/vue (radix-vue / reka-ui) · Apollo/GraphQL · Vitest · Cypress

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
    ui/           # shadcn-Komponenten (Card, Progress, Tabs, Dialog, …)
    shared/       # Wiederverwendbare App-Komponenten (Page, Button, ToggleCard, …)
      card/       # ToggleCard und andere Card-Varianten
      table/      # TableBasic, LogTable, …
    section/      # Seitenspezifische Abschnitte (home/, …)
    layout/       # Layout-Komponenten (PageHeader, …)
  lib/            # Reine Utility-Funktionen (testbar, kein Vue-Overhead)
  pages/vis/      # Seiten (home.vue, system.vue, heat-pump.vue, …)
  store/          # Pinia Stores (ioBrokerStore, app-store, …)
```

---

## Coding-Regeln

### Komponenten
- **Ausschließlich shadcn-Komponenten** aus `@/components/ui/` verwenden — kein rohes HTML für UI-Elemente wenn eine shadcn-Komponente existiert.
- Verfügbare shadcn-Komponenten: `Card`, `CardHeader`, `CardTitle`, `CardContent`, `CardFooter`, `CardDescription`, `Progress`, `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`, `Dialog`, `Sheet`, `Switch`, `Checkbox`, `Select`, `Table`, `Collapsible`, `Toast`, `Input`, `Label`, `Textarea`, `DropdownMenu`, `Pagination`.
- Neue shadcn-Wrapper werden in `src/components/ui/<name>/` angelegt (Vorbild: `Collapsible` mit `reka-ui`, nicht `radix-vue`).
- Wiederverwendbare App-Komponenten (mit Business-Logik) kommen in `src/components/shared/`.

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

## Design-Konzept (Dashboard-Seiten)

### Grundprinzip
Kompakte Datenkarten in einem Grid-Layout — wenig Whitespace, viel Information auf einen Blick.

### Card-Padding-Override
Die shadcn `Card` hat standardmäßig `py-6 gap-6` — das ist für Dashboard-Ansichten zu viel.
**Immer** mit `class="py-0 gap-0"` überschreiben und Padding manuell via Header/Content setzen:

```vue
<Card class="py-0 gap-0">
  <CardHeader class="px-3 pt-2 pb-0">
    <CardTitle class="text-xs text-muted-foreground">Titel</CardTitle>
  </CardHeader>
  <CardContent class="px-3 pt-1 pb-2">
    <!-- Inhalt -->
  </CardContent>
</Card>
```

### Seitenstruktur mit Tabs
Seiten mit viel Inhalt (Daten + Logs) werden mit `Tabs` aufgeteilt:
- **Tab "Daten"**: alle Metrikkarten
- **Tab "Logs"**: LogTable mit fixem Header

```vue
<Tabs default-value="daten">
  <TabsList class="mb-3">
    <TabsTrigger value="daten">Daten</TabsTrigger>
    <TabsTrigger value="logs">Logs</TabsTrigger>
  </TabsList>
  <TabsContent value="daten" class="space-y-3"> … </TabsContent>
  <TabsContent value="logs"> … </TabsContent>
</Tabs>
```

### Abschnitts-Überschriften
Vor jeder Card-Gruppe eine kleine Label-Zeile:
```vue
<p class="text-xs text-muted-foreground uppercase tracking-wide mb-1.5">Abschnitt</p>
```

### Status-Indikatoren (Boolean-Werte)
Farbige Dots statt Text-Badges:
```vue
<!-- Groß (Aktionskarten): h-2 w-2 -->
<span :class="['h-2 w-2 rounded-full shrink-0', active ? 'bg-green-400' : 'bg-red-400']" />

<!-- Klein (Detailzeilen): h-1.5 w-1.5 -->
<span :class="['h-1.5 w-1.5 rounded-full shrink-0', active ? 'bg-green-400' : 'bg-muted-foreground/30']" />
```
Farbkonvention: grün = aktiv/gut, rot = inaktiv/Problem, gelb = läuft/Warnung, `muted-foreground/30` = inaktiv/neutral.

### Datenkarten (`DataCard`)
Für alle reinen Anzeigewerte `DataCard` aus `@/components/shared/card` verwenden statt roher shadcn-Card:

```vue
<DataCard title="Bezeichnung">
  <span class="text-sm font-semibold">Wert</span>
</DataCard>

<!-- Mit zusätzlichen Content-Klassen (z.B. flex für Dot + Text): -->
<DataCard title="Status" content-class="flex items-center gap-1.5">
  <span class="h-2 w-2 rounded-full bg-green-400" />
  <span class="text-sm font-semibold">An</span>
</DataCard>
```

`DataCard` kapselt das Padding-Konzept (`py-0 gap-0`, `px-3 pt-2 pb-0` Header, `px-3 pt-1 pb-2` Content) und reduziert Boilerplate von ~10 auf 3 Zeilen pro Karte.

### Editierbare ioBroker-Werte (`InputIobroker`)
Für schreibbare ioBroker-States **niemals** ein rohes Input oder `InputShadcn` mit eigenem Watcher/Debounce bauen — stattdessen `InputIobroker` aus `@/components/shared/input` nutzen:

```vue
<InputIobroker :state="pool?.tempSet" unit="°C" />
```

Vorteile gegenüber manuellem Ansatz:
- Debounce (1000ms default) eingebaut
- `setState` verwendet automatisch die `state.id` — keine hardcodierten State-IDs
- Zeigt roten Border wenn `state.ack === false` (Wert noch nicht vom Gerät bestätigt)
- Synct `modelValue` automatisch wenn sich der Store-Wert ändert

Editierbare Werte kommen in eine eigene **Einstellungen**-Sektion, nicht in die Anzeige-Cards (Temperaturen, Status).

### Klickbare Aktionskarten (`ToggleCard`)
Für schaltbare Geräte keine Buttons, sondern `ToggleCard` aus `@/components/shared/card`:
```vue
<ToggleCard title="Gerätename" :active="boolean" @click="toggleFn" />
```
Die Karte zeigt farbigen Border (grün/rot), Status-Dot und "An"/"Aus" Text. Hover-Effekt via `hover:bg-accent`.

### Temperaturwerte
- Eingang: `text-blue-300`
- Ausgang: `text-orange-300`
- Soll: Standard-Farbe

### Destruktive Aktionen
Buttons die Daten löschen/zurücksetzen: `variant="destructive"`.

---

## Tabellen mit fixem Header

`TableBasic` unterstützt sticky Header und scrollbare Höhe via `wrapperClass`:

```vue
<LogTable :logs="logs" wrapper-class="max-h-[calc(100vh-220px)]" />
```

Technisch: `TableHeader` hat `sticky top-0 z-10 bg-card`, `wrapperClass` landet auf dem `overflow-auto`-Wrapper von `Table.vue`.

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

### JSON-Daten aus ioBroker
`toJSON<T>()` aus `@michaelroling/ts-library` gibt `{ json: T | null, isValidJson: boolean }` zurück.
Immer `.json` extrahieren:
```ts
const data = computed(() => toJSON<MyType>(iobroker.pool?.someJSON?.val ?? "").json);
```

---

## Tests

- **Unit-Tests:** Vitest, Dateien als `*.spec.ts` neben der Quelldatei in `src/lib/`.
- **E2E / Component-Tests:** Cypress in `cypress/`.
- Tests werden mit `yarn test` oder `yarn coverage` ausgeführt.
- Testbeispiel: `src/lib/system.spec.ts` für `miBToGiB` und `formatUptime`.
