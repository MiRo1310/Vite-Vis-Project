import { describe, expect, it } from "vitest";
import {
  cloneDraft,
  countIngredients,
  draftToDto,
  emptyDraft,
  emptyGroup,
  emptyIngredient,
  emptyStep,
  getDefaultUnitId,
  getDraftDeletions,
  isEmptyGroup,
  isEmptyIngredient,
  isEmptyStep,
  isSameDraft,
  moveItem,
  pruneDraft,
  type RecipeDraft,
  type RecipeSource,
  recipeToDraft,
  validateDraft,
} from "@/lib/recipe-editor.ts";

const unit = "6f1c2a3b-4d5e-4f60-8a7b-9c0d1e2f3a4b";

const source: RecipeSource = {
  name: "Apfelkuchen",
  portions: 12,
  recipeCategoryId: "cat-1",
  preparationTimeMin: 20,
  totalTimeMin: 60,
  recipeHeaderProducts: [
    { id: "h-belag", position: 1, text: "Belag" },
    { id: "h-teig", position: 0, text: "Teig" },
  ],
  recipeProducts: [
    { id: "p-zucker", productId: "zucker", amount: 100, activeUnitId: unit, description: "", groupPosition: 0, sortOrder: 1 },
    { id: "p-mehl", productId: "mehl", amount: 250, activeUnitId: unit, description: "Type 405", groupPosition: 0, sortOrder: 0 },
    { id: "p-apfel", productId: "apfel", amount: 4, activeUnitId: unit, description: null, groupPosition: 1, sortOrder: 0 },
  ],
  recipeDescriptions: [
    { id: "s-backen", position: 1, header: "Backen", text: "40 min bei 180 °C" },
    { id: "s-teig", position: 0, header: null, text: "Teig kneten" },
  ],
};

const filledDraft = (): RecipeDraft => recipeToDraft(source);

describe("emptyDraft", () => {
  it("starts with one portion, one group with a blank row and one empty step", () => {
    const draft = emptyDraft();
    expect(draft.portions).toBe(1);
    expect(draft.groups).toHaveLength(1);
    expect(draft.groups[0].ingredients).toHaveLength(1);
    expect(isEmptyIngredient(draft.groups[0].ingredients[0])).toBe(true);
    expect(draft.steps).toHaveLength(1);
  });

  it("creates unique keys", () => {
    expect(emptyIngredient().key).not.toBe(emptyIngredient().key);
    expect(emptyGroup().key).not.toBe(emptyStep().key);
  });
});

describe("recipeToDraft", () => {
  it("sorts groups by position and ingredients by sortOrder", () => {
    const draft = filledDraft();
    expect(draft.groups.map((g) => g.title)).toEqual(["Teig", "Belag"]);
    expect(draft.groups[0].ingredients.map((i) => i.productId)).toEqual(["mehl", "zucker"]);
    expect(draft.groups.map((g) => g.originalPosition)).toEqual([0, 1]);
  });

  it("sorts steps by position and replaces missing values", () => {
    const draft = filledDraft();
    expect(draft.steps.map((s) => s.id)).toEqual(["s-teig", "s-backen"]);
    expect(draft.steps[0].header).toBe("");
    expect(draft.groups[1].ingredients[0].description).toBe("");
  });

  it("creates a group for ingredients without header", () => {
    const draft = recipeToDraft({ ...source, recipeHeaderProducts: [] });
    expect(draft.groups.map((g) => g.title)).toEqual(["", ""]);
    expect(draft.groups[1].id).toBeUndefined();
  });

  it("adds an empty group when the recipe has no ingredients", () => {
    const draft = recipeToDraft({ ...source, recipeHeaderProducts: [], recipeProducts: [] });
    expect(draft.groups).toHaveLength(1);
  });

  it("uses stable keys so the same recipe gives the same draft", () => {
    expect(JSON.stringify(recipeToDraft(source))).toBe(JSON.stringify(recipeToDraft(source)));
  });
});

describe("isEmptyStep", () => {
  it("is empty without header and text", () => {
    expect(isEmptyStep({ header: " ", text: "" })).toBe(true);
    expect(isEmptyStep({ header: "", text: "Rühren" })).toBe(false);
  });
});

describe("isEmptyIngredient", () => {
  it("is empty without product, amount and note", () => {
    expect(isEmptyIngredient(emptyIngredient())).toBe(true);
    expect(isEmptyIngredient({ productId: "", amount: 0, description: "" })).toBe(false);
    expect(isEmptyIngredient({ productId: "", amount: null, description: "Prise" })).toBe(false);
    expect(isEmptyIngredient({ productId: "mehl", amount: null, description: "" })).toBe(false);
  });
});

describe("isEmptyGroup", () => {
  it("is empty without title and with only blank rows", () => {
    expect(isEmptyGroup({ title: " ", ingredients: [] })).toBe(true);
    expect(isEmptyGroup({ title: "", ingredients: [emptyIngredient()] })).toBe(true);
    expect(isEmptyGroup({ title: "Soße", ingredients: [] })).toBe(false);
    expect(isEmptyGroup({ title: "", ingredients: [{ ...emptyIngredient(), productId: "mehl" }] })).toBe(false);
  });
});

describe("pruneDraft", () => {
  it("drops blank rows, then empty groups and empty steps", () => {
    const draft = filledDraft();
    draft.groups[0].ingredients.push(emptyIngredient());
    draft.groups.push({ ...emptyGroup(), ingredients: [emptyIngredient()] });
    draft.steps.push(emptyStep());

    const pruned = pruneDraft(draft);
    expect(pruned.groups).toHaveLength(2);
    expect(pruned.groups[0].ingredients).toHaveLength(2);
    expect(pruned.steps).toHaveLength(2);
    expect(draft.groups).toHaveLength(3);
  });
});

describe("draftToDto", () => {
  it("derives positions from the order of groups, ingredients and steps", () => {
    const draft = filledDraft();
    draft.groups.reverse();
    const dto = draftToDto(draft);

    expect(dto.recipeHeaderProducts).toEqual([
      { id: "h-belag", position: 0, text: "Belag" },
      { id: "h-teig", position: 1, text: "Teig" },
    ]);
    expect(dto.recipeProducts?.map((p) => [p?.id, p?.groupPosition, p?.sortOrder])).toEqual([
      ["p-apfel", 0, 0],
      ["p-mehl", 1, 0],
      ["p-zucker", 1, 1],
    ]);
    expect(dto.recipeDescriptions?.map((d) => [d?.id, d?.position])).toEqual([
      ["s-teig", 0],
      ["s-backen", 1],
    ]);
  });

  it("trims texts and keeps the base data", () => {
    const draft = filledDraft();
    draft.name = "  Apfelkuchen  ";
    draft.groups[0].title = " Teig ";
    const dto = draftToDto(draft);
    expect(dto.name).toBe("Apfelkuchen");
    expect(dto.portions).toBe(12);
    expect(dto.recipeCategoryId).toBe("cat-1");
    expect(dto.recipeHeaderProducts?.[0]?.text).toBe("Teig");
  });

  it("skips empty steps and empty groups without title", () => {
    const draft = filledDraft();
    draft.steps.push(emptyStep());
    draft.groups.splice(1, 0, emptyGroup());
    const dto = draftToDto(draft);
    expect(dto.recipeDescriptions).toHaveLength(2);
    expect(dto.recipeHeaderProducts?.map((h) => h?.text)).toEqual(["Teig", "Belag"]);
    expect(dto.recipeProducts?.find((p) => p?.id === "p-apfel")?.groupPosition).toBe(1);
  });

  it("sends new ingredients without id and recreates the given ids", () => {
    const draft = filledDraft();
    draft.groups[0].ingredients.push({ ...emptyIngredient(), productId: "ei", amount: 2, activeUnitId: unit });
    const dto = draftToDto(draft, new Set(["p-mehl"]));
    expect(dto.recipeProducts?.find((p) => p?.productId === "ei")?.id).toBeUndefined();
    expect(dto.recipeProducts?.find((p) => p?.productId === "mehl")?.id).toBeUndefined();
    expect(dto.recipeProducts?.find((p) => p?.productId === "zucker")?.id).toBe("p-zucker");
  });
});

describe("getDraftDeletions", () => {
  it("finds nothing when nothing changed", () => {
    const deletions = getDraftDeletions(filledDraft(), filledDraft());
    expect(deletions.stepIds).toEqual([]);
    expect(deletions.ingredientIds).toEqual([]);
    expect(deletions.groupPositions).toEqual([]);
    expect(deletions.recreateIngredientIds.size).toBe(0);
  });

  it("finds removed steps and ingredients", () => {
    const current = filledDraft();
    current.steps.splice(1, 1);
    current.groups[0].ingredients.splice(1, 1);
    const deletions = getDraftDeletions(filledDraft(), current);
    expect(deletions.stepIds).toEqual(["s-backen"]);
    expect(deletions.ingredientIds).toEqual(["p-zucker"]);
  });

  it("treats emptied steps as removed", () => {
    const current = filledDraft();
    current.steps[0].text = " ";
    expect(getDraftDeletions(filledDraft(), current).stepIds).toEqual(["s-teig"]);
  });

  it("removes groups by their original position, highest first, without deleting their ingredients twice", () => {
    const current = filledDraft();
    current.groups = [];
    const deletions = getDraftDeletions(filledDraft(), current);
    expect(deletions.groupPositions).toEqual([1, 0]);
    expect(deletions.ingredientIds).toEqual([]);
  });

  it("recognizes groups after reordering", () => {
    const current = filledDraft();
    current.groups.reverse();
    expect(getDraftDeletions(filledDraft(), current).groupPositions).toEqual([]);
  });

  it("treats a cleared ingredient row as removed", () => {
    const current = filledDraft();
    Object.assign(current.groups[0].ingredients[0], { productId: "", amount: null, description: "" });
    expect(getDraftDeletions(filledDraft(), current).ingredientIds).toEqual(["p-mehl"]);
  });

  it("treats an emptied group without title as removed", () => {
    const current = filledDraft();
    current.groups[1].ingredients = [];
    current.groups[1].title = "";
    const deletions = getDraftDeletions(filledDraft(), current);
    expect(deletions.groupPositions).toEqual([1]);
    expect(deletions.ingredientIds).toEqual([]);
  });

  it("recreates ingredients that were moved out of a removed group", () => {
    const current = filledDraft();
    const [apfel] = current.groups[1].ingredients;
    current.groups[0].ingredients.push(apfel);
    current.groups.splice(1, 1);
    const deletions = getDraftDeletions(filledDraft(), current);
    expect(deletions.groupPositions).toEqual([1]);
    expect([...deletions.recreateIngredientIds]).toEqual(["p-apfel"]);
  });
});

describe("moveItem", () => {
  it("moves an item without changing the input", () => {
    const list = ["a", "b", "c"];
    expect(moveItem(list, 0, 2)).toEqual(["b", "c", "a"]);
    expect(moveItem(list, 2, 0)).toEqual(["c", "a", "b"]);
    expect(list).toEqual(["a", "b", "c"]);
  });

  it("returns a copy for invalid indexes", () => {
    expect(moveItem(["a", "b"], 0, 5)).toEqual(["a", "b"]);
    expect(moveItem(["a", "b"], -1, 0)).toEqual(["a", "b"]);
  });
});

describe("getDefaultUnitId", () => {
  it("prefers the default unit", () => {
    expect(getDefaultUnitId([{ id: "a" }, { id: "b", isDefault: true }])).toBe("b");
  });

  it("falls back to the first unit or an empty string", () => {
    expect(getDefaultUnitId([{ id: "a", isDefault: false }])).toBe("a");
    expect(getDefaultUnitId([])).toBe("");
    expect(getDefaultUnitId(null)).toBe("");
  });
});

describe("validateDraft", () => {
  it("accepts a complete draft", () => {
    expect(validateDraft(filledDraft())).toEqual({});
  });

  it("reports base data errors by field name", () => {
    const draft = filledDraft();
    draft.name = "  ";
    draft.portions = 0;
    const errors = validateDraft(draft);
    expect(errors.name).toBe("Gib dem Rezept einen Namen");
    expect(errors.portions).toBe("Mindestens 1");
  });

  it("ignores blank rows", () => {
    const draft = filledDraft();
    draft.groups[1].ingredients.push(emptyIngredient());
    expect(validateDraft(draft)).toEqual({});
  });

  it("reports ingredient errors by ingredient key", () => {
    const draft = filledDraft();
    const ingredient = { ...emptyIngredient(), description: "frisch" };
    draft.groups[1].ingredients.push(ingredient);
    const errors = validateDraft(draft);
    expect(errors[`ingredient.${ingredient.key}.productId`]).toBe("Wähle ein Produkt");
    expect(errors[`ingredient.${ingredient.key}.amount`]).toBe("Menge fehlt");
    expect(errors[`ingredient.${ingredient.key}.activeUnitId`]).toBe("Einheit fehlt");
  });

  it("reports step errors by step key", () => {
    const draft = filledDraft();
    draft.steps[0].header = "x".repeat(256);
    expect(validateDraft(draft)[`step.${draft.steps[0].key}.header`]).toBe("Höchstens 255 Zeichen");
  });
});

describe("cloneDraft", () => {
  it("creates an independent copy", () => {
    const draft = filledDraft();
    const copy = cloneDraft(draft);
    copy.groups[0].ingredients[0].amount = 1;
    expect(draft.groups[0].ingredients[0].amount).toBe(250);
    expect(isSameDraft(cloneDraft(draft), draft)).toBe(true);
  });
});

describe("isSameDraft", () => {
  it("detects changes", () => {
    const changed = filledDraft();
    changed.steps[0].text = "Anders";
    expect(isSameDraft(filledDraft(), filledDraft())).toBe(true);
    expect(isSameDraft(filledDraft(), changed)).toBe(false);
  });
});

describe("countIngredients", () => {
  it("counts ingredients over all groups without blank rows", () => {
    expect(countIngredients(filledDraft())).toBe(3);
    expect(countIngredients(emptyDraft())).toBe(0);
  });
});
