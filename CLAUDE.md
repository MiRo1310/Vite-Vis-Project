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
      card/       # DataCard, ToggleCard
      input/      # InputIobroker (debounced, ack-aware)
      page/       # Page.vue — Seitenwrapper mit Titel + Icon-Nav
      table/      # TableBasic, LogTable
    section/      # Seitenspezifische Abschnitte (home/, alexa/, light/, …)
    layout/       # DarkMode-Toggle (wird von Page.vue eingebunden)
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
Seiten mit viel Inhalt werden mit `Tabs` aufgeteilt. Typische Tab-Kombinationen:
- **Daten + Logs** (z.B. Wärmepumpe, System)
- **Daten + Diagramme** (z.B. Heizung, PV, Energie)

```vue
<Tabs default-value="daten">
  <TabsList class="mb-3">
    <TabsTrigger value="daten">Daten</TabsTrigger>
    <TabsTrigger value="diagramme">Diagramme</TabsTrigger>
  </TabsList>
  <TabsContent value="daten" class="space-y-3"> … </TabsContent>
  <TabsContent value="diagramme" class="space-y-3"> … </TabsContent>
</Tabs>
```

Innerhalb eines Tab-Contents immer `class="space-y-3"` für gleichmäßigen Abstand zwischen Abschnitten. Jeder Abschnitt beginnt mit einer `<p class="text-xs text-muted-foreground uppercase tracking-wide mb-1.5">` Überschrift gefolgt von einem Grid.

**Seiten-Grid für DataCards:** `grid grid-cols-2 sm:grid-cols-4 gap-2` — 2 Spalten auf Mobile, 4 auf Desktop.

**Seiten nutzen `Page`-Wrapper** aus `@/components/shared/page/Page.vue` für Titel + PageHeader-Navigation. Buttons für Sub-Routen kommen in den `#header`-Slot. `Page.vue` selbst enthält einen kompakten Icon-Button-Strip (Plane → Navigation, Home → Startseite, DarkMode-Toggle) als einheitliche Navigation auf jeder Seite:

```vue
<Page title="Heizung">
  <template #header>
    <!-- Button muss RouterLink wrappen (asChild), nicht umgekehrt: -->
    <Button variant="outline" size="sm" as-child>
      <RouterLink :to="routes.heatingControl.path">Steuerung</RouterLink>
    </Button>
  </template>
  <Tabs …> … </Tabs>
</Page>
```

**`as-child`-Regel:** Immer `Button as-child > RouterLink`, nie `RouterLink > Button as-child`. Letzteres verhindert korrekte Klassen-Weitergabe.

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
  <StatusDot :active="true" />
  <span class="text-sm font-semibold">An</span>
</DataCard>

<!-- Klickbar mit Button-Hover-Effekt: -->
<DataCard title="Updates" clickable @click="navigate">
  <span class="text-sm font-semibold">3</span>
</DataCard>
```

`DataCard` kapselt das Padding-Konzept (`py-0 gap-0`, `px-3 pt-2 pb-0` Header, `px-3 pt-1 pb-2` Content) und reduziert Boilerplate von ~10 auf 3 Zeilen pro Karte.

Props:
- `title` — Kartenüberschrift (muted, xs)
- `content-class` — zusätzliche Klassen für den Content-Bereich
- `clickable` — aktiviert `hover:bg-accent hover:text-accent-foreground` + Fokus-Ring (identisch zu Button outline-Hover)

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
<!-- Standard (grün aktiv / rot inaktiv) — z.B. Wärmepumpe, Heizung: -->
<ToggleCard title="Gerätename" :active="boolean" @click="toggleFn" />

<!-- Licht-Variante (gelb aktiv mit Glow / neutral inaktiv): -->
<ToggleCard color="yellow" title="Licht Name" :active="boolean" @click="toggleFn" />
```

Props:
- `title` — Kartenüberschrift
- `active` — Zustand
- `color?: "green" | "yellow"` — Standard `green`: aktiv=grüner Border+Dot, inaktiv=roter Border+Dot. `yellow`: aktiv=gelber Border+Dot+Glow, inaktiv=kein Border, gemuteter Dot

Farbkonvention: `green` für On/Off-Geräte (Pumpen, Heizung), `yellow` für Lichtquellen.

### Temperaturwerte
- Eingang: `text-blue-300`
- Ausgang: `text-orange-300`
- Soll: Standard-Farbe

### Destruktive Aktionen
Buttons die Daten löschen/zurücksetzen: `variant="destructive"`.

### Inline-Inputs neben Switch/Checkbox
Wenn ein kleines Zahlenfeld inline neben einem `Switch` steht, **kein `InputShadcn`** verwenden — der Wrapper-Div hat `h-7` aber der innere `<input>` ist fix `h-9`, was `items-center`-Alignment bricht. Stattdessen natives `<input>` mit expliziter Höhe:

```vue
<input
  v-model.number="value"
  type="number"
  class="w-14 h-6 rounded-md border border-input bg-transparent text-xs text-center focus:outline-none focus:ring-1 focus:ring-ring"
  @change="onUpdate"
/>
```

### Tailwind responsive Konflikte
Wenn eine Klasse wie `hidden sm:block` auf einem Element ein Grid-Layout überschreibt, Tailwind `!`-Modifier nutzen:
```vue
<!-- Falsch: sm:block überschreibt display:grid -->
<div class="hidden sm:grid grid-cols-2">

<!-- Richtig: !important verhindert Überschreibung -->
<div class="hidden sm:grid! grid-cols-2">
```

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
