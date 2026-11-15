import { defineStore } from "pinia";
import { type TFormValues } from "@/components/section/recipe-form/RecipeForm.vue";
import { type IRecipeGroupToDelete, type IRecipeStore, type RecentRecipe } from "@/store/index.ts";
import { MAX_RECENT_RECIPES } from "@/constants/recipe.ts";
import { typedStorage } from "@/lib/local-storage.ts";
import { Collection } from "@/lib/array.ts";

export const useRecipeStore = defineStore("recipeStore", {
  state: (): IRecipeStore => ({
    recipeInProgress: null,
    recipeGroupIdsToDelete: [],
    recipeProductIdsToDelete: [],
    recipeDescriptionIdsToDelete: [],
    productGroupsCount: 0,
    shouldValidate: false,
    directlyOpenNewProductModal: false,
    lastRecipes: new Collection(typedStorage.getItem("lastRecipes")),
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
      return state.lastRecipes.first;
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
    addNewOpenedRecipeToLastRecipes({ id, name }: RecentRecipe) {
      const others = this.lastRecipes.filter((r) => r.id !== id);
      this.lastRecipes = new Collection([{ id, name }, ...others].slice(0, MAX_RECENT_RECIPES));
      saveToLocalStore(this.lastRecipes);
    },
    removeFromLastRecipes(id: string) {
      this.lastRecipes = new Collection(this.lastRecipes.filter((r) => r.id !== id));
      saveToLocalStore(this.lastRecipes);
    },
  },
});

const saveToLocalStore = (lastRecipes: RecentRecipe[]) => {
  typedStorage.setItem("lastRecipes", lastRecipes);
};
