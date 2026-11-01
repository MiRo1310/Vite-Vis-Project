import { describe, it, expect } from "vitest";
import { getTotalByPrice } from "@/pages/finance/utils";

describe("getTotalByPrice", () => {
  it("returns 0 when no values are given", () => {
    expect(getTotalByPrice()).toBe(0);
  });

  it("sums the prices and ignores null", () => {
    const values = [{ price: null }, { price: 3 }, { price: 10.66 }, { price: 0.009 }];

    expect(getTotalByPrice(values)).toBe(13.67);
  });

  it("rounds the sum to two decimals", () => {
    const values = [{ price: 0.001 }, { price: 0.002 }, { price: 0.004 }];

    expect(getTotalByPrice(values)).toBe(0);
  });
});
