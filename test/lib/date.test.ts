import { expect, it, describe } from "vitest";
import { getLocalTimeString, localDateStringToDate } from "@/lib/date.ts";

describe("getLocalTimeString", () => {
  it("returns the local time of a date string", () => {
    const date = "Tue Apr 28 2026 17:19:04 GMT+0200 (Mitteleuropäische Sommerzeit)";

    expect(getLocalTimeString(date)).toBe("17:19:04");
  });

  it("returns 'Invalid Date' for an invalid date string", () => {
    const date = "xxx";

    expect(getLocalTimeString(date)).toBe("Invalid Date");
  });
});

describe("localDateStringToDate", () => {
  it("parses a dd.mm.yyyy string into a Date", () => {
    const dateString = "28.04.2026";

    expect(typeof localDateStringToDate(dateString)).toBe("object");
    expect((localDateStringToDate(dateString) as Date).getTime()).toBe(1777327200000);
  });

  it("returns 'Invalid Date Format' for non-numeric parts", () => {
    const dateString = "xx.04.2026";

    expect(typeof localDateStringToDate(dateString)).toBe("string");
    expect(localDateStringToDate(dateString)).toBe("Invalid Date Format");
  });
});
