import { describe, expect, it } from "vitest";

import { invertBoolean } from "../../src/lib/boolean";

describe("invertBoolean", () => {
  it("inverts true and false", () => {
    expect(invertBoolean(true)).toBe(false);
    expect(invertBoolean(false)).toBe(true);
  });
});
