import { describe, expect, it } from "vitest";
import {
  filterNewNames,
  filterRecipes,
  flattenIngredientGroups,
  formatScaledAmount,
  formatAmount,
  getCategoryColor,
  getRecipeCategoryName,
  getRecipeTime,
  groupIngredientsByGroupPosition,
  groupRecipesByCategory,
  ingredientKey,
  kcalPerPortion,
  parseNameList,
  pickRecentRecipes,
  scaleAmount,
  sortSteps,
} from "@/lib/recipe.ts";
import { RECIPE_UNCATEGORIZED, recipeAccents } from "@/constants/recipe.ts";

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

describe("kcalPerPortion", () => {
  it("divides the total by the portions and rounds", () => {
    expect(kcalPerPortion(4102, 10)).toBe(410);
    expect(kcalPerPortion(301, 1)).toBe(301);
  });

  it("treats missing or invalid portions as one portion", () => {
    expect(kcalPerPortion(250.4, null)).toBe(250);
    expect(kcalPerPortion(250, 0)).toBe(250);
    expect(kcalPerPortion(250, -2)).toBe(250);
  });

  it("returns 0 without kcal", () => {
    expect(kcalPerPortion(null, 4)).toBe(0);
    expect(kcalPerPortion(undefined, undefined)).toBe(0);
  });
});

describe("scaleAmount", () => {
  it("scales the amount to the target portions", () => {
    expect(scaleAmount(200, 4, 2)).toBe(100);
    expect(scaleAmount(200, 4, 6)).toBe(300);
  });

  it("returns null when no amount is set", () => {
    expect(scaleAmount(null, 4, 2)).toBeNull();
    expect(scaleAmount(undefined, 4, 2)).toBeNull();
  });

  it("keeps the amount for invalid portions", () => {
    expect(scaleAmount(200, 0, 2)).toBe(200);
    expect(scaleAmount(200, null, 2)).toBe(200);
    expect(scaleAmount(200, 4, 0)).toBe(200);
  });

  it("keeps 0 as amount", () => {
    expect(scaleAmount(0, 4, 2)).toBe(0);
  });
});

describe("formatAmount", () => {
  it("uses a German comma and at most two decimals", () => {
    expect(formatAmount(1.5)).toBe("1,5");
    expect(formatAmount(33.3333)).toBe("33,33");
  });

  it("drops trailing zeros", () => {
    expect(formatAmount(100)).toBe("100");
    expect(formatAmount(2.5)).toBe("2,5");
  });

  it("returns an empty string for missing values", () => {
    expect(formatAmount(null)).toBe("");
    expect(formatAmount(undefined)).toBe("");
    expect(formatAmount(Number.NaN)).toBe("");
  });
});

const recipes = [
  { id: "1", name: "Tomatensuppe", portions: 4, totalKcal: 800, totalTimeMin: 30, recipeCategory: { name: "Suppen" } },
  { id: "2", name: "Apfelkuchen", portions: 12, totalKcal: 3600, totalTimeMin: 90, recipeCategory: { name: "Kuchen" } },
  { id: "3", name: "Brot", portions: 1, totalKcal: 0, totalTimeMin: null, preparationTimeMin: 10, recipeCategory: null },
  { id: "4", name: "Kürbissuppe", portions: 2, totalKcal: 1200, totalTimeMin: 45, recipeCategory: { name: "Suppen" } },
];

describe("getRecipeCategoryName", () => {
  it("returns the category name", () => {
    expect(getRecipeCategoryName({ recipeCategory: { name: "Suppen" } })).toBe("Suppen");
  });

  it("returns the fallback without category", () => {
    expect(getRecipeCategoryName({ recipeCategory: null })).toBe(RECIPE_UNCATEGORIZED);
    expect(getRecipeCategoryName({ recipeCategory: { name: "  " } })).toBe(RECIPE_UNCATEGORIZED);
  });
});

describe("getRecipeTime", () => {
  it("prefers the total time", () => {
    expect(getRecipeTime({ totalTimeMin: 45, preparationTimeMin: 10 })).toBe(45);
  });

  it("falls back to the preparation time", () => {
    expect(getRecipeTime({ totalTimeMin: 0, preparationTimeMin: 10 })).toBe(10);
    expect(getRecipeTime({ totalTimeMin: null, preparationTimeMin: 10 })).toBe(10);
  });

  it("returns null without any time", () => {
    expect(getRecipeTime({ totalTimeMin: null, preparationTimeMin: 0 })).toBeNull();
  });
});

describe("filterRecipes", () => {
  it("returns all recipes without filter", () => {
    expect(filterRecipes(recipes, {})).toHaveLength(4);
  });

  it("searches the name case-insensitive", () => {
    expect(filterRecipes(recipes, { search: " SUPPE " }).map((r) => r.id)).toEqual(["1", "4"]);
  });

  it("filters by categories including the fallback category", () => {
    expect(filterRecipes(recipes, { categories: ["Kuchen"] }).map((r) => r.id)).toEqual(["2"]);
    expect(filterRecipes(recipes, { categories: [RECIPE_UNCATEGORIZED] }).map((r) => r.id)).toEqual(["3"]);
  });

  it("filters by max time and falls back to the preparation time", () => {
    expect(filterRecipes(recipes, { maxTimeMin: 30 }).map((r) => r.id)).toEqual(["1", "3"]);
  });

  it("filters by max kcal per portion and drops recipes without kcal", () => {
    // 200, 300, 0 (raus), 600 kcal pro Portion
    expect(filterRecipes(recipes, { maxKcal: 300 }).map((r) => r.id)).toEqual(["1", "2"]);
  });

  it("combines all filters", () => {
    expect(filterRecipes(recipes, { search: "suppe", categories: ["Suppen"], maxTimeMin: 60, maxKcal: 500 }).map((r) => r.id)).toEqual(["1"]);
  });
});

describe("groupRecipesByCategory", () => {
  it("groups by category, sorts alphabetically and puts the fallback last", () => {
    const groups = groupRecipesByCategory(recipes);
    expect(groups.map((g) => g.key)).toEqual(["Kuchen", "Suppen", RECIPE_UNCATEGORIZED]);
    expect(groups[1].value.map((r) => r.name)).toEqual(["Kürbissuppe", "Tomatensuppe"]);
  });

  it("returns no groups for an empty list", () => {
    expect(groupRecipesByCategory([])).toEqual([]);
  });
});

describe("pickRecentRecipes", () => {
  it("keeps the order of the recent entries and uses the fresh data", () => {
    const result = pickRecentRecipes([{ id: "4" }, { id: "1" }], recipes);
    expect(result.map((r) => r.name)).toEqual(["Kürbissuppe", "Tomatensuppe"]);
  });

  it("drops entries of deleted recipes", () => {
    expect(pickRecentRecipes([{ id: "x" }, { id: "2" }], recipes).map((r) => r.id)).toEqual(["2"]);
  });
});

describe("groupIngredientsByGroupPosition", () => {
  const ingredients = [
    { name: "Mehl", groupPosition: 1 },
    { name: "Zucker", groupPosition: 0 },
    { name: "Ei", groupPosition: 1 },
  ];

  it("groups by position in ascending order and keeps the item order", () => {
    const groups = groupIngredientsByGroupPosition(ingredients, [{ position: 0, text: "Teig" }]);
    expect(groups.map((g) => g.position)).toEqual([0, 1]);
    expect(groups[1].items.map((i) => i.name)).toEqual(["Mehl", "Ei"]);
  });

  it("uses the header text and a numbered fallback", () => {
    const groups = groupIngredientsByGroupPosition(ingredients, [{ position: 0, text: " Teig " }]);
    expect(groups.map((g) => g.title)).toEqual(["Teig", "Gruppe 2"]);
  });

  it("leaves the title empty for a single group without header", () => {
    expect(groupIngredientsByGroupPosition([{ groupPosition: 0 }])[0].title).toBe("");
  });
});

describe("sortSteps", () => {
  it("sorts by position without changing the input", () => {
    const steps = [{ position: 2 }, { position: 0 }, { position: 1 }];
    expect(sortSteps(steps).map((s) => s.position)).toEqual([0, 1, 2]);
    expect(steps[0].position).toBe(2);
  });

  it("returns an empty list for missing steps", () => {
    expect(sortSteps(null)).toEqual([]);
  });
});

describe("ingredientKey", () => {
  it("combines group position and index", () => {
    expect(ingredientKey(0, 2)).toBe("0-2");
  });
});

describe("formatScaledAmount", () => {
  it("scales and appends the unit", () => {
    expect(formatScaledAmount(250, "g", 4, 2)).toBe("125 g");
    expect(formatScaledAmount(1, " Prise ", 1, 1)).toBe("1 Prise");
  });

  it("drops missing parts", () => {
    expect(formatScaledAmount(null, "g", 1, 1)).toBe("g");
    expect(formatScaledAmount(null, null, 1, 1)).toBe("");
  });
});

describe("flattenIngredientGroups", () => {
  it("keeps the order and builds the same keys as the ingredient list", () => {
    const groups = groupIngredientsByGroupPosition(
      [
        { name: "Mehl", groupPosition: 0 },
        { name: "Zucker", groupPosition: 0 },
        { name: "Äpfel", groupPosition: 1 },
      ],
      [
        { position: 0, text: "Teig" },
        { position: 1, text: "Belag" },
      ],
    );
    expect(flattenIngredientGroups(groups)).toEqual([
      { key: "0-0", groupTitle: "Teig", item: { name: "Mehl", groupPosition: 0 } },
      { key: "0-1", groupTitle: "Teig", item: { name: "Zucker", groupPosition: 0 } },
      { key: "1-0", groupTitle: "Belag", item: { name: "Äpfel", groupPosition: 1 } },
    ]);
  });
});
