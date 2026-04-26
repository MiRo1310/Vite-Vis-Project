import { describe, it, expect } from "vitest";
import { getTotalByPrice } from "@/pages/finance/utils";

describe("Utils", () => {
  it("expect 0 when value is undefined", () => {
    expect(getTotalByPrice()).toBe(0);
  });

  it("expect correct value ", () => {
    const values = [{ price: null }, { price: 3 }, { price: 10.66 }, { price: 0.009 }];

    expect(getTotalByPrice(values)).toBe(13.67);
  });

  it("expect correct value ", () => {
    const values = [{ price: 0.001 }, { price: 0.002 }, { price: 0.004 }];

    expect(getTotalByPrice(values)).toBe(0);
  });
});
