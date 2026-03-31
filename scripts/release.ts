import fs from "fs";
import { copyDataToRemote, getVersionType, run } from "./utils.ts";

run("git checkout main");
run("git pull");

const versionType = getVersionType();

run(`npm version ${versionType}`);

// 1. Git aktualisieren
run("git push --follow-tags");

// 2. Version holen (z. B. aus package.json)
const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
const version = pkg.version;

copyDataToRemote(version);
