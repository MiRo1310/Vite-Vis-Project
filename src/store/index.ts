import { type StoreDefinition } from "pinia";
import { type IdsToControl } from "@/types/types.ts";
import { type RecipeDraft } from "@/lib/recipe-editor.ts";
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

/** Ungespeicherter Editor-Entwurf; `recipeId` fehlt bei einem neuen Rezept. */
export interface RecipeDraftInProgress {
  recipeId?: string;
  draft: RecipeDraft;
}

export interface IRecipeStore {
  recipeInProgress: RecipeDraftInProgress | null;
  lastRecipes: Collection<RecentRecipe>;
  /** Zuletzt im Editor gewählte Produkt-IDs, neueste zuerst */
  recentProductIds: string[];
}

/** Gemerkter Eintrag für „Zuletzt geöffnet“ – nur das Nötigste, der Rest kommt frisch vom Server. */
export interface RecentRecipe {
  id: string;
  name: string;
}
