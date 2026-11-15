import { defineStore } from "pinia";
import { type IRecipeStore, type RecentRecipe } from "@/store/index.ts";
import { MAX_RECENT_PRODUCTS, MAX_RECENT_RECIPES } from "@/constants/recipe.ts";
import { typedStorage } from "@/lib/local-storage.ts";
import { Collection } from "@/lib/array.ts";
import { cloneDraft, type RecipeDraft } from "@/lib/recipe-editor.ts";

export const useRecipeStore = defineStore("recipeStore", {
  state: (): IRecipeStore => ({
    recipeInProgress: null,
    lastRecipes: new Collection(typedStorage.getItem("lastRecipes")),
    recentProductIds: typedStorage.getItem("recentProductIds"),
  }),
  getters: {
    getRecipeInProgress(state) {
      return state.recipeInProgress;
    },
    getLastRecipe(state) {
      return state.lastRecipes.first;
    },
    getLastRecipes(state) {
      return state.lastRecipes;
    },
    getRecentProductIds(state) {
      return state.recentProductIds;
    },
  },
  actions: {
    saveRecipeInProgress(draft: RecipeDraft, recipeId?: string) {
      this.recipeInProgress = { recipeId, draft: cloneDraft(draft) };
    },
    resetRecipeInProgress() {
      this.recipeInProgress = null;
    },
    addNewOpenedRecipeToLastRecipes({ id, name }: RecentRecipe) {
      const others = this.lastRecipes.filter((r) => r.id !== id);
      this.lastRecipes = new Collection([{ id, name }, ...others].slice(0, MAX_RECENT_RECIPES));
      saveToLocalStore(this.lastRecipes);
    },
    removeFromLastRecipes(id: string) {
      this.lastRecipes = new Collection(this.lastRecipes.filter((r) => r.id !== id));
      saveToLocalStore(this.lastRecipes);
    },
    addRecentProduct(productId: string) {
      if (!productId) {
        return;
      }
      this.recentProductIds = [productId, ...this.recentProductIds.filter((id) => id !== productId)].slice(0, MAX_RECENT_PRODUCTS);
      typedStorage.setItem("recentProductIds", this.recentProductIds);
    },
  },
});

const saveToLocalStore = (lastRecipes: RecentRecipe[]) => {
  typedStorage.setItem("lastRecipes", lastRecipes);
};
