import { describe, expect, it } from "vitest";
import { formatUptime, miBToGiB } from "../../src/lib/system";

describe("miBToGiB", () => {
  it("returns '0 GB' for undefined", () => {
    expect(miBToGiB(undefined)).toBe("0 GB");
  });

  it("returns '0 GB' for null", () => {
    expect(miBToGiB(null as unknown as number)).toBe("0 GB");
  });

  it("formats 0 with two decimals", () => {
    expect(miBToGiB(0)).toBe("0.00 GB");
  });

  it("converts 1024 MiB to 1.00 GB", () => {
    expect(miBToGiB(1024)).toBe("1.00 GB");
  });

  it("rounds to two decimals", () => {
    expect(miBToGiB(1536)).toBe("1.50 GB");
    expect(miBToGiB(1000)).toBe("0.98 GB");
  });
});

describe("formatUptime", () => {
  it("returns '–' for undefined", () => {
    expect(formatUptime(undefined)).toBe("–");
  });

  it("returns '–' for null", () => {
    expect(formatUptime(null as unknown as number)).toBe("–");
  });

  it("returns only minutes below one hour", () => {
    expect(formatUptime(0)).toBe("0m");
    expect(formatUptime(59)).toBe("0m");
    expect(formatUptime(60)).toBe("1m");
    expect(formatUptime(3599)).toBe("59m");
  });

  it("returns hours and minutes below one day", () => {
    expect(formatUptime(3600)).toBe("1h 0m");
    expect(formatUptime(3600 + 5 * 60)).toBe("1h 5m");
  });

  it("shows hours even when they are 0 if days are present", () => {
    expect(formatUptime(86400 + 5 * 60)).toBe("1d 0h 5m");
  });

  it("returns days, hours and minutes", () => {
    expect(formatUptime(2 * 86400 + 3 * 3600 + 4 * 60 + 59)).toBe("2d 3h 4m");
  });
});
