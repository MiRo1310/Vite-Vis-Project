import { describe, expect, it } from "vitest";
import { clamp, formatNumber, numberFormatter } from "@/lib/number.ts";

describe("formatNumber", () => {
  it("formats a number with a comma and two decimals by default", () => {
    expect(formatNumber(12.5)).toBe("12,5");
  });

  it("fills up whole numbers with two decimals by default", () => {
    expect(formatNumber(200)).toBe("200");
  });

  it("formats zero", () => {
    expect(formatNumber(0, 2)).toBe("0,00");
  });

  it("formats negative numbers", () => {
    expect(formatNumber(-3.5)).toBe("-3,5");
  });

  it("rounds to two decimals by default", () => {
    expect(formatNumber(14.225414, 2)).toBe("14,23");
  });

  it("rounds to the given decimals", () => {
    expect(formatNumber(3.14159, 1)).toBe("3,1");
  });

  it("fills up to the given decimals", () => {
    expect(formatNumber(12.5, 3)).toBe("12,500");
  });

  it("rounds to a whole number without a comma for zero decimals", () => {
    expect(formatNumber(12.6, 0)).toBe("13");
  });

  it("returns an empty string for an undefined value", () => {
    expect(formatNumber()).toBe("");
  });
});

describe("numberFormatter", () => {
  describe("without a unit", () => {
    it("formats a decimal number with a comma and two decimals", () => {
      expect(numberFormatter({ number: 12.5 })).toBe("12,5");
    });

    it("fills up a whole number with two decimals", () => {
      expect(numberFormatter({ number: 200, decimals: 2 })).toBe("200,00");
    });

    it("formats zero", () => {
      expect(numberFormatter({ number: 0 })).toBe("0");
    });

    it("formats a negative number", () => {
      expect(numberFormatter({ number: -3.5 })).toBe("-3,5");
    });

    it("formats a number string", () => {
      expect(numberFormatter({ number: "49.12" })).toBe("49,12");
    });

    it("rounds to two decimals", () => {
      expect(numberFormatter({ number: 14.225414 })).toBe("14,225414");
    });

    it("treats an empty unit like no unit", () => {
      expect(numberFormatter({ number: 12.5, unit: "" })).toBe("12,5");
    });
  });

  describe("with decimals", () => {
    it("rounds to the given decimals", () => {
      expect(numberFormatter({ number: 3.14159, decimals: 1 })).toBe("3,1");
    });

    it("fills up to the given decimals", () => {
      expect(numberFormatter({ number: 12.5, decimals: 3 })).toBe("12,500");
    });

    it("rounds to a whole number without a comma for zero decimals", () => {
      expect(numberFormatter({ number: 12.6, decimals: 0 })).toBe("13");
    });
  });

  describe("with a unit", () => {
    it("appends the unit", () => {
      expect(numberFormatter({ number: 12.5, unit: "g" })).toBe("12,5 g");
    });

    it("appends the unit to a number string", () => {
      expect(numberFormatter({ number: "49.12", unit: "°C", decimals: 2 })).toBe("49,12 °C");
    });

    it("appends the unit to zero", () => {
      expect(numberFormatter({ number: 0, unit: "kcal" })).toBe("0 kcal");
    });

    it("combines the unit with the given decimals", () => {
      expect(numberFormatter({ number: 3.14159, unit: "V", decimals: 1 })).toBe("3,1 V");
    });

    it("combines the unit with zero decimals", () => {
      expect(numberFormatter({ number: 87.6, unit: "%", decimals: 0 })).toBe("88 %");
    });
  });

  describe("with a money unit", () => {
    it("formats with two decimals and the euro sign", () => {
      expect(numberFormatter({ number: 13.5, unit: "€" })).toBe("13,50 €");
    });

    it("formats zero", () => {
      expect(numberFormatter({ number: 0, unit: "€" })).toBe("0,00 €");
    });

    it("formats a number string", () => {
      expect(numberFormatter({ number: "49.12", unit: "€", decimals: 2 })).toBe("49,12 €");
    });

    it("rounds to two decimals", () => {
      expect(numberFormatter({ number: 14.225414, unit: "€" })).toBe("14,23 €");
    });

    it("always uses two decimals and ignores the given decimals", () => {
      expect(numberFormatter({ number: 13.5, unit: "€", decimals: 0 })).toBe("13,50 €");
    });
  });

  describe("without a valid number", () => {
    it("returns an empty string for an undefined number", () => {
      expect(numberFormatter({})).toBe("");
    });

    it("returns an empty string for null, which table cells can pass at runtime", () => {
      expect(numberFormatter({ number: null as unknown as undefined })).toBe("");
    });

    it("returns an empty string for an empty string", () => {
      expect(numberFormatter({ number: "" })).toBe("");
    });

    it("returns an empty string for a value that is not a number", () => {
      expect(numberFormatter({ number: "abc" })).toBe("");
    });

    it("does not show the unit without a number", () => {
      expect(numberFormatter({ unit: "g" })).toBe("");
      expect(numberFormatter({ number: "abc", unit: "kcal" })).toBe("");
    });

    it("does not show the money unit without a number", () => {
      expect(numberFormatter({ unit: "€" })).toBe("");
      expect(numberFormatter({ number: "abc", unit: "€" })).toBe("");
    });
  });
});

describe("clamp", () => {
  it("returns the value if it is within the range", () => {
    expect(clamp(50, 0, 100)).toBe(50);
  });

  it("returns min if the value is below min", () => {
    expect(clamp(-5, 0, 100)).toBe(0);
  });

  it("returns max if the value is above max", () => {
    expect(clamp(150, 0, 100)).toBe(100);
  });

  it("returns the limits themselves unchanged", () => {
    expect(clamp(0, 0, 100)).toBe(0);
    expect(clamp(100, 0, 100)).toBe(100);
  });

  it("ignores missing limits", () => {
    expect(clamp(150)).toBe(150);
    expect(clamp(-5, undefined, 100)).toBe(-5);
    expect(clamp(150, 0)).toBe(150);
  });
});
