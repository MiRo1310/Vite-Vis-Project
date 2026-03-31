Deploy local (Update + Build + Upload)
======================================

Dieses Script führt den lokalen Deploy-Prozess in einem Rutsch aus:

1. Wechsel auf `main`
2. `git pull`
3. Abhängigkeiten installieren
4. Projekt bauen
5. Den Inhalt des Build-Ordners (`dist`) per SFTP auf einen lokalen Server hochladen

Voraussetzungen
---------------

- Git ist lokal verfügbar
- Node.js und Yarn/NPM sind installiert
- Der Zielserver ist per SFTP/SSH erreichbar

Konfiguration
-------------

Vor dem Aufruf die folgenden Umgebungsvariablen in der env setzen:

VITE_HOST=
VITE_USERNAME=
VITE_PATH=

Versionen setzen
-----------------

Für den Build können zusätzlich Versionsinformationen gesetzt werden. Das ist sinnvoll, wenn die App die Version im Frontend anzeigen soll.

### Automatisch über das Release-Skript

Wenn du `scripts/release.ts` verwendest, werden die Versionswerte automatisch gesetzt:

- `VITE_APP_VERSION` kommt aus der `package.json`

Damit bekommst du im Build immer eine nachvollziehbare Version.

Wenn du lieber einen einmaligen Aufruf möchtest, kannst du die Variablen auch direkt in der aktuellen Shell-Session setzen und dann das Deploy-Skript starten.

Aufruf
------

```powershell
yarn run deploy:local patch
yarn run deploy:local minor
yarn run deploy:local major
```

Fehlerbehandlung
----------------

Das Script bricht bei jedem Fehler mit einem non-zero Exit-Code ab und gibt die Ursache aus.

Sicherheit
----------

Speichere keine privaten Keys im Repo. Verwende lokale Umgebungsvariablen oder den OS-Keyring.

