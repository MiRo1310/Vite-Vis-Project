# Refactor: ioBroker-Store — Typsicherheit & Value-Klassen

## Problem

Aktuell (`src/store/ioBrokerStore.ts`, `src/iobroker-states/subscribed-states.iobroker.ts`):

- Der `iobroker`-State startet leer: `iobroker: empty<IobrokerChannels>()` (`store/ioBrokerStore.ts:16`).
- `setValues()` legt Channel-/Group-Container erst beim Eintreffen der **ersten** Nachricht an:
  ```ts
  obj[p] ??= {}; // store/ioBrokerStore.ts:72
  ```
  → `iobroker.pool`, `iobroker.landroid`, `iobroker.batteries["HMIP Buero"]` etc. sind so lange `undefined`, bis die erste ioBroker-Nachricht für diesen Pfad ankommt.
- Jede Komponente muss das mit `?.`-Chains oder Helpern (`getStoreValNumber`, `getStoreValBoolean`, `getStoreValString` aus `src/lib/object.ts`) abfangen — Boilerplate an >30 Stellen.
- `StoreValueClass<T>` (`store/ioBrokerStore.ts:86-108`) ist eine einzige generische Klasse für **alle** Werttypen. Kein Platz für typspezifisches Verhalten — JSON-Parsing wird stattdessen an jeder Verwendungsstelle händisch gemacht:
  ```ts
  toJSON<WattPilotJson>(iobroker.wattPilot?.jsonScriptChargeLevel?.val ?? "").json
  ```
  (siehe `Info.vue`, `Pool.vue`, `ioBrokerStore.ts` `getParsedLogs`).
- `IobrokerChannels` (Typ-Interface) und `iobrokerData` (Laufzeit-Subscription-Array) in `subscribed-states.iobroker.ts` werden **händisch parallel** gepflegt — neues Feld vergessen heißt: Typfehler erst zur Laufzeit sichtbar, oder gar nicht.

## Zielarchitektur (Entscheidung)

1. **Channel-/Group-Container werden eager angelegt** — `iobroker.pool` existiert immer, kein `iobroker.pool?.` mehr nötig.
   **Einzelne `.val`-Felder bleiben aber `ValueClass<T> | undefined`** bis zur ersten echten Nachricht — kein künstlicher Default-Wert (kein `tempSet` defaultet auf `0`), kein zusätzliches `received`-Flag. Das vermeidet, dass ein Default-Wert (`0`, `false`, `""`) versehentlich als reale Messung interpretiert wird.
2. **Single Source of Truth**: `IobrokerChannels` wird aus `iobrokerData` per TS-Mapped-Types abgeleitet, nicht mehr manuell parallel gepflegt. Ein neues Feld hinzufügen heißt: ein Eintrag in `iobrokerData`, fertig — der Typ ergibt sich automatisch.
3. **Per-Type Value-Klassen** ersetzen die generische `StoreValueClass<T>`, vor allem für JSON-Felder (`.parsed`-Getter statt manuellem `toJSON()`-Aufruf an jeder Stelle).
4. **Dynamische Subscriptions** (`useDynamicSubscribe`, Laufzeit-IDs außerhalb des statischen Schemas) bleiben wie bisher lazy (`??=`) — Eager-Init betrifft nur das in `iobrokerData` deklarierte statische Schema.

---

## 1. Value-Klassen

Neue Datei z.B. `src/store/values.ts`:

```ts
import { toJSON } from "@michaelroling/ts-library";
import type { IobrokerState } from "...";

export abstract class BaseValue<T> {
  public id: string;
  public ack: boolean;
  public ts?: number;
  public lc?: number;
  public from?: string;
  public q?: number;
  public val: T;

  constructor(state: IobrokerState & { id: string; val: T }) {
    this.id = state.id;
    this.val = state.val;
    this.ack = state.ack;
    this.ts = state.ts;
    this.lc = state.lc;
    this.from = state.from;
    this.q = state.q;
  }

  // In-place Update statt Neu-Erzeugen (Objektidentität bleibt erhalten,
  // relevant für evtl. spätere Memoization/Caching wie bei JsonValue).
  public update(state: IobrokerState & { val: T }): void {
    this.val = state.val;
    this.ack = state.ack;
    this.ts = state.ts;
    this.lc = state.lc;
    this.from = state.from;
    this.q = state.q;
  }

  public get(fallback: T): T {
    return this.val ?? fallback;
  }
}

export class NumberValue extends BaseValue<number> {}
export class BooleanValue extends BaseValue<boolean> {}
export class StringValue extends BaseValue<string> {}

// JSON-Felder: automatisches, gecachtes Parsen statt manuellem toJSON() an jeder Verwendungsstelle.
export class JsonValue<T> extends BaseValue<string> {
  #cache?: { raw: string; parsed: T | null };

  public get parsed(): T | null {
    if (!this.#cache || this.#cache.raw !== this.val) {
      this.#cache = { raw: this.val, parsed: toJSON<T>(this.val).json };
    }
    return this.#cache.parsed;
  }

  public override update(state: IobrokerState & { val: string }): void {
    super.update(state);
    // Cache wird lazy beim nächsten .parsed-Zugriff invalidiert (raw-Vergleich oben).
  }
}
```

`StoreValueClass` kann danach entfernt werden, sobald alle Verwendungsstellen umgestellt sind (Schritt 5).

**Tests:** `src/store/values.spec.ts` — Default-/Update-Verhalten, `JsonValue.parsed` (gültiges JSON, invalides JSON, Cache wird bei gleichem `val` nicht neu geparst, bei geändertem `val` neu geparst).

---

## 2. Schema-Eintrag um Value-Klasse erweitern

Aktuell (`subscribed-states.iobroker.ts`):

```ts
{ id: "midas-aquatemp.0.tempSet", key: "tempSet" }
```

Neu — jeder Eintrag bekommt eine Factory, die sowohl zur Laufzeit die richtige Klasse liefert als auch zur Typableitung dient:

```ts
{ id: "midas-aquatemp.0.tempSet", key: "tempSet", value: () => NumberValue }
```

Für JSON-Felder mit konkretem Payload-Typ:

```ts
{
  id: "0_userdata.0.Wärmepumpe.Wärmepumpe_schalten_script",
  key: "heaterScriptActivateJSON",
  value: () => jsonValue<HeatingPumpScriptJson>(),
}
```

wobei `jsonValue<T>()` ein kleiner Helfer ist, der nur zur Typableitung existiert (liefert zur Laufzeit einfach `JsonValue`, trägt aber das Generic `T` für die Typ-Inferenz):

```ts
type ValueCtor<T> = new (state: IobrokerState & { id: string; val: T }) => BaseValue<T>;

export function jsonValue<T>(): ValueCtor<string> & { __payload?: T } {
  return JsonValue as any;
}
```

> **Spike nötig:** Die Typ-Ableitung von `IobrokerChannels` aus `iobrokerData` per Mapped Types ist nontrivial (ähnlich dem bestehenden `FlatKeys`/`GroupKeys`-Muster in `subscribed-states.iobroker.ts:5-13`, aber jetzt zusätzlich mit Werttyp-Extraktion aus der Factory). Vor der Vollmigration ein Prototyp mit 2-3 Channels bauen und prüfen, ob TS das sauber inferiert (`ReturnType<typeof entry.value>` → Instanztyp → `val`-Typ).

Grobe Richtung für die Typableitung:

```ts
type EntryValueType<E> = E extends { value: () => infer C }
  ? C extends new (...args: any[]) => BaseValue<infer V>
    ? V
    : never
  : never;

// FlatId-Einträge -> { [key]: ValueCtorInstanz<V> | undefined }
// GroupedId-Einträge -> { [group]: { [key]: ValueCtorInstanz<V> | undefined } }
// IobrokerChannels = Union/Merge über alle channel-Einträge von iobrokerData
```

---

## 3. Eager Skeleton bauen

Neue Funktion (z.B. `src/iobroker-states/skeleton.ts`):

```ts
export function createEmptyIobrokerSkeleton(data: readonly IobrokerSubscription[]): IobrokerChannels {
  const result: any = {};
  for (const entry of data) {
    result[entry.channel] ??= {};
    for (const item of entry.value) {
      if ("group" in item && item.group) {
        result[entry.channel][item.group] ??= {};
        // Leaf bleibt undefined — nur der Container wird angelegt.
      }
      // Kein Eintrag für den Leaf-Key selbst: bleibt implizit undefined,
      // bis setValues() ihn beim ersten Update setzt.
    }
  }
  return result;
}
```

Store-Init (`store/ioBrokerStore.ts`):

```ts
state: (): IoBrokerStoreState => ({
  adminConnectionEstablished: false,
  idsToControl: empty<IdsToControl>(),
  subscribedIds: [],
  iobroker: createEmptyIobrokerSkeleton(iobrokerData), // statt empty<IobrokerChannels>()
}),
```

---

## 4. `setValues` umbauen

Da die Container (Channel + Group) jetzt immer existieren, entfällt `??=` für den statischen Teil. Zusätzlich: passende Value-Klasse statt generischer `StoreValueClass` instanziieren/updaten:

```ts
setValues({ val, id, key, channel, group, state, ValueClass }: SetValues): void {
  const iobroker = this.getState["iobroker"];
  const container = group ? iobroker[channel][group] : iobroker[channel];
  // container existiert dank Skeleton bereits (statisches Schema) — Ausnahme: dynamisch
  // zur Laufzeit hinzugefügte Subscriptions außerhalb des Schemas (useDynamicSubscribe),
  // dafür weiterhin Fallback:
  if (group) {
    iobroker[channel] ??= {};
    iobroker[channel][group] ??= {};
  } else {
    iobroker[channel] ??= {};
  }

  const target = group ? iobroker[channel][group] : iobroker[channel];
  const existing = target[key];
  if (existing instanceof ValueClass) {
    existing.update({ ...state, val, id }); // in-place, Objektidentität bleibt erhalten
  } else {
    target[key] = new ValueClass({ ...state, val, id });
  }

  this.iobroker = iobroker;
}
```

`ValueClass` kommt aus dem Schema-Eintrag (`iobrokerData`) und wird vom Aufrufer (`subscribe()` in `src/lib/iobroker-service.ts`) mitgegeben, statt wie bisher generisch `new StoreValueClass(...)` zu bauen.

---

## 5. Alte Definitionen entfernen

- `IobrokerChannels`-Interface (`subscribed-states.iobroker.ts:55-596`) löschen, sobald der Typ vollständig aus `iobrokerData` abgeleitet wird.
- `StoreValueClass` löschen, sobald keine Verwendungsstelle mehr darauf zeigt.
- `StoreValue<T>` Typ-Alias anpassen/entfernen (ersetzt durch die konkreten Value-Klassen).

---

## 6. Komponenten migrieren

- `?.`-Channel-Checks entfernen, z.B. `LawnMover.vue`:
  ```ts
  // vorher
  const landroid = iobroker.landroid;
  if (!landroid) { return []; }
  // nachher
  const landroid = iobroker.landroid; // existiert immer
  ```
  (`.val`-Zugriffe auf einzelne Felder bleiben optional, also `landroid.battery?.val`.)
- `toJSON(x?.val ?? "").json`-Stellen durch `JsonValue.parsed` ersetzen, z.B. `Info.vue`:
  ```ts
  // vorher
  toJSON<WattPilotJson>(iobroker.wattPilot?.jsonScriptChargeLevel?.val ?? "").json
  // nachher
  iobroker.wattPilot.jsonScriptChargeLevel?.parsed
  ```
- `getParsedLogs` in `ioBrokerStore.ts` analog vereinfachen.
- Helper `getStoreValNumber`/`getStoreValBoolean`/`getStoreValString` (`src/lib/object.ts`) bleiben für den Leaf-Fallback weiterhin sinnvoll (Leaf ist und bleibt optional) — nur die Channel-Existenz-Checks entfallen.

---

## 7. Migrationsreihenfolge

Nicht alle 30+ Channels auf einmal umstellen. Vorschlag:

1. Value-Klassen + Tests (Schritt 1) — isoliert, kein Breaking Change.
2. Schema-Erweiterung + Typ-Ableitungs-Spike an 2-3 kleinen Channels (`trash`, `wattPilot`) parallel zum bestehenden `IobrokerChannels`-Interface (beide Typen müssen vorerst kompatibel sein, z.B. via `satisfies`-Check).
3. Sobald der Spike sauber funktioniert: restliche Channels migrieren (`landroid`, `pool`, `batteries`, …), dabei jeweils zugehörige Komponenten anpassen.
4. Erst zum Schluss `IobrokerChannels`-Interface und `StoreValueClass` entfernen.

---

## 8. Offene Punkte / Risiken

- **Mapped-Type-Komplexität**: Die Ableitung von `IobrokerChannels` aus `iobrokerData` inkl. Werttyp-Extraktion aus der Factory ist der riskanteste Teil — ggf. scheitert TS an der Inferenztiefe bei 30+ Channels und vielen Gruppen (siehe `batteries`-Channel mit 30+ Geräte-Gruppen). Falls das nicht praktikabel ist: Fallback ist, das Interface weiter manuell zu pflegen, aber zumindest die Value-Klassen + Eager-Skeleton umzusetzen (bringt schon den Großteil des Nutzens).
- **`invertValue`-Handling** (aktuell in `iobroker-service.ts:78`) muss beim Umbau von `setValues` erhalten bleiben.
- **`batteries`-Channel** hat dynamische Gruppen-Namen as Strings (Gerätenamen) — beim Skeleton-Bau müssen auch diese Gruppen vorab aus dem Schema bekannt sein (sind sie, da `iobrokerData` sie explizit auflistet).
