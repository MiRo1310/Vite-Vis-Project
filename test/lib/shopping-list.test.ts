import { describe, expect, it } from "vitest";
import { formatShoppingItem, ingredientsToShoppingItems, matchIngredientsWithShoppingList, shoppingListMatchKey } from "@/lib/shopping-list.ts";

describe("ingredientsToShoppingItems", () => {
  const ingredients = [
    { amount: 200, unit: "g", product: { name: "Mehl" } },
    { amount: 2, unit: "Stück", product: { name: "Ei" } },
    { amount: 50, unit: "g", product: { name: "Zucker" } },
    { amount: 30, unit: "g", product: { name: " zucker " } },
    { amount: null, unit: null, product: { name: "Salz" } },
    { amount: 1, unit: "g", product: null },
  ];

  it("scales amounts to the target portions", () => {
    const items = ingredientsToShoppingItems(ingredients, 4, 2, "r1");
    expect(items[0]).toEqual({ name: "Mehl", amount: 100, unit: "g", recipeId: "r1" });
    expect(items[1].amount).toBe(1);
  });

  it("sums the same product with the same unit and drops ingredients without product", () => {
    const items = ingredientsToShoppingItems(ingredients, 4, 4);
    expect(items.map((i) => i.name)).toEqual(["Mehl", "Ei", "Zucker", "Salz"]);
    expect(items[2].amount).toBe(80);
  });

  it("keeps different units apart", () => {
    const items = ingredientsToShoppingItems(
      [
        { amount: 1, unit: "Packung", product: { name: "Butter" } },
        { amount: 20, unit: "g", product: { name: "Butter" } },
      ],
      1,
      1,
    );
    expect(items).toHaveLength(2);
  });

  it("leaves amount and unit empty when unknown", () => {
    const [salz] = ingredientsToShoppingItems([{ amount: null, unit: " ", product: { name: "Salz" } }], 1, 1);
    expect(salz.amount).toBeUndefined();
    expect(salz.unit).toBeUndefined();
  });
});

describe("formatShoppingItem", () => {
  it("puts amount, unit and name together", () => {
    expect(formatShoppingItem({ name: "Mehl", amount: 250, unit: "g" })).toBe("250 g Mehl");
    expect(formatShoppingItem({ name: "Milch", amount: 0.5, unit: "l" })).toBe("0,5 l Milch");
  });

  it("drops missing parts", () => {
    expect(formatShoppingItem({ name: "Ei", amount: 2 })).toBe("2 Ei");
    expect(formatShoppingItem({ name: "Salz", unit: "g" })).toBe("Salz");
    expect(formatShoppingItem({ name: "Salz", amount: 0, unit: "g" })).toBe("Salz");
  });
});

describe("shoppingListMatchKey", () => {
  it("returns the normalized name for measure units", () => {
    expect(shoppingListMatchKey(" Mehl ", "g")).toBe("mehl");
    expect(shoppingListMatchKey("Salz", null)).toBe("salz");
  });

  it("puts package units in front of the name", () => {
    expect(shoppingListMatchKey("Ketchup", "Flasche")).toBe("flasche ketchup");
    expect(shoppingListMatchKey("Tomaten", " Dosen ")).toBe("dosen tomaten");
  });

  it("returns an empty key without a name", () => {
    expect(shoppingListMatchKey("  ", "Flasche")).toBe("");
  });
});

describe("matchIngredientsWithShoppingList", () => {
  const names = (...list: string[]) => list.map((name) => ({ name }));

  it("matches case-insensitive and ignores extra whitespace", () => {
    expect([...matchIngredientsWithShoppingList(names("Mehl", "Ei"), ["  MEHL "])]).toEqual(["mehl"]);
  });

  it("matches list entries that contain the whole name", () => {
    expect([...matchIngredientsWithShoppingList(names("Mehl", "Ei"), ["250 g Mehl", "Eier"])]).toEqual(["mehl", "ei"]);
  });

  it("does not match when the list entry contains only part of the name", () => {
    expect(matchIngredientsWithShoppingList(names("Mehl", "Möhren"), ["Meh", "Möhre"]).size).toBe(0);
  });

  it("handles umlauts and special characters in names", () => {
    expect(matchIngredientsWithShoppingList(names("Möhre", "Salz (grob)"), ["2 Möhre", "salz (grob)"]).size).toBe(2);
  });

  it("ignores measure units", () => {
    expect([...matchIngredientsWithShoppingList([{ name: "Mehl", unit: "g" }], ["Mehl"])]).toEqual(["mehl"]);
  });

  it("requires package units on the list", () => {
    const ingredients = [{ name: "Ketchup" }, { name: "Ketchup", unit: "Flasche" }];
    expect([...matchIngredientsWithShoppingList(ingredients, ["Ketchup"])]).toEqual(["ketchup"]);
    expect([...matchIngredientsWithShoppingList(ingredients, ["1 Flasche Ketchup"])]).toEqual(["ketchup", "flasche ketchup"]);
  });

  it("returns nothing for an empty list", () => {
    expect(matchIngredientsWithShoppingList(names("Mehl"), []).size).toBe(0);
  });
});
