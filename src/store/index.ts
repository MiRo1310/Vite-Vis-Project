import { Store, StoreDefinition } from "pinia";
import { IdsToControl, IobrokerState, Log } from "@/types/types.ts";
import { ComputedRef } from "vue";
import { TFormValues } from "@/components/section/recipe-form/RecipeForm.vue";
import { TGroupedRecipesByCategory } from "@/pages/recipe/recipes.vue";
import { IobrokerChannels } from "@/iobroker-states/subscribed-states.iobroker.ts";

export interface AppStore {
  showTimer: boolean;
}

export interface IoBrokerStoreState {
  adminConnectionEstablished: boolean;
  subscribedIds: string[];
  idsToControl: IdsToControl;
  iobroker: IobrokerChannels;
}

export type StoreValue<T> = StoreValueType<T> | undefined;

export interface StoreValueType<T> {
  val: T | undefined;
  id: string;
  ack: boolean;
  ts?: number;
  lc?: number;
  from?: string;
  q?: number;
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
}

export type IoBrokerStates = keyof IoBrokerStoreState;

interface IoBrokerStoreActions {
  setAdminConnection(val: boolean): void;
  resetIdsToSubscribe(): void;
  addIdToSubscribedIds(id: string): void;
  removeIdFromSubscribedIds(id: string): void;
  setValues(params: SetValues): void;
}

interface IoBrokerStoreGetters {
  isAdminConnected(state: IoBrokerStoreState): boolean;
  getTrash(state: IoBrokerStoreState): IobrokerChannels["trash"];
  getShoppinglist(state: IoBrokerStoreState): IobrokerChannels["alexaLists"];
  getState(state: IoBrokerStoreState): IoBrokerStoreState;
  getIdsToControl(state: IoBrokerStoreState): IdsToControl;
  getParsedLogs(state: IoBrokerStoreState): ComputedRef<ParsedLogs>;
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
