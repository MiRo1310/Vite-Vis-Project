import { describe, expect, it } from "vitest";
import { getCategoryColor } from "@/lib/recipe.ts";
import { recipeAccents } from "@/constants/recipe.ts";

describe("getCategoryColor", () => {
  it("returns primary when no category is set", () => {
    expect(getCategoryColor(undefined)).toBe("primary");
    expect(getCategoryColor(null)).toBe("primary");
    expect(getCategoryColor("")).toBe("primary");
    expect(getCategoryColor("   ")).toBe("primary");
  });

  it("returns the same accent for the same category", () => {
    expect(getCategoryColor("Suppen")).toBe(getCategoryColor("Suppen"));
  });

  it("ignores case and surrounding whitespace", () => {
    expect(getCategoryColor("  suppen ")).toBe(getCategoryColor("Suppen"));
  });

  it("always returns one of the recipe accents", () => {
    ["Suppen", "Kuchen", "Salate", "Pasta", "Frühstück", "Getränke"].forEach((name) => {
      expect(recipeAccents).toContain(getCategoryColor(name));
    });
  });

  it("spreads different categories over several accents", () => {
    const names = ["Suppen", "Kuchen", "Salate", "Pasta", "Frühstück", "Getränke", "Fisch", "Fleisch", "Vegetarisch", "Dessert"];
    const used = new Set(names.map((name) => getCategoryColor(name)));
    expect(used.size).toBeGreaterThan(2);
  });
});
