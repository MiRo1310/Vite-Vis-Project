import { describe, it, expect } from "vitest";
import { toLocaleTime, formatSecondsToTime } from "../../src/lib/time";

describe("toLocaleTime", () => {
  it("returns same as Date.toLocaleString for a numeric timestamp", () => {
    const ts = Date.UTC(2021, 0, 2, 3, 4, 5);
    const res = toLocaleTime(ts);
    const expected = new Date(ts).toLocaleString();
    expect(res).toBe(expected);
  });

  it("handles ISO string input", () => {
    const iso = "2021-01-02T03:04:05.000Z";
    const res = toLocaleTime(iso);
    const expected = new Date(iso).toLocaleString();
    expect(res).toBe(expected);
  });
});

describe("formatSecondsToTime", () => {
  it("formats 0 seconds as 00:00:00", () => {
    expect(formatSecondsToTime(0)).toBe("00:00:00");
  });

  it("formats 3661 seconds as 01:01:01", () => {
    expect(formatSecondsToTime(3661)).toBe("01:01:01");
  });

  it("formats large hour values correctly", () => {
    // 100 hours = 360000 seconds
    expect(formatSecondsToTime(360000)).toBe("100:00:00");
  });

  it("pads minutes and seconds with leading zeros", () => {
    expect(formatSecondsToTime(65)).toBe("00:01:05");
  });
});

