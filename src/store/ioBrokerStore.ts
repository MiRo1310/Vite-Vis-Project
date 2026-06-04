import { IdsToControl, IobrokerState, Log } from "@/types/types.ts";
import { defineStore } from "pinia";
import { computed } from "vue";
import { getStoreValString } from "@/lib/object.ts";
import { toJSON } from "@michaelroling/ts-library";
import { IoBrokerStoreState, ParsedLogs, SetValues, StoreType } from "@/store/index.ts";
import { IobrokerChannels } from "@/iobroker-states/states-subscribed/iobroker.iobroker.ts";

const empty = <T>() => ({}) as T;

export const useIobrokerStore: StoreType = defineStore("iobrokerStore", {
  state: (): IoBrokerStoreState => ({
    adminConnectionEstablished: false,
    idsToControl: empty<IdsToControl>(),
    subscribedIds: [],
    iobroker: empty<IobrokerChannels>(),
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
          error: toJSON<Log[]>(getStoreValString(state.iobroker.logs?.error)).json ?? [],
          warn: toJSON<Log[]>(getStoreValString(state.iobroker.logs?.warning)).json ?? [],
          info: toJSON<Log[]>(getStoreValString(state.iobroker.logs?.info)).json ?? [],
          heatPump: toJSON<Log[]>(getStoreValString(state.iobroker.logs?.heatPump)).json ?? [],
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

    setValues({ val, id, key, channel, group, state }: SetValues): void {
      const iobroker = this.getState["iobroker"];
      const path = filterTruthy([channel, group, key]);

      const stateObj = new StoreValueClass({ ...state, val, id });
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
