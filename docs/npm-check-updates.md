# `npm-check-updates` im Projekt verwenden

Diese Doku beschreibt, wie du Dependencies mit `npm-check-updates` (`ncu`) sicher aktualisierst, ohne aus Versehen Major-Versionen mitzuziehen.

## Wofür ist das gut?

`npx npm-check-updates -u --peer`:

- liest die Versionen in `package.json`
- prüft zusätzlich auch Peer-Dependencies mit `--peer`
- schreibt die gefundenen Updates direkt in `package.json`

Wichtig: **Major-Updates werden dabei nicht automatisch ausgeschlossen**. Wenn du eine Major-Version vermeiden willst, musst du das extra angeben.

## Sichere Update-Varianten

### Nur Minor- und Patch-Updates

```bash
npx npm-check-updates -u --peer --target minor
```

Damit werden keine Major-Versionen übernommen.

### Nur Patch-Updates

```bash
npx npm-check-updates -u --peer --target patch
```

Das ist die konservativste Variante.

### Einzelne Pakete ausschließen

```bash
npx npm-check-updates -u --peer --target minor --reject vite,vitest
```

`--reject` ist sinnvoll, wenn bestimmte Pakete bewusst auf ihrer aktuellen Major-Version bleiben sollen.

### Nur bestimmte Pakete aktualisieren

```bash
npx npm-check-updates -u --peer --filter vue,vite,vitest
```

Das ist praktisch, wenn du nur eine kleine Gruppe gezielt anfassen willst.

## Empfehlung für dieses Projekt

In diesem Repository sind vor allem diese Pakete update-sensibel:

- `vue`
- `vite`
- `vitest`
- `cypress`
- `typescript`
- `@vue/*`
- `@vitejs/*`
- `@tailwindcss/*`

Für einen normalen Wartungs-Run ist meist sinnvoll:

```bash
npx npm-check-updates -u --peer --target minor
```

Danach:

```bash
yarn install
yarn build
yarn test
```

Wenn du nur prüfen willst, welche Updates verfügbar sind, ohne etwas zu ändern:

```bash
npx npm-check-updates --peer
```

## Verhalten unter Yarn v1

Dieses Projekt nutzt `yarn@1.22.22`.

Das heißt:

- `ncu` ändert nur `package.json`
- danach sorgt `yarn install` für die Aktualisierung von `yarn.lock`
- auf Windows kann `yarn install` bei gesperrten Dateien mit `EPERM` scheitern

Wenn das passiert, hilft oft:

1. laufende Dev-Server schließen
2. IDE schließen oder `node_modules`-Zugriffe beenden
3. `yarn install` erneut ausführen

## Praktischer Workflow

1. Updates anzeigen:
   ```bash
   npx npm-check-updates --peer
   ```
2. Kleine Updates übernehmen:
   ```bash
   npx npm-check-updates -u --peer --target minor
   ```
3. Abhängigkeiten neu installieren:
   ```bash
   yarn install
   ```
4. Projekt prüfen:
   ```bash
   yarn build
   yarn test
   ```

## Wann `--reject` sinnvoll ist

Benutze `--reject`, wenn du bewusst bestimmte Pakete von der Aktualisierung ausnehmen willst, zum Beispiel:

- große Framework-Sprünge
- Pakete mit noch nicht passender Peer-Abhängigkeit
- Pakete, die durch ein anderes Tool bereits separat gepflegt werden

Beispiel:

```bash
npx npm-check-updates -u --peer --target minor --reject vite,typescript,cypress
```

## Kurzfassung

- `--peer` berücksichtigt Peer-Dependencies
- Major-Updates werden **nicht automatisch** ausgeschlossen
- Für sichere Updates: `--target minor`
- Für Ausnahmen: `--reject`
- Für gezielte Updates: `--filter`

