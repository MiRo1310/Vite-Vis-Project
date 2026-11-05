import { describe, expect, it } from "vitest";
import { formatMoney, getTotalByPrice } from "@/lib/money.ts";

describe("formatMoney", () => {
  it("returns zero with the default unit for undefined value", () => {
    expect(formatMoney()).toBe("");
  });

  it("returns zero with the given unit for undefined value", () => {
    expect(formatMoney(undefined, "g")).toBe("");
  });

  it("formats zero", () => {
    expect(formatMoney(0)).toBe("0,00 €");
  });

  it("formats a number string", () => {
    expect(formatMoney(12)).toBe("12,00 €");
  });

  it("formats a number string with decimal places", () => {
    expect(formatMoney(49.12)).toBe("49,12 €");
  });

  it("formats a decimal number", () => {
    expect(formatMoney(14.2)).toBe("14,20 €");
  });

  it("rounds a decimal number to two decimal places", () => {
    expect(formatMoney(14.225414)).toBe("14,23 €");
  });

  it("uses the given unit", () => {
    expect(formatMoney(14.2, "°C")).toBe("14,20 °C");
  });
});

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
