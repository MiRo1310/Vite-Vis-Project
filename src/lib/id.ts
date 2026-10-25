import { typedStorage } from "@/lib/local-storage.ts";

export function createId(): string {
  const id = "randomUUID" in crypto ? crypto.randomUUID() : undefined;
  return id ?? `${new Date().getTime()}-${randomString(4)}`;
}

function randomString(length: number): string {
  const isValidInput = !!length && length > 0;
  if (!isValidInput) {
    // eslint-disable-next-line no-console
    console.error(`No valid input for randomString, should be greater than 0, Value: ${length}`);
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
