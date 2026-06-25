import { IdsToControl } from "@/types/types.ts";
import { BaseValue } from "@/store/valueClasses.ts";
import { defineStore } from "pinia";
import { computed } from "vue";
import { IoBrokerStoreState, ParsedLogs, SetValues, StoreType } from "@/store/index.ts";
import { createEmptyIobrokerSkeleton, IobrokerChannels, iobrokerData } from "@/iobroker-states/subscribed-states.iobroker.ts";

const empty = <T>() => ({}) as T;

export const useIobrokerStore: StoreType = defineStore("iobrokerStore", {
  state: (): IoBrokerStoreState => ({
    adminConnectionEstablished: false,
    idsToControl: empty<IdsToControl>(),
    subscribedIds: [],
    // Channel-/Group-Container existieren von Anfang an (keine iobroker.pool?.-Checks mehr nötig),
    // nur die Leaf-Werte selbst bleiben bis zur ersten ioBroker-Nachricht undefined.
    iobroker: createEmptyIobrokerSkeleton(iobrokerData),
  }),
  getters: {
    isAdminConnected(state: IoBrokerStoreState) {
      return state.adminConnectionEstablished;
    },
    getTrash(state: IoBrokerStoreState) {
      return state.iobroker.trash;
    },
    getShoppinglist(state: IoBrokerStoreState) {
      return state.iobroker.alexaLists;
    },
    getState(state: IoBrokerStoreState) {
      return state;
    },
    getIdsToControl(state: IoBrokerStoreState) {
      return state.idsToControl;
    },
    getParsedLogs(state: IoBrokerStoreState) {
      return computed((): ParsedLogs => {
        return {
          error: state.iobroker.logs.error.parsed([]),
          warn: state.iobroker.logs.warning.parsed([]),
          info: state.iobroker.logs.info.parsed([]),
          heatPump: state.iobroker.logs.heatPump.parsed([]),
        };
      });
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
    setInitialValues(values: IobrokerChannels) {
      this.iobroker = values;
    },

    setValues({ val, id, key, channel, group, state, valueClass }: SetValues): void {
      const iobroker = this.getState["iobroker"];
      const path = filterTruthy([channel, group, key]);
      let obj: any = iobroker;

      for (let i = 0; i < path.length; i++) {
        const p = path[i];

        if (isLastKey(path, i)) {
          // Im statischen Schema existiert die Instanz bereits (Skeleton) - nur aktualisieren.
          // Bei rein dynamischen Subscriptions (außerhalb des Schemas) wird sie hier neu angelegt.
          if (obj[p] instanceof BaseValue) {
            obj[p].update({ ...state, val, id });
          } else {
            obj[p] = new valueClass({ ...state, val, id });
          }
        } else {
          obj[p] ??= {}; // nur Zwischenebenen erzeugen
          obj = obj[p];
        }
      }

      this.iobroker = iobroker;
    },
  },
});

function isLastKey(array: unknown[], index: number): boolean {
  return array.length - 1 === index;
}

function filterTruthy<T>(items: (T | undefined)[]): T[] {
  return items.filter((i): i is T => i !== undefined);
}
