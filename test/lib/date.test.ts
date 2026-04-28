import { expect, it, describe } from "vitest";
import { getLocalTimeString, localDateStringToDate } from "../../src/lib/date";

describe("date", () => {
  it("should get correct formated local time string", () => {
    const date = "Tue Apr 28 2026 17:19:04 GMT+0200 (Mitteleuropäische Sommerzeit)";

    expect(getLocalTimeString(date)).toBe("17:19:04");
  });

  it("should get invalid date", () => {
    const date = "xxx";

    expect(getLocalTimeString(date)).toBe("Invalid Date");
  });

  it("should get date from local date string", () => {
    const dateString = "28.04.2026";

    expect(typeof localDateStringToDate(dateString)).toBe("object");
    expect((localDateStringToDate(dateString) as Date).getTime()).toBe(1777327200000);
  });

  it("should handle invalid date from local date string", () => {
    const dateString = "xx.04.2026";

    expect(typeof localDateStringToDate(dateString)).toBe("string");
    expect(localDateStringToDate(dateString)).toBe("Invalid Date Format");
  });
});
