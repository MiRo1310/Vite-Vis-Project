import { describe, expect, it } from "vitest";
import { getVariantsClasses } from "@/composables/variants-classes.ts";

const variants = {
  size: { sm: "h-8", lg: "h-12" },
  variant: { default: "bg-primary", outline: "border" },
};

describe("getVariantsClasses", () => {
  it("returns the classes of all set variants", () => {
    expect(getVariantsClasses(variants, { size: "sm", variant: "outline" })).toBe("h-8 border");
  });

  it("ignores variants without a prop value", () => {
    expect(getVariantsClasses(variants, { variant: "default" })).toBe("bg-primary");
  });

  it("returns an empty string when no prop is set", () => {
    expect(getVariantsClasses(variants, {})).toBe("");
  });

  it("returns an empty string for an unknown variant value", () => {
    expect(getVariantsClasses(variants, { size: "xl" })).toBe("");
  });

  it("ignores props that are not defined as variants", () => {
    expect(getVariantsClasses(variants, { size: "lg", other: "foo" })).toBe("h-12");
  });

  it("skips excluded variants", () => {
    expect(getVariantsClasses<typeof variants>(variants, { size: "sm", variant: "outline" }, ["size"])).toBe("border");
  });

  it("resolves tailwind conflicts with the later variant winning", () => {
    const conflicting = {
      padding: { small: "p-2" },
      spacing: { large: "p-4" },
    };
    expect(getVariantsClasses(conflicting, { padding: "small", spacing: "large" })).toBe("p-4");
  });
});
