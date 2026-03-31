import fs from "fs";
import { copyDataToRemote, getVersionType, run } from "./utils.ts";

const versionType = getVersionType();

run(`npm version ${versionType}`);

// 1. Git aktualisieren
run("git push --follow-tags");

// 2. Version holen (z. B. aus package.json)
const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
const version = pkg.version;

// 4. ENV Datei schreiben
const envContent = `VITE_APP_VERSION=${version}
`;

fs.writeFileSync(".env.local", envContent);

copyDataToRemote(version);
