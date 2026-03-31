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
