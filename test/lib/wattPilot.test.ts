import { describe, it, expect } from "vitest";
import { calcGridCost, calcPricePer100Km, calcSurplusSavings, chargingModeOptions } from "@/lib/wattPilot.ts";

const testEnum = {
  AUTO: "auto",
  "1P6A": "1 Phase 6a",
  "1P16A": "1 Phase 16a",
  "3P6A": "3 Phasen 6a",
};
const curve = { "1 Phase 6a": 1380, "1 Phase 16a": 3680, "3 Phasen 6a": 4140 };

describe("chargingModeOptions", () => {
  it("returns only keys matching one of the prefixes", () => {
    expect(chargingModeOptions(testEnum, ["1P", "3P"], curve).map((o) => o.value)).toEqual(["1 Phase 6a", "1 Phase 16a", "3 Phasen 6a"]);
  });

  it("builds the label from phase, current and power", () => {
    expect(chargingModeOptions(testEnum, ["3P"], curve)).toEqual([{ value: "3 Phasen 6a", label: "3P 6A – 4140 W" }]);
  });

  it("omits the power when it is missing in the curve", () => {
    expect(chargingModeOptions(testEnum, ["1P"], {})[0].label).toBe("1P 6A");
  });

  it("returns an empty array when no key matches", () => {
    expect(chargingModeOptions(testEnum, ["2P"], curve)).toEqual([]);
  });
});

describe("calcSurplusSavings", () => {
  it("converts the total charging from Wh to kWh before subtracting the grid share", () => {
    // 1000 kWh total - 400 kWh grid = 600 kWh surplus * 0.32 €
    expect(calcSurplusSavings(1_000_000, 400, 0.32)).toBe("192.00");
  });

  it("returns 0.00 when everything came from the grid", () => {
    expect(calcSurplusSavings(500_000, 500, 0.32)).toBe("0.00");
  });

  it("rounds to two decimals", () => {
    expect(calcSurplusSavings(1234, 0, 0.32)).toBe("0.39");
  });
});

describe("calcGridCost", () => {
  it("multiplies the grid energy with the price", () => {
    expect(calcGridCost(400, 0.32)).toBe("128.00");
  });

  it("returns 0.00 without grid energy", () => {
    expect(calcGridCost(0, 0.32)).toBe("0.00");
  });
});

describe("calcPricePer100Km", () => {
  it("divides the total cost by the driven 100 km units", () => {
    // (50 € + 10 €) / 20 = 3 €
    expect(calcPricePer100Km(50, 10, 2000)).toBe("3.00");
  });

  it("returns '0' for 0 km", () => {
    expect(calcPricePer100Km(50, 10, 0)).toBe("0");
  });

  it("returns '0' for negative km", () => {
    expect(calcPricePer100Km(50, 10, -100)).toBe("0");
  });
});
