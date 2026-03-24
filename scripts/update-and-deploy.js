#!/usr/bin/env node
/*
 scripts/update-and-deploy.js

 Lokales Hilfsscript zum:
  - git checkout main
  - git pull
  - npm ci
  - npm run build
  - Upload des Build-Ordners (z.B. dist/) auf einen lokalen Server per SFTP

 Konfiguration erfolgt über Umgebungsvariablen (oder .env.local, siehe README unten):
  DEPLOY_HOST, DEPLOY_PORT, DEPLOY_USER, DEPLOY_REMOTE_DIR, DEPLOY_PRIVATE_KEY_PATH, DEPLOY_PASSWORD, DEPLOY_CLEAN

 Nutzung:
  npx node ./scripts/update-and-deploy.js
  oder in package.json: "deploy:local": "node ./scripts/update-and-deploy.js"

 Das Script ist bewusst defensiv: prüft Exit-Codes, bricht bei Fehlern ab.
*/

import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import Client from "ssh2-sftp-client";

function run(cmd, args, opts = {}) {
  // eslint-diable-next-line
  console.log(`> ${cmd} ${args.join(" ")}`);
  const res = spawnSync(cmd, args, { stdio: "inherit", shell: false, ...opts });
  if (res.error) {
    console.error("Command failed to start:", res.error);
    process.exit(1);
  }
  if (res.status !== 0) {
    console.error(`Command failed: ${cmd} ${args.join(" ")} (exit ${res.status})`);
    process.exit(res.status || 1);
  }
}

async function uploadDirSftp(sftp, localDir, remoteDir) {
  // Ensure remoteDir exists (mkdir -p)
  try {
    await sftp.mkdir(remoteDir, true);
  } catch (e) {
    // ignore
  }
  const items = fs.readdirSync(localDir, { withFileTypes: true });
  for (const item of items) {
    const localPath = path.join(localDir, item.name);
    const remotePath = `${remoteDir}/${item.name}`;
    if (item.isDirectory()) {
      await uploadDirSftp(sftp, localPath, remotePath);
    } else if (item.isFile()) {
      await sftp.fastPut(localPath, remotePath);
      console.log("uploaded", remotePath);
    }
  }
}

(async function main() {
  const root = path.resolve(__dirname, "..");
  process.chdir(root);

  // 1) Git checkout main
  run("git", ["checkout", "main"]);

  // 2) Git pull
  run("git", ["pull"]);

  // 3) Install dependencies
  run(process.platform === "win32" ? "npm.cmd" : "npm", ["ci"]);

  // 4) Build
  run(process.platform === "win32" ? "npm.cmd" : "npm", ["run", "build"]);

  // 5) Deploy via SFTP
  const host = process.env.DEPLOY_HOST;
  const port = process.env.DEPLOY_PORT ? Number(process.env.DEPLOY_PORT) : 22;
  const username = process.env.DEPLOY_USER;
  const remoteDir = process.env.DEPLOY_REMOTE_DIR || "/var/www/site";
  const privateKeyPath = process.env.DEPLOY_PRIVATE_KEY_PATH;
  const password = process.env.DEPLOY_PASSWORD;
  const clean = (process.env.DEPLOY_CLEAN || "false").toLowerCase() === "true";
  const localDir = path.join(root, process.env.DEPLOY_LOCAL_DIR || "dist");

  if (!host || !username) {
    console.error("DEPLOY_HOST and DEPLOY_USER must be set in environment. Aborting deploy.");
    console.error('Set via PowerShell: $env:DEPLOY_HOST="192.168.1.100"; $env:DEPLOY_USER="user"');
    process.exit(1);
  }

  if (!fs.existsSync(localDir)) {
    console.error("Local build directory not found:", localDir);
    process.exit(1);
  }

  const sftp = new Client();
  try {
    await sftp.connect({
      host,
      port,
      username,
      password: password,
      privateKey: privateKeyPath ? fs.readFileSync(privateKeyPath) : undefined,
    });

    if (clean) {
      console.log("Cleaning remote directory", remoteDir);
      try {
        await sftp.rmdir(remoteDir, true);
      } catch (err) {
        console.warn("Remote clean failed (maybe remote dir not existing)", err.message || err);
      }
    }

    console.log("Start uploading", localDir, "->", remoteDir);
    await uploadDirSftp(sftp, localDir, remoteDir);
    console.log("Upload complete.");

    await sftp.end();
  } catch (err) {
    console.error("Deploy error", err);
    try {
      await sftp.end();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {}
    process.exit(1);
  }
})();
