import { expect, it } from "vitest";
import { cutString, removeMultipleSpaces } from "../../src/lib/string";

it("replace double spaces to one space and trim", () => {
  expect(removeMultipleSpaces("ab ")).toBe("ab");
  expect(removeMultipleSpaces("ab  cd ef ")).toBe("ab cd ef");
  expect(removeMultipleSpaces("  ab  cd ef  ")).toBe("ab cd ef");
});

it("cuts a string for set length", () => {
  expect(cutString("Das ist ein Test", 9)).toBe("Das ist e");
  expect(cutString("Das ist ein Test", 8)).toBe("Das ist");
});
