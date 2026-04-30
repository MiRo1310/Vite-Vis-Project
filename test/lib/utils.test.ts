import { describe, it, expect } from "vitest";
import { cn, valueUpdater } from "../../src/lib/utils";

describe("cn (class merge)", () => {
  it("combines simple class names into a string", () => {
    const res = cn("a", "b");
    expect(typeof res).toBe("string");
    expect(res).toContain("a");
    expect(res).toContain("b");
  });

  it("handles conditional objects like clsx", () => {
    const res = cn({ a: true, b: false }, "c");
    // only 'a' and 'c' should be present
    expect(res).toContain("a");
    expect(res).toContain("c");
    expect(res).not.toContain("b");
  });
});

describe("valueUpdater", () => {
  it("sets ref.value when a plain value is provided", () => {
    const ref: { value: number } = { value: 1 };
    valueUpdater(5 as any, ref as any);
    expect(ref.value).toBe(5);
  });

  it("calls updater function with current value and assigns result", () => {
    const ref: { value: number } = { value: 2 };
    valueUpdater(((v: number) => v + 3) as any, ref as any);
    expect(ref.value).toBe(5);
  });
});

