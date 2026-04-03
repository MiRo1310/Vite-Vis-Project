# `web-types` im Projekt

Diese Datei beschreibt Metadaten für JetBrains-IDE-Unterstützung in Vue-Dateien.

## Wofür ist `web-types.json` da?

`web-types.json` hilft der IDE dabei, eigene Vue-Directives, Komponenten oder Attribute besser zu verstehen.
Dadurch bekommst du zum Beispiel:

- Autocomplete
- passende Beschreibungen im Editor
- bessere Code-Insight-Unterstützung

## In diesem Projekt

Im Projekt ist hier die Directive `e2e` eingetragen.
Sie ist dafür gedacht, Elemente im DOM für End-to-End-Tests eindeutig zu markieren.

Beispiel:

```vue
<input v-e2e="recipe-name" />
```

Die IDE kann diese Directive dann als bekannt anzeigen und bei der Eingabe unterstützen.

## Wichtig

`web-types.json` ist **keine Laufzeit-Logik** für Vue.
Die Datei dient vor allem der Entwicklererfahrung in JetBrains-Produkten.

Die eigentliche Directive muss im Code auch wirklich registriert sein, damit sie in Vue verwendet werden kann.

## Kurz gesagt

- `web-types.json` verbessert die IDE-Unterstützung
- `e2e` ist eine Projekt-Directive für Test-Selektoren
- die Datei ist vor allem für Autocomplete und Hinweise gedacht

