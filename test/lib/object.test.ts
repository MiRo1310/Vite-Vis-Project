import { describe, it, expect } from "vitest";
import { tempArray, getValNumber, getValBoolean, getValString, getValId } from "../../src/lib/object";

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

describe("getVal helpers", () => {
  it("getValNumber returns numeric value or 0", () => {
    expect(getValNumber({ val: 42 } as any)).toBe(42);
    expect(getValNumber(undefined as any)).toBe(0);
    expect(getValNumber({ val: null } as any)).toBe(0);
  });

  it("getValBoolean returns boolean or false", () => {
    expect(getValBoolean({ val: true } as any)).toBe(true);
    expect(getValBoolean({ val: false } as any)).toBe(false);
    expect(getValBoolean(undefined as any)).toBe(false);
  });

  it("getValString returns string or empty string", () => {
    expect(getValString({ val: "hello" } as any)).toBe("hello");
    expect(getValString(undefined as any)).toBe("");
  });

  it("getValId returns id or undefined", () => {
    expect(getValId({ id: "some.id" } as any)).toBe("some.id");
    expect(getValId(undefined as any)).toBeUndefined();
  });
});

