export const removeMultipleSpaces = (val: string): string => {
  return val.replace(/\s+/g, " ").trim();
};

export const cutString = (text: string, maxLength: number) => text.slice(0, maxLength).trim();
