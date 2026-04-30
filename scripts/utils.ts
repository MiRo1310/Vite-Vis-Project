import { execSync } from "child_process";
import { loadEnv } from "vite";

export function copyDataToRemote(version: string): void {
  const env = loadEnv("production", process.cwd(), "");

  const user = env.VITE_USERNAME;
  const host = env.VITE_HOST;
  const path = env.VITE_PATH;
  const graphQLUrl = env.VITE_GRAPHQL_URL;

  // Build mit injected Version
  run(`npx cross-env VITE_APP_VERSION=${version} VITE_GRAPHQL_URL=${graphQLUrl} yarn build`);

  // Kopieren
  if (!host || !user || !path) {
    // eslint-disable-next-line no-console
    console.error("❌ Fehlende Umgebungsvariablen: VITE_USERNAME, VITE_HOST, VITE_PATH");
    process.exit(1);
  }

  removeDataOnRemote(user, host, path);
  run(`scp -r dist/* ${user}@${host}:${path}`);
  run(`ssh ${user}@${host} "sudo chmod -R 755 ${path}"`);
  // eslint-disable-next-line no-console
  console.log(`✅ Release fertig! Version: ${version}`);
}

export function run(cmd: string): void {
  // eslint-disable-next-line no-console
  console.log(`> ${cmd}`);
  execSync(cmd, { stdio: "inherit" });
}

export function removeDataOnRemote(user: string, host: string, path: string): void {
  const safePath = path.replace(/'/g, "'\\''"); // escape single quotes
  run(`ssh ${user}@${host} "sudo find '${safePath}' -mindepth 1 -delete"`);
}

export function getVersionType(): string {
  // Argument auslesen
  const arg = process.argv[2];

  // erlaubte Werte
  const valid = ["patch", "minor", "major"];

  const versionType = valid.includes(arg) ? arg : "patch";
  // eslint-disable-next-line no-console
  console.log(`📦 Version bump: ${versionType}`);
  return versionType;
}

// scripts/utils.ts
import { createInterface } from "readline/promises";
import { stdin as input, stdout as output } from "process";

export async function getVersionTypeInteractive(): Promise<string> {
  const arg = process.argv[2];
  const choices = ["patch", "minor", "major"];

  // Arg vorhanden & gültig
  if (arg && choices.includes(arg)) {
    // eslint-disable-next-line no-console
    console.log(`📦 Version bump (from arg): ${arg}`);
    return arg;
  }

  // Non-interactive (CI) -> Default
  if (!process.stdin.isTTY) {
    // eslint-disable-next-line no-console
    console.log("ℹ️ Non-interactive shell detected — using default 'patch'");
    return "patch";
  }

  const rl = createInterface({ input, output });
  try {
    while (true) {
      // eslint-disable-next-line no-console
      console.log("Welche Version möchtest du bumpen?");
      // eslint-disable-next-line no-console
      choices.forEach((c, i) => console.log(`${i + 1}) ${c}`));
      const ans = (await rl.question("Auswahl (1/2/3) [1]: ")).trim();
      const idx = ans === "" ? 0 : parseInt(ans, 10) - 1;
      if (!Number.isNaN(idx) && idx >= 0 && idx < choices.length) {
        const chosen = choices[idx];
        // eslint-disable-next-line no-console
        console.log(`📦 Version bump: ${chosen}`);
        return chosen;
      }
      // eslint-disable-next-line no-console
      console.log("Ungültige Eingabe. Bitte 1, 2 oder 3 eingeben.");
    }
  } finally {
    rl.close();
  }
}

export function ensureCleanWorktree(): void {
  const status = execSync("git status --porcelain", { encoding: "utf8" }).trim();

  if (status) {
    // eslint-disable-next-line no-console
    console.error("❌ Abbruch: Es gibt noch uncommittete Änderungen:");
    // eslint-disable-next-line no-console
    console.error(status);
    process.exit(1);
  }
}
