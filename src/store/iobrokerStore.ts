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
import { HeatingTimeSlot } from "@/components/section/heating/HeatingControlPeriodDay.vue";
import { Infos } from "@/lib/iobroker/ids-to-subscribe/info.ts";
import { stringToJSON } from "@/lib/string.ts";
import { PhoneStates } from "@/lib/iobroker/ids-to-subscribe/phone.ts";
import { BatteriesType } from "@/lib/iobroker/ids-to-subscribe/batteriesType.ts";

export interface IoBrokerStoreState {
  adminConnectionEstablished: boolean;
  subscribedIds: string[];
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
  heatingTimeSlot: HeatingTimeSlot;
  infos: Infos;
  phone: PhoneStates;
  batteries: BatteriesType;
}

export type StoreValue<T> = StoreValueType<T> | undefined

export interface StoreValueType<T> {
  val: T | undefined;
  id: string | undefined;
}

export type IoBrokerStates = keyof IoBrokerStoreState;

export const useIobrokerStore = defineStore("iobrokerStore", {
  state: (): IoBrokerStoreState => ({
    adminConnectionEstablished: false,
    subscribedIds: [],
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
    logReset: {} as LogReset,
    heatingTimeSlot: {} as HeatingTimeSlot,
    infos: {} as Infos,
    phone: {} as PhoneStates,
    batteries: {} as BatteriesType

  }),
  getters: {
    isAdminConnected(state) {
      return state.adminConnectionEstablished;
    },
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
        return {
          error: stringToJSON<Log[]>(state.logs.error?.val as string),
          warn: stringToJSON<Log[]>(state.logs.warning?.val as string),
          info: stringToJSON<Log[]>(state.logs.info?.val as string)
        };
      });
    }
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
