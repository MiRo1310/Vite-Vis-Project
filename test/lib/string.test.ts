import { expect, it } from "vitest";
import { removeMultipleSpaces } from "../../src/lib/string";

it("replace double spaces to one space and trim", () => {
  expect(removeMultipleSpaces("ab ")).toBe("ab");
  expect(removeMultipleSpaces("ab  cd ef ")).toBe("ab cd ef");
  expect(removeMultipleSpaces("  ab  cd ef  ")).toBe("ab cd ef");
});
