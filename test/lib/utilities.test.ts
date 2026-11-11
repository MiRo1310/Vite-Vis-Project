import { describe, it, expect, vi } from "vitest";
import { deepCopy, isDefined, isFalsy, isString, isTruthy } from "@/lib/utilities.ts";

describe("isTruthy", () => {
  it("returns true for truthy values", () => {
    expect(isTruthy(1)).toBeTruthy();
    expect(isTruthy("1")).toBeTruthy();
    expect(isTruthy(true)).toBeTruthy();
    expect(isTruthy("true")).toBeTruthy();
  });

  it("returns false for falsy values", () => {
    expect(isTruthy(0)).toBeFalsy();
    expect(isTruthy("0")).toBeFalsy();
    expect(isTruthy(false)).toBeFalsy();
    expect(isTruthy("false")).toBeFalsy();
    expect(isTruthy(undefined)).toBeFalsy();
    expect(isTruthy(null)).toBeFalsy();
  });
});

describe("isFalsy", () => {
  it("returns true for falsy values", () => {
    expect(isFalsy(0)).toBeTruthy();
    expect(isFalsy("0")).toBeTruthy();
    expect(isFalsy(false)).toBeTruthy();
    expect(isFalsy("false")).toBeTruthy();
    expect(isFalsy(undefined)).toBeTruthy();
    expect(isFalsy(null)).toBeTruthy();
  });

  it("returns false for truthy values", () => {
    expect(isFalsy(1)).toBeFalsy();
    expect(isFalsy("1")).toBeFalsy();
    expect(isFalsy(true)).toBeFalsy();
    expect(isFalsy("true")).toBeFalsy();
  });
});

describe("isDefined", () => {
  it("returns true for defined values", () => {
    expect(isDefined(123)).toBeTruthy();
    expect(isDefined("test")).toBeTruthy();
    expect(isDefined(true)).toBeTruthy();
    expect(isDefined({})).toBeTruthy();
    expect(isDefined([])).toBeTruthy();
  });

  it("returns false for undefined or null", () => {
    expect(isDefined(undefined)).toBeFalsy();
    expect(isDefined(null)).toBeFalsy();
  });
});

describe("deepCopy", () => {
  it("creates a deep copy of an object", () => {
    const original = { a: 1, b: { c: 2 } };
    const copy = deepCopy(original);

    expect(copy).to.deep.equal(original);
    expect(copy).to.not.equal(original); // Ensure it's not the same reference
  });

  it("returns the input for undefined or null", () => {
    expect(deepCopy(undefined)).toBeUndefined();
    expect(deepCopy(null)).toBeNull();
  });

  it("creates a deep copy of an array", () => {
    const original = [1, 2, { a: 3 }];
    const copy = deepCopy(original);

    expect(copy).to.deep.equal(original);
    expect(copy).to.not.equal(original);
  });

  it("returns undefined for circular references and calls the callback", () => {
    const circular: any = {};
    circular.self = circular;
    let e: any = null;
    const copy = deepCopy(circular, (error) => {
      e = error;
    });
    expect(copy).toBeUndefined();
    expect(e).toBeDefined();
  });

  it("returns undefined for circular references and logs the error", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const circular: any = {};
    circular.self = circular;

    const copy = deepCopy(circular);
    expect(copy).toBeUndefined();
    expect(errorSpy).toHaveBeenCalledTimes(3);
    errorSpy.mockRestore();
  });
});

describe("isString", () => {
  it("returns true for strings", () => {
    expect(isString("hello")).toBeTruthy();
    expect(isString("")).toBeTruthy();
  });

  it("returns false for non-strings", () => {
    expect(isString(123)).toBeFalsy();
    expect(isString(true)).toBeFalsy();
    expect(isString(null)).toBeFalsy();
    expect(isString(undefined)).toBeFalsy();
    expect(isString({})).toBeFalsy();
    expect(isString([])).toBeFalsy();
  });
});
