import { logging } from "@/lib/logging.ts";

export function firstLetterToUpperCase(name: string): string {
  return name.slice(0, 1).toUpperCase() + name.slice(1);
}

export function stringToJSON<T>(string: string | undefined): T {
  if (!string) {
    return {} as T;
  }
  try {
    const json = JSON.parse(string);
    if (typeof json === "object" && json !== null) {
      return json as T;
    }
  } catch (e) {
    logging(e as string);
  }
  return {} as T;
}

export function JSONToString(json: object | undefined): string {
  if (!json) {
    return "";
  }
  try {
    return JSON.stringify(json, null, 2);
  } catch (e) {
    logging(e as string);
  }
  return "";
}
