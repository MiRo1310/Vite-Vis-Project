import fs from "fs";
import { copyDataToRemote, ensureCleanWorktree, getVersionTypeInteractive, run } from "./utils.ts";

ensureCleanWorktree();

run("git checkout main");
run("git pull");
run("yarn install");

const versionType = getVersionTypeInteractive();

run(`npm version ${versionType}`);

// Version holen (z. B. aus package.json)

const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
const version = pkg.version;
copyDataToRemote(version);

// Git aktualisieren
run("git push --follow-tags");
