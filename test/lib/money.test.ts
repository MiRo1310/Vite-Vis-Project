import { describe, expect, it } from "vitest";
import { getTotalByPrice, Money } from "@/lib/money.ts";

describe("Money", () => {
  it("defaults to zero with the Euro unit", () => {
    expect(new Money().formated).toBe("0,00 €");
  });

  it("defaults to zero with the given unit", () => {
    expect(new Money(undefined, "g").formated).toBe("0,00 g");
  });

  it("formats zero", () => {
    expect(new Money(0).formated).toBe("0,00 €");
  });

  it("formats an integer", () => {
    expect(new Money(12).formated).toBe("12,00 €");
  });

  it("formats a number with two decimal places", () => {
    expect(new Money(49.12).formated).toBe("49,12 €");
  });

  it("formats a decimal number", () => {
    expect(new Money(14.2).formated).toBe("14,20 €");
  });

  it("rounds a decimal number to two decimal places", () => {
    expect(new Money(14.225414).formated).toBe("14,23 €");
  });

  it("uses the given unit", () => {
    expect(new Money(14.2, "°C").unit).toBe("°C");
  });

  it("returns the amount", () => {
    expect(new Money(14.2, "°C").money).toBe(14.2);
  });
});

describe("getTotalByPrice", () => {
  it("returns 0 for an empty list", () => {
    expect(getTotalByPrice([]).money).toBe(0);
    expect(getTotalByPrice([]).formated).toBe("0,00 €");
  });

  it("sums the prices", () => {
    const values = [new Money(), new Money(3), new Money(10.66), new Money(0.009)];

    expect(getTotalByPrice(values).money).toBe(13.67);
  });

  it("rounds the sum to two decimals", () => {
    const values = [new Money(0.001), new Money(0.002), new Money(0.004)];

    expect(getTotalByPrice(values).money).toBe(0);
    expect(getTotalByPrice(values).formated).toBe("0,00 €");
  });
});
