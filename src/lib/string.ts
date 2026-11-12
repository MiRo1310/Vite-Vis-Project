import { type DecomposeTextReturnType } from "@/types/types.ts";

export const removeMultipleSpaces = (val: string): string => val.replace(/\s+/g, " ").trim();

export function truncateText(maxLength: number, text: string): string;
export function truncateText(maxLength: number, text?: string): string | null;
export function truncateText(maxLength: number, text?: string): string | null {
  return text !== undefined ? text.slice(0, maxLength).trim() : null;
}

export const isEmptyString = (str: string): boolean => str.trim() === "";

export const isBooleanString = (str: string): boolean => ["true", "false"].some((i) => i === str);

export const decompose = (str: string, first: string, second: string): DecomposeTextReturnType => {
  const startIndex = str.indexOf(first);
  const endIndex = str.indexOf(second, startIndex);
  const substring = str.substring(startIndex, endIndex + second.length);
  const substringExcludeSearch = substring.replace(first, "").replace(second, "");
  const textExcludeSubstring = str.replace(substring, "").trim();
  return {
    startIndex,
    endIndex,
    substring,
    textExcludeSubstring,
    substringExcludeSearch,
  };
};
