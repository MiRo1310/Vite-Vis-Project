import { defineStore } from "pinia";
import { TFormValues } from "@/components/section/new-recipe/RecipeForm.vue";

export interface IRecipeGroupToDelete {
  groupPosition: number;
  recipeId: string;
}

interface IRecipeStore {
  newRecipe: TFormValues | null;
  openedRecipe: { id: string } | null;
  recipeGroupIdsToDelete: IRecipeGroupToDelete[];
  recipeProductIdsToDelete: string[];
  productGroupsCount: number;
  shouldValidate: boolean;
}

export const useRecipeStore = defineStore("recipeStore", {
  state: (): IRecipeStore => ({
    newRecipe: null,
    openedRecipe: null,
    recipeGroupIdsToDelete: [],
    recipeProductIdsToDelete: [],
    productGroupsCount: 0,
    shouldValidate: false,
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
    getShouldValidate(state) {
      return state.shouldValidate;
    },
  },
  actions: {
    saveRecipeInStore(values: TFormValues) {
      console.log("saveRecipeInStore", values);
      this.newRecipe = values;
    },
    resetRecipeInStore() {
      console.log("resetRecipeInStore");
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
    setShouldValidate(validate: boolean) {
      this.shouldValidate = validate;
    },
  },
});
