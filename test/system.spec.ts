import { describe, expect, it } from "vitest";
import { formatUptime, miBToGiB } from "../src/lib/system";

describe("miBToGiB", () => {
  it("converts MiB to GiB with 2 decimal places", () => {
    expect(miBToGiB(1024)).toBe("1.00 GB");
    expect(miBToGiB(512)).toBe("0.50 GB");
    expect(miBToGiB(2048)).toBe("2.00 GB");
  });

  it("returns 0 GB for undefined", () => {
    expect(miBToGiB(undefined)).toBe("0 GB");
  });

  it("returns 0 GB for null-like values", () => {
    expect(miBToGiB(0)).toBe("0.00 GB");
  });
});

describe("formatUptime", () => {
  it("returns – for undefined", () => {
    expect(formatUptime(undefined)).toBe("–");
  });

  it("formats minutes only", () => {
    expect(formatUptime(300)).toBe("5m");
  });

  it("formats hours and minutes", () => {
    expect(formatUptime(3661)).toBe("1h 1m");
  });

  it("formats days, hours and minutes", () => {
    expect(formatUptime(90061)).toBe("1d 1h 1m");
  });

  it("formats 0 seconds as 0m", () => {
    expect(formatUptime(0)).toBe("0m");
  });

  it("formats exact days with 0h", () => {
    expect(formatUptime(86400)).toBe("1d 0h 0m");
  });

  it("formats multiple days", () => {
    expect(formatUptime(172800 + 7200 + 300)).toBe("2d 2h 5m");
  });
});
