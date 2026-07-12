import { type IdsToControl } from "@/types/types.ts";
import { defineStore } from "pinia";
import { type IoBrokerStoreState, type StoreType } from "@/store/index.ts";
import { iobrokerTree } from "@/iobroker-states/subscribed-states.iobroker.ts";

export const useIobrokerStore = defineStore("iobrokerStore", {
  state: (): IoBrokerStoreState => ({
    adminConnectionEstablished: false,
    idsToControl: {} as IdsToControl,
    subscribedIds: [],
    iobroker: iobrokerTree,
  }),
  getters: {
    isAdminConnected: (state) => state.adminConnectionEstablished,
    getIdsToControl: (state) => state.idsToControl,
  },
  actions: {
    setAdminConnection(val: boolean) {
      this.adminConnectionEstablished = val;
    },
    resetIdsToSubscribe() {
      this.subscribedIds = [];
    },
    addIdToSubscribedIds(id: string) {
      this.subscribedIds.push(id);
    },
    removeIdFromSubscribedIds(id: string) {
      this.subscribedIds = this.subscribedIds.filter((i) => i !== id);
    },
  },
}) as unknown as StoreType;
