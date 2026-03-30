import fs from "fs";
import { execSync } from "child_process";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

// 2. Version holen (z. B. aus package.json)
const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
const version = pkg.version;

copyDataToRemote(version);

export function copyDataToRemote(version: string) {
  // Build mit injected Version
  run(`npx cross-env VITE_APP_VERSION=${version} yarn build`);

  // Kopieren
  const user = process.env.VITE_USERNAME;
  const host = process.env.VITE_HOST;
  const path = process.env.VITE_PATH;

  // run(`scp -r dist/* ${user}@${host}:${path}`);
  run(`rsync -avz --delete dist ${user}@${host}:${path}`);
  console.log(`✅ Release fertig! Version: ${version}`);
}

function run(cmd: string) {
  console.log(`> ${cmd}`);
  execSync(cmd, { stdio: "inherit" });
}
