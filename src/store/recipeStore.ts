import { defineStore } from "pinia";
import { GetRecipeByIdQuery } from "@/api/gql/graphql";

export interface IRecipeGroupToDelete {
  groupPosition: number;
  recipeId: string;
}

interface IRecipeStore {
  newRecipe: GetRecipeByIdQuery["recipe"] | null;
  openedRecipe: { id: string } | null;
  recipeGroupIdsToDelete: IRecipeGroupToDelete[];
  recipeProductIdsToDelete: string[];
  productGroupsCount: number;
}

export const useRecipeStore = defineStore("recipeStore", {
  state: (): IRecipeStore => ({
    newRecipe: null,
    openedRecipe: null,
    recipeGroupIdsToDelete: [],
    recipeProductIdsToDelete: [],
    productGroupsCount: 0,
  }),
  getters: {
    getRecipeFromStore(state) {
      return state.newRecipe;
    },
    getOpenedRecipe(state) {
      return state.openedRecipe;
    },
    getRecipeGroupIdsToDelete(state) {
      return state.recipeGroupIdsToDelete;
    },
    getRecipeProductsToDelete(state) {
      return state.recipeProductIdsToDelete;
    },
    getProductGroupsCount(state) {
      return state.productGroupsCount;
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
    addRecipeGroupToDelete(obj: IRecipeGroupToDelete) {
      this.recipeGroupIdsToDelete.push(obj);
    },
    clearRecipeGroupIdsToDelete() {
      this.recipeGroupIdsToDelete = [];
    },
    addRecipeProductIdToDelete(id: string) {
      this.recipeProductIdsToDelete.push(id);
    },
    clearRecipeProductIdsToDelete() {
      this.recipeProductIdsToDelete = [];
    },
    setProductGroupCount(count: number) {
      this.productGroupsCount = count;
    },
  },
});
