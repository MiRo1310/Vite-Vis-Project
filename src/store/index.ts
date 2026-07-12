import { type StoreDefinition } from "pinia";
import { type IdsToControl } from "@/types/types.ts";
import { type TFormValues } from "@/components/section/recipe-form/RecipeForm.vue";
import { type TGroupedRecipesByCategory } from "@/pages/recipe/recipes.vue";
import { type iobrokerTree } from "@/iobroker-states/subscribed-states.iobroker.ts";

export interface AppStore {
  showTimer: boolean;
}

export interface IoBrokerStoreState {
  idsToControl: IdsToControl;
  iobroker: typeof iobrokerTree;
}

interface IoBrokerStoreActions {
  setAdminConnection(val: boolean): void;
}

interface IoBrokerStoreGetters {
  isAdminConnected(state: IoBrokerStoreState): boolean;
  getIdsToControl(state: IoBrokerStoreState): IdsToControl;
}

export type StoreType = StoreDefinition<"iobrokerStore", IoBrokerStoreState, IoBrokerStoreGetters, IoBrokerStoreActions>;

export interface IRecipeGroupToDelete {
  groupPosition: number;
  recipeId: string;
}

export interface IRecipeStore {
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
