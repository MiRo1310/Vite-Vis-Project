export function firstLetterToUpperCase(name: string): string {
  return name.slice(0, 1).toUpperCase() + name.slice(1);
}

export function stringToJSON<T>(string: string): T {
  if (!string) {
    return {} as T;
  }
  try {
    const json = JSON.parse(string);
    if (typeof json === "object" && json !== null) {
      return json as T;
    }
  } catch (e) {
    console.log(e);
  }
  return {} as T;
}