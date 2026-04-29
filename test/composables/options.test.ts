import { describe, it, expect } from "vitest";
import { getSelectableOptions } from "../../src/composables/querys/options";

describe("getSelectableOptions", () => {
  it("returns empty array for undefined or null input", () => {
    expect(getSelectableOptions(undefined)).toEqual([]);
    expect(getSelectableOptions(null)).toEqual([]);
  });

  it("filters out items without id or name and maps to SelectOption", () => {
    const input: any[] = [
      { id: "2", name: "B" },
      { id: "1", name: "A" },
      { id: undefined, name: "C" },
      { id: "3", name: null },
      { id: "4", name: "D" },
    ];

    const res = getSelectableOptions(input);

    // should only contain entries with defined id and name
    expect(res).toEqual([
      { value: "1", label: "A" },
      { value: "2", label: "B" },
      { value: "4", label: "D" },
    ]);
  });

  it("sorts results by label (localeCompare)", () => {
    const input = [
      { id: "a", name: "Öl" },
      { id: "b", name: "Aar" },
      { id: "c", name: "Zee" },
    ];
    const res = getSelectableOptions(input);
    // labels should be sorted Aar, Öl, Zee (locale order may vary but basic alphabetical)
    expect(res.map((r) => r.label)).toEqual(["Aar", "Öl", "Zee"]);
  });
});

