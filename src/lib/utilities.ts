export const stringToObject = (str: string) => {
  if (str === "") return {};
  if (!str) return {};
  return JSON.parse(str);
};
