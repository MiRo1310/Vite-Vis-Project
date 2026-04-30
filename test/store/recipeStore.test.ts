import { beforeEach, describe, expect, it } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useRecipeStore } from "../../src/store/recipeStore";

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
    expect(store.lastRecipes).toEqual([]);

    const r1 = { id: "r1", title: "one" } as any;
    const r2 = { id: "r2", title: "two" } as any;
    const r3 = { id: "r3", title: "three" } as any;
    const r4 = { id: "r4", title: "four" } as any;

    store.addNewOpenedRecipeToLastRecipes(r1);
    expect(store.lastRecipes[0].id).toBe("r1");
    // add another
    store.addNewOpenedRecipeToLastRecipes(r2);
    expect(store.lastRecipes[0].id).toBe("r2");
    // add three and four to ensure slicing to 3
    store.addNewOpenedRecipeToLastRecipes(r3);
    store.addNewOpenedRecipeToLastRecipes(r4);
    expect(store.lastRecipes).toHaveLength(3);
    // ensure localStorage was written
    const saved = JSON.parse(localStorage.getItem("lastRecipes") ?? "[]");
    expect(Array.isArray(saved)).toBe(true);
    expect(saved[0].id).toBe(store.lastRecipes[0].id);
  });
});

