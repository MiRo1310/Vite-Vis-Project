import { Pool } from "@/lib/iobroker/ids-to-subscribe/pool";
import { IdsToControl, Pv, Shutter, TimerObject, Window } from "@/types";
import { defineStore } from "pinia";
import { Wetter } from "@/lib/iobroker/ids-to-subscribe/wetter";
import { Landroid } from "../lib/iobroker/ids-to-subscribe/landroid";
import { Calendar } from "@/lib/iobroker/ids-to-subscribe/calendar";
import { Heating } from "@/lib/iobroker/ids-to-subscribe/heating";
import { Log, LogReset } from "@/pages/logs.vue";
import { LogStates } from "@/lib/iobroker/ids-to-subscribe/logs.ts";
import { computed } from "vue";

export interface IoBrokerStoreState {
  wetter: Wetter;
  trash: object;
  shoppingList: string;
  urlaubAktiv: boolean;
  fensterOffen: boolean;
  fensterStatus1: string;
  fensterStatus2: string;
  showTimerCard: boolean;
  sonnenuntergang: string;
  idsToControl: IdsToControl;
  shutterAutoUp: object;
  shutterAutoDownTime: object;
  timer: TimerObject;
  rolladen: Shutter;
  fenster: Window;
  pv: Pv;
  pool: Pool;
  landroid: Landroid;
  calendar: Calendar;
  heating: Heating;
  logs: LogStates;
  logReset: LogReset;
}

export interface StoreValue<T> {
  val: T;
  id: string;
}

export type IoBrokerStates = keyof IoBrokerStoreState;

export const useIobrokerStore = defineStore("iobrokerStore", {
  state: (): IoBrokerStoreState => ({
    wetter: {} as Wetter,
    trash: {},
    shoppingList: "",
    urlaubAktiv: false,
    fensterOffen: false,
    fensterStatus1: "",
    fensterStatus2: "",
    showTimerCard: false,
    sonnenuntergang: "",
    idsToControl: {} as IdsToControl,
    shutterAutoUp: {},
    shutterAutoDownTime: {},
    timer: {} as TimerObject,
    rolladen: {} as Shutter,
    fenster: {} as Window,
    pv: {} as Pv,
    pool: {} as Pool,
    landroid: {} as Landroid,
    calendar: {} as Calendar,
    heating: {} as Heating,
    logs: {} as LogStates,
    logReset: {} as LogReset
  }),
  getters: {
    getTrash(state) {
      return state.trash;
    },
    getShoppinglist(state) {
      return state.shoppingList;
    },
    getState(state) {
      return state;
    },
    getIdsToControl(state) {
      return state.idsToControl;
    },
    getParsedLogs(state) {
      return computed(() => {
        try {
          return {
            error: JSON.parse(state.logs.error?.val) as Log[],
            warn: JSON.parse(state.logs.warning?.val) as Log[],
            info: JSON.parse(state.logs.info?.val) as Log[]
          };
        } catch (e) {
          return {
            error: [],
            warn: [],
            info: []
          };
        }
      });
    }
  },
  actions: {
    setValueToKey(key: string, val: string | number | boolean | object) {
      (this as any)[key] = val;
    },
    setValues(
      objectNameInStore: string,
      val: string | number | boolean | object,
      id: string,
      firstKey?: string | boolean,
      secondKey?: string
    ) {
      if (objectNameInStore) {
        if (firstKey && firstKey !== true) {
          if (!(this as any)[objectNameInStore]) {
            console.log("Key not found, please put it to the store. ", objectNameInStore);
          }

          (this as any)[objectNameInStore] = getSubValue(this.getState, firstKey, secondKey, val, objectNameInStore, id);

          return;
        }
        (this as any)[objectNameInStore] = val;
      }
      return;
    }
  }
});

const getSubValue = (
  obj: any,
  fistKey: string,
  secondKey: string | undefined,
  val: string | number | boolean | object,
  objectNameInStore: string,
  id: string | undefined
) => {
  obj = obj[objectNameInStore];

  if (!secondKey) {
    obj[fistKey] = { val, id };
    return obj;
  }

  if (!obj[fistKey]) {
    obj[fistKey] = {};
  }

  if (!obj[fistKey][secondKey]) {
    obj[fistKey][secondKey] = {};
  }
  obj[fistKey][secondKey] = { val, id };
  return obj;
};
