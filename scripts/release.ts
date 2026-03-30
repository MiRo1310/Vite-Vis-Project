import { execSync } from "child_process";
import fs from "fs";

function run(cmd: string) {
  console.log(`> ${cmd}`);
  execSync(cmd, { stdio: "inherit" });
}
// Argument auslesen
const arg = process.argv[2];

// erlaubte Werte
const valid = ["patch", "minor", "major"];

const versionType = valid.includes(arg) ? arg : "patch";

console.log(`📦 Version bump: ${versionType}`);

run(`npm version ${versionType}`);

// 1. Git aktualisieren
run("git push --follow-tags");

// 2. Version holen (z. B. aus package.json)
const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
const version = pkg.version;

// Alternative: Git Commit Hash
const commit = execSync("git rev-parse --short HEAD").toString().trim();

// 4. ENV Datei schreiben
const envContent = `VITE_APP_VERSION=${version}
VITE_APP_COMMIT=${commit}
`;

fs.writeFileSync(".env.local", envContent);

// Build mit injected Version
run(`npx cross-env VITE_APP_VERSION=${version} VITE_APP_COMMIT=${commit} yarn build`);

// Kopieren
const user = process.env.VITE_USERNAME;
const host = process.env.VITE_HOST;
const path = process.env.VITE_PATH;

run(`scp -r dist/* ${user}@${host}:${path}`);
console.log(`✅ Release fertig! Version: ${version}`);
