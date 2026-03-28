import { defineStore } from "pinia";
import { TFormValues } from "@/components/section/new-recipe/RecipeForm.vue";
import { TGroupedRecipesByCategory } from "@/pages/recipe/recipes.vue";

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
  directlyOpenNewProductModal: boolean;
  lastRecipes: TRecipe[];
}

export type TRecipe = TGroupedRecipesByCategory[number][number];

export const useRecipeStore = defineStore("recipeStore", {
  state: (): IRecipeStore => ({
    newRecipe: null,
    openedRecipe: null,
    recipeGroupIdsToDelete: [],
    recipeProductIdsToDelete: [],
    productGroupsCount: 0,
    shouldValidate: false,
    directlyOpenNewProductModal: false,
    lastRecipes: getRecipeFromStore(),
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
    getDirectlyOpenNewProductModal(state) {
      return state.directlyOpenNewProductModal;
    },
    getLastRecipe(state) {
      return state.lastRecipes.mrFirst();
    },
    getLastRecipes(state) {
      return state.lastRecipes;
    },
  },
  actions: {
    saveRecipeInStore(values: TFormValues) {
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
    setShouldValidate(validate: boolean) {
      this.shouldValidate = validate;
    },
    setDirectlyOpenNewProductModal(setOpen: boolean) {
      this.directlyOpenNewProductModal = setOpen;
    },
    addNewOpenedRecipeToLastRecipes(recipe: TRecipe) {
      const filteredRecipes = this.lastRecipes.filter((r) => r.id !== recipe.id);
      this.lastRecipes = [recipe, ...filteredRecipes].slice(0, 3);
      saveToLocalStore(this.lastRecipes);
    },
  },
});

const saveToLocalStore = (lastRecipes: TRecipe[]) => {
  localStorage.setItem("lastRecipes", JSON.stringify(lastRecipes));
};

const getRecipeFromStore = (): TRecipe[] => {
  return JSON.parse(localStorage.getItem("lastRecipes") ?? "[]");
};
