export const removeMultipleSpaces = (val: string): string => {
  return val.replace(/\s+/g, " ").trim();
};
