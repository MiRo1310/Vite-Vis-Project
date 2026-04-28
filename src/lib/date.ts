import { defaultLocale } from "@/config/config.ts";

export function getLocalTimeString(date: string, locale = defaultLocale): string {
  return new Date(date).toLocaleTimeString(locale);
}

export function localDateStringToDate(date: string): Date | "Invalid Date Format" {
  const [day, month, year] = date.split(".").map(Number);

  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return "Invalid Date Format";
  }

  return new Date(year, month - 1, day);
}
