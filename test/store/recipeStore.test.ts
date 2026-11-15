import { beforeEach, describe, expect, it } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useRecipeStore } from "@/store/recipeStore.ts";
import { MAX_RECENT_RECIPES } from "@/constants/recipe.ts";

describe("recipeStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  it("saves and resets recipe in progress", () => {
    const store = useRecipeStore();
    expect(store.recipeInProgress).toBeNull();

    store.saveRecipeInProgress({ name: "Test" } as any, "rid");
    expect(store.recipeInProgress).not.toBeNull();
    expect(store.recipeInProgress?.recipeId).toBe("rid");

    store.resetRecipeInProgress();
    expect(store.recipeInProgress).toBeNull();
  });

  it("manages ids to delete and toggles flags", () => {
    const store = useRecipeStore();

    store.addRecipeGroupToDelete({ groupPosition: 1, recipeId: "r1" });
    expect(store.recipeGroupIdsToDelete).toHaveLength(1);
    store.clearRecipeGroupIdsToDelete();
    expect(store.recipeGroupIdsToDelete).toHaveLength(0);

    store.addRecipeProductIdToDelete("p1");
    expect(store.recipeProductIdsToDelete).toContain("p1");
    store.clearRecipeProductIdsToDelete();
    expect(store.recipeProductIdsToDelete).toHaveLength(0);

    store.addRecipeDescriptionIdToDelete("d1");
    expect(store.recipeDescriptionIdsToDelete).toContain("d1");
    store.clearRecipeDescriptionIdsToDelete();
    expect(store.recipeDescriptionIdsToDelete).toHaveLength(0);

    store.setProductGroupCount(5);
    expect(store.productGroupsCount).toBe(5);

    store.setShouldValidate(true);
    expect(store.shouldValidate).toBe(true);

    store.setDirectlyOpenNewProductModal(true);
    expect(store.directlyOpenNewProductModal).toBe(true);
  });

  it("adds new opened recipe to lastRecipes and persists to localStorage", () => {
    const store = useRecipeStore();
    // start with empty
    expect(store.lastRecipes.toArray).toEqual([]);

    store.addNewOpenedRecipeToLastRecipes({ id: "r1", name: "one" });
    expect(store.lastRecipes.first.id).toBe("r1");
    store.addNewOpenedRecipeToLastRecipes({ id: "r2", name: "two" });
    expect(store.lastRecipes.first.id).toBe("r2");

    // reopening moves the recipe to the front without duplicating it
    store.addNewOpenedRecipeToLastRecipes({ id: "r1", name: "one" });
    expect(store.lastRecipes.map((r) => r.id)).toEqual(["r1", "r2"]);

    // only id and name are kept
    store.addNewOpenedRecipeToLastRecipes({ id: "r3", name: "three", totalKcal: 100 } as any);
    expect(store.lastRecipes.first).toEqual({ id: "r3", name: "three" });

    for (let i = 0; i < MAX_RECENT_RECIPES + 2; i++) {
      store.addNewOpenedRecipeToLastRecipes({ id: "x" + i, name: "x" });
    }
    expect(store.lastRecipes).toHaveLength(MAX_RECENT_RECIPES);
    // ensure localStorage was written
    const saved = JSON.parse(localStorage.getItem("lastRecipes") ?? "[]");
    expect(Array.isArray(saved)).toBe(true);
    expect(saved[0].id).toBe(store.lastRecipes[0].id);
  });

  it("removes a recipe from lastRecipes and persists it", () => {
    const store = useRecipeStore();
    store.addNewOpenedRecipeToLastRecipes({ id: "r1", name: "one" });
    store.addNewOpenedRecipeToLastRecipes({ id: "r2", name: "two" });

    store.removeFromLastRecipes("r1");

    expect(store.lastRecipes.map((r) => r.id)).toEqual(["r2"]);
    expect(JSON.parse(localStorage.getItem("lastRecipes") ?? "[]")).toEqual([{ id: "r2", name: "two" }]);
  });
});
