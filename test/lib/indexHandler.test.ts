import { describe, it, expect } from "vitest";
import { toZeroBasedIndex } from "../../src/lib/indexHandler";

describe("toZeroBasedIndex", () => {
  it("konvertiert 1-based Index in 0-based (1 -> 0)", () => {
    expect(toZeroBasedIndex(1)).toBe(0);
  });

  it("liefert korrektes Ergebnis für größere Werte (5 -> 4)", () => {
    expect(toZeroBasedIndex(5)).toBe(4);
  });

  it("behandelt 0 als -1 (0 -> -1)", () => {
    expect(toZeroBasedIndex(0)).toBe(-1);
  });

  it("arbeitet mit Gleitkommazahlen (1.5 -> 0.5)", () => {
    expect(toZeroBasedIndex(1.5)).toBeCloseTo(0.5);
  });

  it("gibt NaN zurück, wenn Input NaN ist", () => {
    const res = toZeroBasedIndex(Number.NaN);
    expect(Number.isNaN(res)).toBe(true);
  });
});

