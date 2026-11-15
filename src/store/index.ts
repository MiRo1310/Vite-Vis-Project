import { type StoreDefinition } from "pinia";
import { type IdsToControl } from "@/types/types.ts";
import { type TFormValues } from "@/components/section/recipe-form/RecipeForm.vue";
import { type RecipesQuery } from "@/api/gql/graphql.ts";
import { type iobrokerTree } from "@/iobroker-states/subscribed-states.iobroker.ts";
import { type Collection } from "@/lib/array.ts";

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
  getTrash(state: IoBrokerStoreState): (typeof iobrokerTree)["trash"];
  getShoppinglist(state: IoBrokerStoreState): (typeof iobrokerTree)["alexaLists"];
  getState(state: IoBrokerStoreState): IoBrokerStoreState;
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
  lastRecipes: Collection<RecentRecipe>;
}

export type TRecipe = RecipesQuery["recipes"][number];

/** Gemerkter Eintrag für „Zuletzt geöffnet“ – nur das Nötigste, der Rest kommt frisch vom Server. */
export interface RecentRecipe {
  id: string;
  name: string;
}
