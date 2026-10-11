import { describe, it, expect } from "vitest";
import { chargingModeOptions } from "../../src/lib/wattPilot";

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
