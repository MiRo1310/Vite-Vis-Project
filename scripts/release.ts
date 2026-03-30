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

// fallback = patch
const versionType = valid.includes(arg) ? arg : "patch";

console.log(`📦 Version bump: ${versionType}`);

// 1. Git aktualisieren
run("git checkout main");
run("git pull");

// Version erhöhen (inkl. Tag!)
run(`npm version ${versionType}`);

// 2. Version holen (z. B. aus package.json)
const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
const version = pkg.version;

// Alternative: Git Commit Hash
const commit = execSync("git rev-parse --short HEAD").toString().trim();

// 3. Tag erstellen (optional)
const tag = `v${version}`;
run(`git tag ${tag}`);
run(`git push origin ${tag}`);

// 4. ENV Datei schreiben
const envContent = `VITE_APP_VERSION=${version}
VITE_APP_COMMIT=${commit}
`;

fs.writeFileSync(".env.local", envContent);

// 5. Build + Kopieren
run("npm run build");

// Beispiel Kopieren (anpassen!)
// run("cp -r dist/* ../mein-server/public");

console.log("✅ Release fertig!");
