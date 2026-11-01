import { describe, expect, it } from "vitest";
import { truncateText, removeMultipleSpaces } from "../../src/lib/string";

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
