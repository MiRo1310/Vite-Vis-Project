export const removeMultipleSpaces = (val: string): string => val.replace(/\s+/g, " ").trim();

export function truncateText(maxLength: number, text: string): string;
export function truncateText(maxLength: number, text?: string): string | null;
export function truncateText(maxLength: number, text?: string): string | null {
  return text !== undefined ? text.slice(0, maxLength).trim() : null;
}
