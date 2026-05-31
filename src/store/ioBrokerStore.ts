import { IdsToControl, IobrokerState, Log, LogReset, TimerObject } from "@/types/types.ts";
import { defineStore } from "pinia";
import { computed } from "vue";
import { HeatingTimeSlot } from "@/components/section/heating/HeatingControlPeriodDay.vue";
import { BatteriesTypeIobroker } from "../iobroker-states/states-subscribed/batteriesType.iobroker.ts";
import { AlexaAction } from "@/pages/vis/alexa.vue";
import { getStoreValString } from "@/lib/object.ts";
import { toJSON } from "@michaelroling/ts-library";
import { IoBrokerStoreState, ParsedLogs, SetValues, SetValuesLegacy, StoreType, StoreValue } from "@/store/index.ts";
import { IobrokerChannels } from "@/iobroker-states/states-subscribed/iobroker.iobroker.ts";

const empty = <T>() => ({}) as T;

export const useIobrokerStore: StoreType = defineStore("iobrokerStore", {
  state: (): IoBrokerStoreState => ({
    adminConnectionEstablished: false,
    alexaAction: empty<AlexaAction>(),
    batteries: empty<BatteriesTypeIobroker>(),
    heatingTimeSlot: empty<HeatingTimeSlot>(),
    idsToControl: empty<IdsToControl>(),
    logReset: empty<LogReset>(),
    showTimerCard: empty<TimerObject>(),
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
    /**
     * @deprecated
     * @param param0
     * @param param0.storeFolder
     * @param param0.val
     * @param param0.id
     * @param param0.key
     * @param param0.subKey
     * @param param0.state
     */
    setValuesLegacy({ storeFolder, val, id, key, subKey, state }: SetValuesLegacy): void {
      this[storeFolder] = getSubValue({
        obj: this.getState,
        key,
        subKey,
        val,
        storeFolder,
        id,
        state,
      });
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

/**
 * @deprecated
 * @param param0
 * @param param0.obj
 * @param param0.key
 * @param param0.subKey
 * @param param0.val
 * @param param0.storeFolder
 * @param param0.id
 * @param param0.state
 */
const getSubValue = ({
  obj,
  key,
  subKey,
  val,
  storeFolder,
  id,
  state,
}: {
  obj: any;
  key: string;
  subKey?: string;
  val: string | number | boolean | object | null;
  storeFolder: string;
  id: string;
  timestamp?: boolean;
  state: IobrokerState;
}) => {
  obj = obj[storeFolder];
  const newObj: StoreValue<typeof val> = {
    val,
    id,
    ack: state.ack,
    ts: state.ts,
    lc: state.lc,
    from: state.from,
    q: state.q,
  };

  if (!subKey) {
    obj[key] = newObj;
    return obj;
  }

  if (!obj[key]) {
    obj[key] = {};
  }

  if (!obj[key][subKey]) {
    obj[key][subKey] = {};
  }

  obj[key][subKey] = newObj;
  return obj;
};
