import { describe, it, expect } from "vitest";
import { isInTimeRange } from "@/lib/calendar";
import type { CalendarDayType } from "@/types/types";

const createDay = (start: string, end: string): CalendarDayType => ({ _object: { start, end } }) as CalendarDayType;

describe("isInTimeRange", () => {
  const day = createDay("2026-10-27T10:00:00", "2026-10-27T14:00:00");

  it("returns true when now is within the range", () => {
    expect(isInTimeRange(day, 0, new Date("2026-10-27T12:00:00"))).toBe(true);
  });

  it("returns false when now is before the range", () => {
    expect(isInTimeRange(day, 0, new Date("2026-10-27T09:59:59"))).toBe(false);
  });

  it("returns false when now is after the range", () => {
    expect(isInTimeRange(day, 0, new Date("2026-10-27T14:00:01"))).toBe(false);
  });

  it("includes start and end", () => {
    expect(isInTimeRange(day, 0, new Date("2026-10-27T10:00:00"))).toBe(true);
    expect(isInTimeRange(day, 0, new Date("2026-10-27T14:00:00"))).toBe(true);
  });

  it("shifts now by offsetDay", () => {
    const now = new Date("2026-10-26T12:00:00");
    expect(isInTimeRange(day, 0, now)).toBe(false);
    expect(isInTimeRange(day, 1, now)).toBe(true);
  });

  it("supports negative offsetDay", () => {
    expect(isInTimeRange(day, -1, new Date("2026-10-28T12:00:00"))).toBe(true);
  });

  it("does not mutate the passed date", () => {
    const now = new Date("2026-10-26T12:00:00");
    const before = now.getTime();
    isInTimeRange(day, 1, now);
    expect(now.getTime()).toBe(before);
  });

  it("detects multi-day events spanning now", () => {
    const multiDay = createDay("2026-10-25T00:00:00", "2026-10-30T00:00:00");
    expect(isInTimeRange(multiDay, 0, new Date("2026-10-27T12:00:00"))).toBe(true);
  });

  it("returns false for invalid dates", () => {
    const invalid = createDay("", "");
    expect(isInTimeRange(invalid, 0, new Date("2026-10-27T12:00:00"))).toBe(false);
  });
});
