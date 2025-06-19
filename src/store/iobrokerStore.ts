import { Pool } from "@/subscribeIds/pool.ts";
import {
  IdsToControl,
  Pv,
  Shutter,
  TimerObject,
  WindowType,
} from "@/types/types.ts";
import { defineStore } from "pinia";
import { Wetter } from "@/subscribeIds/wetter.ts";
import { Landroid } from "../subscribeIds/landroid.ts";
import { Calendar } from "@/subscribeIds/calendar.ts";
import { Heating } from "@/subscribeIds/heating.ts";
import { Log, LogReset } from "@/pages/logs.vue";
import { LogStates } from "@/subscribeIds/logs.ts";
import { computed } from "vue";
import { HeatingTimeSlot } from "@/components/section/heating/HeatingControlPeriodDay.vue";
import { Infos } from "@/subscribeIds/info.ts";
import { stringToJSON } from "@/lib/string.ts";
import { PhoneStates } from "@/subscribeIds/phone.ts";
import { BatteriesType } from "@/subscribeIds/batteriesType.ts";
import { AlexaAction } from "@/pages/alexa.vue";
import { LightTypes, LightTypesAdditive } from "@/subscribeIds/light.ts";
import { StylesType } from "@/subscribeIds/styles.ts";
import { PresenceType } from "@/subscribeIds/presence.ts";

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
  fenster: WindowType;
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
  alexaAction: AlexaAction;
  lights: LightTypes;
  lightsAdditive: LightTypesAdditive;
  styles: StylesType;
  presence: PresenceType;
}

export type StoreValue<T> = StoreValueType<T> | undefined;
export type StoreValueWithTimestamp<T> =
  | (StoreValueType<T> & Timestamp)
  | undefined;

export interface Timestamp {
  ts: number;
}

export interface StoreValueType<T> {
  val: T | undefined;
  id: string | undefined;
}

export interface ParsedLogs {
  error: Log[];
  warn: Log[];
  info: Log[];
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
    fenster: {} as WindowType,
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
    batteries: {} as BatteriesType,
    alexaAction: {} as AlexaAction,
    lights: {} as LightTypes,
    lightsAdditive: {} as LightTypesAdditive,
    styles: {} as StylesType,
    presence: {} as PresenceType,
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
      return computed((): ParsedLogs => {
        return {
          error: stringToJSON<Log[]>(state.logs.error?.val as string),
          warn: stringToJSON<Log[]>(state.logs.warning?.val as string),
          info: stringToJSON<Log[]>(state.logs.info?.val as string),
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

    setValues({
      objectNameInStore,
      val,
      id,
      firstKey,
      secondKey,
      timestamp,
    }: {
      objectNameInStore: string;
      val: string | number | boolean | object;
      id: string;
      firstKey?: string | boolean;
      secondKey?: string;
      timestamp?: boolean;
    }) {
      if (objectNameInStore) {
        if (firstKey && firstKey !== true) {
          if (!(this as any)[objectNameInStore]) {
            console.log(
              "Key not found, please put it to the store. ",
              objectNameInStore,
            );
          }

          (this as any)[objectNameInStore] = getSubValue({
            obj: this.getState,
            fistKey: firstKey,
            secondKey: secondKey,
            val: val,
            objectNameInStore: objectNameInStore,
            id: id,
            timestamp: timestamp,
          });

          return;
        }
        (this as any)[objectNameInStore] = val;
      }
      return;
    },
  },
});

const getSubValue = ({
  obj,
  fistKey,
  secondKey,
  val,
  objectNameInStore,
  id,
  timestamp,
}: {
  obj: any;
  fistKey: string;
  secondKey?: string;
  val: string | number | boolean | object;
  objectNameInStore: string;
  id?: string;
  timestamp?: boolean;
}) => {
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
  if (timestamp) {
    obj[fistKey][secondKey] = val;
    return obj;
  }
  obj[fistKey][secondKey] = { val, id };
  return obj;
};
