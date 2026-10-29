import fs from "fs";
// @ts-ignore
import { copyDataToRemote, ensureCleanWorktree, rollbackRelease, run } from "./utils.ts";

ensureCleanWorktree();

run("git checkout main");
run("git pull");
run("yarn install");

const arg = process.argv[2];

// erlaubte Werte
const valid = ["patch", "minor", "major"];

const versionType = valid.includes(arg) ? arg : "patch";

const versionBefore = getCurrentVersion();

try {
  run(`npm version ${versionType}`);

  // --atomic: Branch + Tag ganz oder gar nicht pushen.
  // Sonst landet bei blockiertem main (Ruleset) ein verwaister Tag auf GitHub.
  run("git push --atomic --follow-tags");
} catch (err) {
  rollbackRelease(versionBefore);
  throw err;
}

// Ab hier gepusht → kein Rollback mehr, Deploy.
copyDataToRemote(getCurrentVersion());

function getCurrentVersion(): string {
  return JSON.parse(fs.readFileSync("package.json", "utf-8")).version;
}
