import { describe, expect, it } from "vitest";
import { filterProductGroups, findProductByEan, findRecipesUsingProduct, getMacroShares, isValidEan, normalizeEan, pickValidEan, searchProducts } from "@/lib/product.ts";

describe("normalizeEan", () => {
  it("keeps only digits", () => {
    expect(normalizeEan(" 4000 417-025005 ")).toBe("4000417025005");
  });

  it("keeps leading zeros", () => {
    expect(normalizeEan("00012345")).toBe("00012345");
  });

  it("returns an empty string for empty values", () => {
    expect(normalizeEan(undefined)).toBe("");
    expect(normalizeEan(null)).toBe("");
    expect(normalizeEan("")).toBe("");
  });
});

describe("isValidEan", () => {
  it("accepts valid EAN-13 codes", () => {
    expect(isValidEan("4000417025005")).toBe(true);
    expect(isValidEan("3017620422003")).toBe(true);
  });

  it("accepts a valid EAN-8 code", () => {
    expect(isValidEan("96385074")).toBe(true);
  });

  it("accepts a valid UPC-A code", () => {
    expect(isValidEan("036000291452")).toBe(true);
  });

  it("rejects a wrong check digit", () => {
    expect(isValidEan("4000417025006")).toBe(false);
  });

  it("rejects wrong lengths and non-digits", () => {
    expect(isValidEan("12345")).toBe(false);
    expect(isValidEan("40004170250a5")).toBe(false);
    expect(isValidEan("")).toBe(false);
  });
});

const groups = [
  { key: "Obst", value: [{ name: "Banane" }, { name: "Apfel", ean: "4001" }] },
  { key: "Gemüse", value: [{ name: "Zucchini" }, { name: "Karotte", ean: "4002" }] },
];

describe("filterProductGroups", () => {
  it("returns all groups sorted by category and products sorted by name", () => {
    const result = filterProductGroups(groups, "", []);
    expect(result.map((g) => g.key)).toEqual(["Gemüse", "Obst"]);
    expect(result[1].value.map((p) => p.name)).toEqual(["Apfel", "Banane"]);
  });

  it("filters products by name case-insensitive and drops empty groups", () => {
    const result = filterProductGroups(groups, "BAN", []);
    expect(result).toEqual([{ key: "Obst", value: [{ name: "Banane" }] }]);
  });

  it("finds products by EAN", () => {
    const result = filterProductGroups(groups, "4002", []);
    expect(result).toEqual([{ key: "Gemüse", value: [{ name: "Karotte", ean: "4002" }] }]);
  });

  it("keeps only the selected categories", () => {
    const result = filterProductGroups(groups, "", ["Obst"]);
    expect(result.map((g) => g.key)).toEqual(["Obst"]);
  });

  it("does not mutate the input", () => {
    filterProductGroups(groups, "", []);
    expect(groups[0].value.map((p) => p.name)).toEqual(["Banane", "Apfel"]);
  });
});

describe("getMacroShares", () => {
  it("returns the percentage of each macro by grams", () => {
    expect(getMacroShares({ carbs: 50, fat: 25, protein: 25 })).toEqual({ carbs: 50, fat: 25, protein: 25 });
  });

  it("treats null and undefined as zero", () => {
    expect(getMacroShares({ carbs: 10, fat: null })).toEqual({ carbs: 100, fat: 0, protein: 0 });
  });

  it("returns zeros when there are no values", () => {
    expect(getMacroShares({})).toEqual({ carbs: 0, fat: 0, protein: 0 });
  });

  it("ignores negative values", () => {
    expect(getMacroShares({ carbs: -5, fat: 10 })).toEqual({ carbs: 0, fat: 100, protein: 0 });
  });
});

describe("searchProducts", () => {
  const products = [
    { id: "1", name: "Weizenmehl" },
    { id: "2", name: "Mehl" },
    { id: "3", name: "Zucker" },
    { id: "4", name: "Ei" },
  ];

  it("shows recent products first without search and the rest alphabetically", () => {
    const result = searchProducts(products, "", ["3", "x", "1"]);
    expect(result.recent.map((p) => p.name)).toEqual(["Zucker", "Weizenmehl"]);
    expect(result.matches.map((p) => p.name)).toEqual(["Ei", "Mehl"]);
    expect(result.hasExactMatch).toBe(false);
  });

  it("finds names containing the term, names starting with it first", () => {
    const result = searchProducts(products, " MEHL ", ["1"]);
    expect(result.recent).toEqual([]);
    expect(result.matches.map((p) => p.name)).toEqual(["Mehl", "Weizenmehl"]);
  });

  it("detects an exact name match", () => {
    expect(searchProducts(products, "mehl").hasExactMatch).toBe(true);
    expect(searchProducts(products, "meh").hasExactMatch).toBe(false);
  });

  it("limits the matches", () => {
    expect(searchProducts(products, "", [], 2).matches).toHaveLength(2);
  });
});

describe("pickValidEan", () => {
  it("returns the first valid code, normalized", () => {
    expect(pickValidEan(["123", " 4000417-025005 ", "3017620422003"])).toBe("4000417025005");
  });

  it("returns null without a valid code", () => {
    expect(pickValidEan(["4000417025006", "abc"])).toBeNull();
    expect(pickValidEan([])).toBeNull();
  });
});

describe("findProductByEan", () => {
  const productGroups: Array<{ key: string; value: Array<{ name: string; ean: string | null }> }> = [
    { key: "Süßes", value: [{ name: "Nutella", ean: "3017620422003" }] },
    { key: "Obst", value: [{ name: "Apfel", ean: null }] },
  ];

  it("finds the product with the same code", () => {
    expect(findProductByEan(productGroups, " 3017620422003 ")?.name).toBe("Nutella");
  });

  it("returns undefined for unknown or empty codes", () => {
    expect(findProductByEan(productGroups, "4000417025005")).toBeUndefined();
    expect(findProductByEan(productGroups, "")).toBeUndefined();
  });
});

describe("findRecipesUsingProduct", () => {
  const recipes = [
    { name: "Pfannkuchen", recipeProducts: [{ productId: "mehl" }, { productId: "ei" }] },
    { name: "Apfelkuchen", recipeProducts: [{ productId: "mehl" }, { productId: "mehl" }] },
    { name: "Salat", recipeProducts: [{ productId: "gurke" }] },
  ];

  it("lists each recipe once, alphabetically", () => {
    expect(findRecipesUsingProduct(recipes, "mehl")).toEqual(["Apfelkuchen", "Pfannkuchen"]);
  });

  it("returns an empty list for unused products", () => {
    expect(findRecipesUsingProduct(recipes, "zucker")).toEqual([]);
  });
});
