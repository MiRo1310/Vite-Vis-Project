import fs from "fs";
import { copyDataToRemote } from "./utils.ts";

// 2. Version holen (z. B. aus package.json)
const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
const version = pkg.version;

copyDataToRemote(version);
