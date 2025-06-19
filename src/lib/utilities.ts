export const stringToObject = (str: string) => {
  if (str === "" || !str) return {};

  return JSON.parse(str);
};

export function isTruthy(val: any): boolean {
  return [true, 1, "true", "1"].includes(val);
}

export function isFalsy(val: any): boolean {
  return [false, 0, "false", "0"].includes(val);
}
