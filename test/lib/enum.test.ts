import { describe, it, expect } from "vitest";
import { filterEnum } from "../../src/lib/enum";

describe("filterEnum", () => {
  it("returns all keys when nothing is filtered", () => {
    expect(filterEnum({ AUTO: "auto", MANUAL: "manual" }, [])).toEqual(["AUTO", "MANUAL"]);
  });

  it("removes keys that match a filter term case-insensitively", () => {
    expect(filterEnum({ AUTO: "auto", MANUAL: "manual" }, ["auto"])).toEqual(["MANUAL"]);
  });

  it("matches filter terms as substrings of the key", () => {
    expect(filterEnum({ "1P6A": "1 Phase 6a", "3P6A": "3 Phasen 6a" }, ["1p"])).toEqual(["3P6A"]);
  });

  it("removes keys matching any of multiple filter terms", () => {
    expect(filterEnum({ AUTO: "auto", MANUAL: "manual", OFF: "off" }, ["auto", "off"])).toEqual(["MANUAL"]);
  });

  it("returns an empty array when every key is filtered out", () => {
    expect(filterEnum({ AUTO: "auto", MANUAL: "manual" }, ["a"])).toEqual([]);
  });

  it("returns an empty array for an empty enum", () => {
    expect(filterEnum({}, ["auto"])).toEqual([]);
  });
});