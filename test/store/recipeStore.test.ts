import { beforeEach, describe, expect, it } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useRecipeStore } from "@/store/recipeStore.ts";
import { MAX_RECENT_PRODUCTS, MAX_RECENT_RECIPES } from "@/constants/recipe.ts";
import { emptyDraft } from "@/lib/recipe-editor.ts";

describe("recipeStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  it("saves a copy of the draft and resets it", () => {
    const store = useRecipeStore();
    expect(store.recipeInProgress).toBeNull();

    const draft = { ...emptyDraft(), name: "Test" };
    store.saveRecipeInProgress(draft, "rid");
    draft.name = "geändert";

    expect(store.recipeInProgress?.recipeId).toBe("rid");
    expect(store.recipeInProgress?.draft.name).toBe("Test");

    store.resetRecipeInProgress();
    expect(store.recipeInProgress).toBeNull();
  });

  it("remembers recently used products, newest first, without duplicates", () => {
    const store = useRecipeStore();
    store.addRecentProduct("a");
    store.addRecentProduct("b");
    store.addRecentProduct("a");
    store.addRecentProduct("");

    expect(store.getRecentProductIds).toEqual(["a", "b"]);
    expect(JSON.parse(localStorage.getItem("recentProductIds") ?? "[]")).toEqual(["a", "b"]);

    for (let i = 0; i < MAX_RECENT_PRODUCTS + 2; i++) {
      store.addRecentProduct("p" + i);
    }
    expect(store.getRecentProductIds).toHaveLength(MAX_RECENT_PRODUCTS);
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
