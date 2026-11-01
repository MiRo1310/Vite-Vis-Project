import { describe, it, expect } from "vitest";
import { toZeroBasedIndex } from "@/lib/indexHandler.ts";

describe("toZeroBasedIndex", () => {
  it("converts a 1-based index to 0-based (1 -> 0)", () => {
    expect(toZeroBasedIndex(1)).toBe(0);
  });

  it("converts larger values (5 -> 4)", () => {
    expect(toZeroBasedIndex(5)).toBe(4);
  });

  it("returns -1 for 0", () => {
    expect(toZeroBasedIndex(0)).toBe(-1);
  });

  it("handles floats (1.5 -> 0.5)", () => {
    expect(toZeroBasedIndex(1.5)).toBeCloseTo(0.5);
  });

  it("returns NaN for NaN", () => {
    const res = toZeroBasedIndex(Number.NaN);
    expect(Number.isNaN(res)).toBe(true);
  });
});
