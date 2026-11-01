import { describe, expect, it } from "vitest";

import { invertBoolean } from "@/lib/boolean.ts";

describe("invertBoolean", () => {
  it("inverts true and false", () => {
    expect(invertBoolean(true)).toBe(false);
    expect(invertBoolean(false)).toBe(true);
  });
});
