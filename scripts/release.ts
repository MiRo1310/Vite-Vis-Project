import fs from "fs";
import { copyDataToRemote, ensureCleanWorktree, run } from "./utils.ts";

ensureCleanWorktree();

run("git checkout main");
run("git pull");
run("yarn install");

// const versionType = await getVersionTypeInteractive();

const arg = process.argv[2];

// erlaubte Werte
const valid = ["patch", "minor", "major"];

const versionType = valid.includes(arg) ? arg : "patch";

run(`npm version ${versionType}`);

// Version holen (z. B. aus package.json)

const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
const version = pkg.version;
copyDataToRemote(version);

// Git aktualisieren
run("git push --follow-tags");
