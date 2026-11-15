import { describe, expect, it } from "vitest";
import { filterNewNames, getCategoryColor, parseNameList } from "@/lib/recipe.ts";
import { recipeAccents } from "@/constants/recipe.ts";

describe("parseNameList", () => {
  it("splits by comma and trims each name", () => {
    expect(parseNameList("Gramm, Liter,Prise ")).toEqual(["Gramm", "Liter", "Prise"]);
  });

  it("normalizes multiple spaces inside a name", () => {
    expect(parseNameList("Große   Dose")).toEqual(["Große Dose"]);
  });

  it("drops empty entries", () => {
    expect(parseNameList(" , Gramm,, ")).toEqual(["Gramm"]);
    expect(parseNameList("")).toEqual([]);
  });

  it("removes duplicates ignoring case and keeps the first spelling", () => {
    expect(parseNameList("Gramm, gramm, GRAMM, Liter")).toEqual(["Gramm", "Liter"]);
  });
});

describe("filterNewNames", () => {
  it("keeps only names that do not exist yet", () => {
    expect(filterNewNames(["Gramm", "Liter"], ["Liter"])).toEqual(["Gramm"]);
  });

  it("compares case-insensitive and ignores surrounding whitespace", () => {
    expect(filterNewNames(["gramm", "Prise"], [" Gramm "])).toEqual(["Prise"]);
  });

  it("returns all names when nothing exists", () => {
    expect(filterNewNames(["Gramm"], [])).toEqual(["Gramm"]);
  });
});

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
