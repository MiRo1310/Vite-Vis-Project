import { expect, it } from "vitest";
import { truncateText, removeMultipleSpaces } from "../../src/lib/string";

it("replace double spaces to one space and trim", () => {
  expect(removeMultipleSpaces("ab ")).toBe("ab");
  expect(removeMultipleSpaces("ab  cd ef ")).toBe("ab cd ef");
  expect(removeMultipleSpaces("  ab  cd ef  ")).toBe("ab cd ef");
});

it("cuts a string for set length", () => {
  expect(truncateText(9, "Das ist ein Test")).toBe("Das ist e");
  expect(truncateText(8, "Das ist ein Test")).toBe("Das ist");
  expect(truncateText(8, undefined)).toBe(null);
  expect(truncateText(8, "")).toBe("");
});
