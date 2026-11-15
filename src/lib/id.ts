import { typedStorage } from "@/lib/local-storage.ts";
import { Logger } from "@/lib/logger.ts";

/**
 * Erzeugt eine eindeutige ID.
 * `crypto.randomUUID()` gibt es nur in sicheren Kontexten (HTTPS/localhost) – über `http://<IP>` fehlt es.
 * Dann wird die UUID aus `crypto.getRandomValues` gebaut (überall verfügbar), erst danach Zeitstempel + Zufall.
 *
 * @returns UUID v4, im Notfall `"<Zeitstempel>-<4 Ziffern>"`.
 */
export function createId(): string {
  if (typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  if (typeof crypto.getRandomValues === "function") {
    return uuidFromRandomValues();
  }
  return `${new Date().getTime()}-${randomString(4)}`;
}

/** UUID v4 nach RFC 4122 aus 16 Zufallsbytes. */
function uuidFromRandomValues(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40; // Version 4
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // Variante RFC 4122
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function randomString(length: number): string {
  const isValidInput = !!length && length > 0;
  if (!isValidInput) {
    Logger.error(`No valid input for randomString, should be greater than 0, Value: ${length}`);
    return "0";
  }

  let string: string | null = null;
  for (let i = 0; i < length; i++) {
    const num = Math.floor(Math.random() * 10).toString();
    string = string ? string + num : num;
  }
  return string ?? "0";
}

export function getOrCreateDeviceId() {
  let deviceId = typedStorage.getItem("deviceId");
  if (deviceId) {
    return deviceId;
  }

  deviceId = createId();
  typedStorage.setItem("deviceId", deviceId);
  return deviceId;
}
