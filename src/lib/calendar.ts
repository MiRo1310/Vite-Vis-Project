import type { CalendarDayType } from "@/types/types.ts";

export const isInTimeRange = (day: CalendarDayType, offsetDay = 0, now: Date = new Date()): boolean => {
  const date = new Date(now);
  date.setDate(date.getDate() + offsetDay);
  const start = new Date(day._object.start);
  const end = new Date(day._object.end);
  return date >= start && date <= end;
};
