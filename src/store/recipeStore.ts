import { defineStore } from "pinia";
import { TFormValues } from "@/components/section/recipe-form/RecipeForm.vue";
import { TGroupedRecipesByCategory } from "@/pages/recipe/recipes.vue";

export interface IRecipeGroupToDelete {
  groupPosition: number;
  recipeId: string;
}

interface IRecipeStore {
  recipeInProgress: (TFormValues & { recipeId?: string }) | null;
  recipeGroupIdsToDelete: IRecipeGroupToDelete[];
  recipeProductIdsToDelete: string[];
  recipeDescriptionIdsToDelete: string[];
  productGroupsCount: number;
  shouldValidate: boolean;
  directlyOpenNewProductModal: boolean;
  lastRecipes: TRecipe[];
}

export type TRecipe = TGroupedRecipesByCategory[number][number];

export const useRecipeStore = defineStore("recipeStore", {
  state: (): IRecipeStore => ({
    recipeInProgress: null,
    recipeGroupIdsToDelete: [],
    recipeProductIdsToDelete: [],
    recipeDescriptionIdsToDelete: [],
    productGroupsCount: 0,
    shouldValidate: false,
    directlyOpenNewProductModal: false,
    lastRecipes: getRecipeFromLocalStorage(),
  }),
  getters: {
    getRecipeInProgress(state) {
      return state.recipeInProgress;
    },
    getRecipeGroupIdsToDelete(state) {
      return state.recipeGroupIdsToDelete;
    },
    getRecipeProductIdsToDelete(state) {
      return state.recipeProductIdsToDelete;
    },
    getRecipeDescriptionIdsToDelete(state) {
      return state.recipeDescriptionIdsToDelete;
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
    saveRecipeInProgress(values: TFormValues, id?: string) {
      this.recipeInProgress = { ...values, recipeId: id };
    },
    resetRecipeInProgress() {
      this.recipeInProgress = null;
    },
    addRecipeGroupToDelete(obj: IRecipeGroupToDelete) {
      this.recipeGroupIdsToDelete.push(obj);
    },
    clearRecipeGroupIdsToDelete() {
      this.recipeGroupIdsToDelete = [];
    },
    addRecipeDescriptionIdToDelete(id: string) {
      this.recipeDescriptionIdsToDelete.push(id);
    },
    clearRecipeDescriptionIdsToDelete() {
      this.recipeDescriptionIdsToDelete = [];
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
    getFilterLastRecipes(groups: TGroupedRecipesByCategory) {
      this.lastRecipes = this.lastRecipes.filter((r) => Object.values(groups)?.some((g) => g.some((p) => p.id === r.id)));
      saveToLocalStore(this.lastRecipes);
      return this.lastRecipes;
    },
  },
});

const saveToLocalStore = (lastRecipes: TRecipe[]) => {
  localStorage.setItem("lastRecipes", JSON.stringify(lastRecipes));
};

const getRecipeFromLocalStorage = (): TRecipe[] => {
  return JSON.parse(localStorage.getItem("lastRecipes") ?? "[]");
};
