import { IdsToControl } from "@/types/types.ts";
import { defineStore } from "pinia";
import { IoBrokerStoreState, ParsedLogs, StoreType } from "@/store/index.ts";
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
    getTrash: (state) => state.iobroker.trash,
    getShoppinglist: (state) => state.iobroker.alexaLists,
    getState: (state) => state as IoBrokerStoreState,
    getIdsToControl: (state) => state.idsToControl,
    getParsedLogs(state): ParsedLogs {
      return {
        error: state.iobroker.logs.error.parsed([]),
        warn: state.iobroker.logs.warning.parsed([]),
        info: state.iobroker.logs.info.parsed([]),
        heatPump: state.iobroker.logs.heatPump.parsed([]),
      };
    },
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
