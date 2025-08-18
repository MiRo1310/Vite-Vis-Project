import { defineStore } from "pinia";
import { GetRecipeByIdQuery } from "@/api/gql/graphql";

interface RecipeStore {
  newRecipe: GetRecipeByIdQuery["recipe"] | null;
  openedRecipe: { id: string } | null;
}

export const useRecipeStore = defineStore("recipeStore", {
  state: (): RecipeStore => ({
    newRecipe: null,
    openedRecipe: null,
  }),
  getters: {
    getRecipeFromStore(state) {
      return state.newRecipe;
    },
    getOpenedRecipe(state) {
      return state.openedRecipe;
    },
  },
  actions: {
    saveRecipeInStore(values: GetRecipeByIdQuery["recipe"]) {
      this.newRecipe = values;
    },
    resetRecipeInStore() {
      this.newRecipe = null;
    },
    saveOpenedRecipe(recipe: { id: string }) {
      this.openedRecipe = recipe;
    },
  },
});
