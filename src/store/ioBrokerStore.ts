import { IdsToControl, IobrokerState, Log } from "@/types/types.ts";
import { JsonValue } from "@/store/valueClasses.ts";
import { defineStore } from "pinia";
import { computed } from "vue";
import { IoBrokerStoreState, ParsedLogs, SetValues, StoreType } from "@/store/index.ts";
import { createEmptyIobrokerSkeleton, iobrokerData, IobrokerChannels } from "@/iobroker-states/subscribed-states.iobroker.ts";

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
          error: parseLog(state.iobroker.logs?.error),
          warn: parseLog(state.iobroker.logs?.warning),
          info: parseLog(state.iobroker.logs?.info),
          heatPump: parseLog(state.iobroker.logs?.heatPump),
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
      const ValueCtor = valueClass ?? StoreValueClass;
      const stateObj = new ValueCtor({ ...state, val, id });
      let obj: any = iobroker;

      for (let i = 0; i < path.length; i++) {
        const p = path[i];

        if (isLastKey(path, i)) {
          obj[p] = stateObj;
        } else {
          obj[p] ??= {}; // nur Zwischenebenen erzeugen
          obj = obj[p];
        }
      }

      this.iobroker = iobroker;
    },
  },
});

function parseLog(value: JsonValue<Log[]> | undefined): Log[] {
  return value?.parsed ?? [];
}

function isLastKey(array: unknown[], index: number): boolean {
  return array.length - 1 === index;
}

export class StoreValueClass<T> {
  public id: string;
  public val: T;
  public ack: boolean;
  public ts?: number;
  public lc?: number;
  public from?: string;
  public q?: number;

  constructor({ id, ack, ts, val, lc, q, from }: IobrokerState & { id: string; val: T }) {
    this.val = val;
    this.id = id;
    this.ack = ack;
    this.ts = ts;
    this.lc = lc;
    this.from = from;
    this.q = q;
  }

  public get(fallback: T): T {
    return this.val ?? fallback;
  }
}

function filterTruthy<T>(items: (T | undefined)[]): T[] {
  return items.filter((i): i is T => i !== undefined);
}
