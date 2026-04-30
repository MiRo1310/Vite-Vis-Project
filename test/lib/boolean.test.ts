import { expect, it } from "vitest";

import { invertBoolean } from "../../src/lib/boolean";

it("invertBoolean", () => {
  expect(invertBoolean(true)).toBe(false);
  expect(invertBoolean(false)).toBe(true);
});
