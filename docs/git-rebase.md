# `git rebase` und `git rebase -i`

`git rebase` wird verwendet, um Commits auf einen anderen Basis-Commit zu setzen. Damit kannst du eine Branch-Historie sauberer machen oder einen Feature-Branch auf den aktuellen Stand von `main` bringen.

## Was ist der Unterschied?

### `git rebase`

Das normale `git rebase` verschiebt deine Commits auf einen neuen Ausgangspunkt.

Typisch ist zum Beispiel:

```bash
git checkout feature-branch
git rebase main
```

Das bedeutet:

- deine Branch-Commits werden auf den aktuellen Stand von `main` gesetzt
- die Commit-Historie wird neu geschrieben
- Commit-Hashes ändern sich

### `git rebase -i`

`git rebase -i` ist die interaktive Variante.

Damit kannst du Commits nicht nur verschieben, sondern auch bearbeiten, zusammenführen oder umbenennen.

Die übliche Schreibweise ist:

```bash
git rebase -i main
```

Dabei steht `-i` vor dem Ziel, weil es eine Option von `rebase` ist. So startest du den interaktiven Rebase auf der Basis von `main`.

Wenn du nur die letzten Commits aufräumen willst, kannst du auch einen relativen Bereich angeben:

```bash
git rebase -i HEAD~3
```

Das ist praktisch, wenn du nur deine letzten drei Commits bearbeiten möchtest.

Typische Aktionen sind:

- `pick` – Commit übernehmen
- `edit` – Commit anhalten und ändern
- `squash` – Commit mit dem vorherigen zusammenführen
- `fixup` – Commit mit dem vorherigen zusammenführen, aber die Commit-Message des vorherigen behalten
- `reword` – nur Commit-Message ändern
- `drop` – Commit entfernen

Etwas genauer:

- `pick`: Der Commit bleibt unverändert in der History.
- `edit`: Git stoppt bei diesem Commit, damit du ihn nachträglich ändern kannst.
- `squash`: Der Commit wird mit dem vorherigen Commit zusammengeführt und die Commit-Messages werden zusammengenommen.
- `fixup`: Der Commit wird mit dem vorherigen Commit zusammengeführt, aber die Commit-Message vom vorherigen Commit bleibt erhalten.
- `reword`: Nur die Commit-Message wird geändert, der Inhalt bleibt gleich.
- `drop`: Der Commit wird aus der History entfernt.

## Wofür nutzt man das?

### Normales `git rebase`

Nutze es, wenn du:

- einen Feature-Branch auf `main` aktualisieren willst
- Merge-Commits vermeiden möchtest
- eine lineare Historie bevorzugst

### `git rebase -i`

Nutze es, wenn du:

- mehrere kleine Commits aufräumen willst
- Commit-Messages verbessern möchtest
- versehentlich zu viele Zwischen-Commits gemacht hast
- Commits sinnvoll zusammenfassen willst

## Einfacher Ablauf

### 1. Rebase starten

```bash
git rebase -i HEAD~3
```

Das öffnet die letzten 3 Commits in einem Editor.

Wenn der Editor `vim` ist:

- speichern und beenden: `Esc`, `:wq`, `Enter`
- ohne Speichern beenden: `Esc`, `:q!`, `Enter`

### 2. Aktion auswählen

Beispiel:

```text
pick   a1b2c3d Erster Commit
edit   b2c3d4e Zweiter Commit
squash c3d4e5f Dritter Commit
```

### 3. Änderungen durchführen

Wenn du `edit` benutzt:

Git hält an dieser Stelle an. Danach kannst du die Dateien normal ändern, die Änderungen mit `git add` übernehmen und den Commit mit `git commit --amend` aktualisieren.

```bash
# Dateien ändern
git add .
git commit --amend
git rebase --continue
```

### 4. Fertigstellen

Wenn der Rebase durchgelaufen ist, ist die Historie neu geschrieben.

## Wichtige Warnung

`rebase` schreibt die History um.

Das heißt:

- Commit-Hashes ändern sich
- andere Entwickler bekommen die alte Historie nicht mehr 1:1
- bei bereits gepushten Branches brauchst du oft ein Force-Push

```bash
git push --force-with-lease
```

`--force-with-lease` ist sicherer als ein normales `--force`, weil es nicht blind überschreibt.

## Beispiel: Commits aufräumen

Angenommen, du hast diese Commits:

- `fix typo`
- `add button`
- `adjust styles`

Dann kannst du mit `git rebase -i` daraus zum Beispiel machen:

- einen sauberen Commit für das Feature
- eine bessere Commit-Message
- weniger unnötige Zwischenstände

## Kurz gesagt

- `git rebase` = Branch auf neue Basis setzen
- `git rebase -i` = Commits zusätzlich bearbeiten
- gut für saubere Historien
- vorsichtig sein, wenn der Branch schon geteilt wurde

