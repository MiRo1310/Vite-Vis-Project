import { type IdsToControl } from "@/types/types.ts";
import { defineStore } from "pinia";
import { type IoBrokerStoreState, type StoreType } from "@/store/index.ts";
import { iobrokerTree } from "@/iobroker-states/subscribed-states.iobroker.ts";

export const useIobrokerStore = defineStore("iobrokerStore", {
  state: (): IoBrokerStoreState => ({
    idsToControl: {} as IdsToControl,
    iobroker: iobrokerTree,
  }),
  getters: {
    getTrash: (state) => state.iobroker.trash,
    getShoppinglist: (state) => state.iobroker.alexaLists,
    getState: (state) => state as IoBrokerStoreState,
    getIdsToControl: (state) => state.idsToControl,
  },
  actions: {},
}) as unknown as StoreType;
