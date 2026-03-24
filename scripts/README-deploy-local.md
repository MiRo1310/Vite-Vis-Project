Deploy local (update & upload)
================================

Dieses Script führt lokal die folgenden Schritte aus:

 1. Checkout `main`
 2. `git pull`
 3. `npm ci`
 4. `npm run build`
 5. Upload des Build-Ordners (`dist` per default) per SFTP auf einen lokalen Server

Konfiguration
-------------
Setze die folgenden Umgebungsvariablen vor dem Aufruf (PowerShell):

```powershell
$env:DEPLOY_HOST='192.168.1.100'
$env:DEPLOY_USER='deployuser'
$env:DEPLOY_REMOTE_DIR='/var/www/site'
$env:DEPLOY_PRIVATE_KEY_PATH="$env:USERPROFILE\.ssh\id_ed25519"
$env:DEPLOY_CLEAN='true'  # optional: entfernt remote vorher den Ordner
```

Alternativ kannst du auch `DEPLOY_PASSWORD` setzen (nicht empfohlen).

Aufruf
------

```powershell
npm run deploy:local
```

Fehlerbehandlung
----------------
Das Script bricht bei jedem Fehler (non-zero exit code) ab und gibt die Ursache aus.

Sicherheit
---------
Speichere keine privaten Keys im Repo. Verwende lokale Umgebungs­variablen oder deinen OS‑Keyring.

