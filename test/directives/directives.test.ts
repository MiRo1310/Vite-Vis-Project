import { describe, it, expect } from "vitest";
import { vComponent, vE2E } from "../../src/directives/directives";

describe("directives", () => {
  it("vComponent sets data-component when value is defined", () => {
    const el = document.createElement("div");
    vComponent.mounted(el as HTMLElement, { value: "my-comp" } as any);
    expect(el.getAttribute("data-component")).toBe("my-comp");
  });

  it("vComponent does not set attribute when value is undefined", () => {
    const el = document.createElement("div");
    vComponent.mounted(el as HTMLElement, { value: undefined } as any);
    expect(el.hasAttribute("data-component")).toBe(false);
  });

  it("vComponent accepts falsy but defined values (0, false)", () => {
    const el1 = document.createElement("div");
    vComponent.mounted(el1 as HTMLElement, { value: 0 } as any);
    expect(el1.getAttribute("data-component")).toBe("0");

    const el2 = document.createElement("div");
    vComponent.mounted(el2 as HTMLElement, { value: false } as any);
    expect(el2.getAttribute("data-component")).toBe("false");
  });

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

