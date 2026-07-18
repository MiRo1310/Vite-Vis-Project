import { describe, it, expect } from "vitest";
import { vE2E } from "../../src/directives/directives";

describe("directives", () => {
  it("vE2E sets data-e2e when value is defined", () => {
    const el = document.createElement("span");
    vE2E.mounted(el as HTMLElement, { value: "btn-save" } as any);
    expect(el.getAttribute("data-e2e")).toBe("btn-save");
  });

  it("vE2E does not set attribute when value is undefined", () => {
    const el = document.createElement("span");
    vE2E.mounted(el as HTMLElement, { value: undefined } as any);
    expect(el.hasAttribute("data-e2e")).toBe(false);
  });
});
