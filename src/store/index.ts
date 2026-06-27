import { type Store, type StoreDefinition } from "pinia";
import { type IdsToControl, type IobrokerState, type Log } from "@/types/types.ts";
import { type TFormValues } from "@/components/section/recipe-form/RecipeForm.vue";
import { type TGroupedRecipesByCategory } from "@/pages/recipe/recipes.vue";
import { type iobrokerTree } from "@/iobroker-states/subscribed-states.iobroker.ts";
import { type ValueClassCtor } from "@/store/valueClasses.ts";

export interface AppStore {
  showTimer: boolean;
}

export interface IoBrokerStoreState {
  adminConnectionEstablished: boolean;
  subscribedIds: string[];
  idsToControl: IdsToControl;
  iobroker: typeof iobrokerTree;
}

export interface ParsedLogs {
  error: Log[];
  warn: Log[];
  info: Log[];
  heatPump: Log[];
}

export interface SetValues {
  val: string | number | boolean | null;
  id: string;
  key: string;
  channel: string;
  group?: string;
  timestamp?: boolean;
  state: IobrokerState;
  valueClass: ValueClassCtor;
}

interface IoBrokerStoreActions {
  setAdminConnection(val: boolean): void;
  resetIdsToSubscribe(): void;
  addIdToSubscribedIds(id: string): void;
  removeIdFromSubscribedIds(id: string): void;
}

interface IoBrokerStoreGetters {
  isAdminConnected(state: IoBrokerStoreState): boolean;
  getTrash(state: IoBrokerStoreState): (typeof iobrokerTree)["trash"];
  getShoppinglist(state: IoBrokerStoreState): (typeof iobrokerTree)["alexaLists"];
  getState(state: IoBrokerStoreState): IoBrokerStoreState;
  getIdsToControl(state: IoBrokerStoreState): IdsToControl;
  getParsedLogs(state: IoBrokerStoreState): ParsedLogs;
}

export type StoreType = StoreDefinition<"iobrokerStore", IoBrokerStoreState, IoBrokerStoreGetters, IoBrokerStoreActions>;
export type IoBrokerStore = Store<"iobrokerStore", IoBrokerStoreState, IoBrokerStoreGetters, IoBrokerStoreActions>;

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
