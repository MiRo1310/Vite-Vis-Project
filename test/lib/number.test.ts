import { describe, expect, it } from "vitest";
import { clamp } from "@/lib/number.ts";

describe("clamp", () => {
  it("returns the value if it is within the range", () => {
    expect(clamp(50, 0, 100)).toBe(50);
  });

  it("returns min if the value is below min", () => {
    expect(clamp(-5, 0, 100)).toBe(0);
  });

  it("returns max if the value is above max", () => {
    expect(clamp(150, 0, 100)).toBe(100);
  });

  it("returns the limits themselves unchanged", () => {
    expect(clamp(0, 0, 100)).toBe(0);
    expect(clamp(100, 0, 100)).toBe(100);
  });

  it("ignores missing limits", () => {
    expect(clamp(150)).toBe(150);
    expect(clamp(-5, undefined, 100)).toBe(-5);
    expect(clamp(150, 0)).toBe(150);
  });
});
