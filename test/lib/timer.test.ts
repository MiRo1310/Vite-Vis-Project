import { describe, expect, it } from "vitest";
import { getNameByIndex } from "@/lib/timer.ts";

describe("getNameByIndex", () => {
  it("returns the custom timer name", () => {
    expect(getNameByIndex({ 1: { name: { value: "Pizza" } } }, 1)).toBe("Pizza");
  });

  it("returns 'Timer <index>' when the name is the default 'Timer'", () => {
    expect(getNameByIndex({ 2: { name: { value: "Timer" } } }, 2)).toBe("Timer 2");
  });

  it("returns 'Timer <index>' when the name is empty", () => {
    expect(getNameByIndex({ 3: { name: { value: "" } } }, 3)).toBe("Timer 3");
  });

  it("returns 'Timer <index>' when no name is set", () => {
    expect(getNameByIndex({ 4: {} }, 4)).toBe("Timer 4");
  });
});
