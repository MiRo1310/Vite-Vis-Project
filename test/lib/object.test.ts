import { describe, expect, it } from "vitest";
import { tempArray } from "../../src/lib/object";

describe("tempArray", () => {
  it("returns an array starting with 'Aus' and then numbers 5..30", () => {
    const arr = tempArray();
    // Erwartete Länge: 26 numbers (5..30) + 1 'Aus' = 27
    expect(arr).toHaveLength(27);
    expect(arr[0]).toMatchObject({ label: "Aus", value: "0" });
    expect(arr[1]).toMatchObject({ label: "5", value: "5" });
    expect(arr[arr.length - 1]).toMatchObject({ label: "30", value: "30" });
  });
});
