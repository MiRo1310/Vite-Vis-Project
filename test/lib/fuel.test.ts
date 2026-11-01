import { describe, expect, it } from "vitest";
import { getMaxE5Price } from "@/lib/fuel.ts";

describe("getMaxE5Price", () => {
  it("returns 0 for an empty list", () => {
    expect(getMaxE5Price([])).toBe(0);
  });

  it("returns the price of a single station", () => {
    expect(getMaxE5Price([{ e5: 1.79 }])).toBe(1.79);
  });

  it("returns the highest e5 price", () => {
    expect(getMaxE5Price([{ e5: 1.79 }, { e5: 1.89 }, { e5: 1.69 }])).toBe(1.89);
  });

  it("never returns a value below 0", () => {
    expect(getMaxE5Price([{ e5: -1 }])).toBe(0);
  });
});
