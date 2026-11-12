import { describe, expect, it } from "vitest";
import { decompose, isBooleanString, isEmptyString, removeMultipleSpaces, truncateText } from "@/lib/string.ts";

describe("removeMultipleSpaces", () => {
  it("collapses multiple spaces into one and trims", () => {
    expect(removeMultipleSpaces("ab ")).toBe("ab");
    expect(removeMultipleSpaces("ab  cd ef ")).toBe("ab cd ef");
    expect(removeMultipleSpaces("  ab  cd ef  ")).toBe("ab cd ef");
  });
});

describe("truncateText", () => {
  it("cuts the text to the max length and trims", () => {
    expect(truncateText(9, "Das ist ein Test")).toBe("Das ist e");
    expect(truncateText(8, "Das ist ein Test")).toBe("Das ist");
  });

  it("returns an empty string for an empty text", () => {
    expect(truncateText(8, "")).toBe("");
  });

  it("returns null for undefined", () => {
    expect(truncateText(8, undefined)).toBe(null);
  });
});

describe("isBooleanString", () => {
  it("returns true for 'true'", () => {
    expect(isBooleanString("true")).toBeTruthy();
  });

  it("returns true for 'false'", () => {
    expect(isBooleanString("false")).toBeTruthy();
  });

  it("returns false for non-boolean strings", () => {
    expect(isBooleanString("yes")).toBeFalsy();
    expect(isBooleanString("no")).toBeFalsy();
    expect(isBooleanString("")).toBeFalsy();
  });
});

describe("isEmptyString", () => {
  it("returns true for an empty string", () => {
    expect(isEmptyString("")).toBeTruthy();
  });

  it("returns true for a string with only spaces", () => {
    expect(isEmptyString("   ")).toBeTruthy();
  });

  it("returns false for a non-empty string", () => {
    expect(isEmptyString("hello")).toBeFalsy();
  });
});

describe("decompose", () => {
  it("splits the text at the start and end markers", () => {
    const result = decompose("Das ist ein __Test. Das ist ein Test2", "__", ".");
    expect(result).to.deep.equal({
      startIndex: 12,
      endIndex: 18,
      substring: "__Test.",
      textExcludeSubstring: "Das ist ein  Das ist ein Test2",
      substringExcludeSearch: "Test",
    });

    const result2 = decompose("Das ist ein __Test.", "?", ".");
    expect(result2).to.deep.equal({
      startIndex: -1,
      endIndex: 18,
      substring: "Das ist ein __Test.",
      textExcludeSubstring: "",
      substringExcludeSearch: "Das ist ein __Test",
    });

    const result3 = decompose("Das ist ein __Test.", "?", "-");
    expect(result3).to.deep.equal({
      startIndex: -1,
      endIndex: -1,
      substring: "",
      textExcludeSubstring: "Das ist ein __Test.",
      substringExcludeSearch: "",
    });
  });
});
