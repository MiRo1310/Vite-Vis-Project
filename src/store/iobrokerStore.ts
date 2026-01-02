import { Pool } from "@/subscribeIds/pool.ts";
import { IdsToControl, IobrokerState, Log, LogReset, Pv, Shutter, TimerObject, WindowType } from "@/types/types.ts";
import { defineStore } from "pinia";
import { Wetter } from "@/subscribeIds/wetter.ts";
import { Landroid } from "../subscribeIds/landroid.ts";
import { Calendar } from "@/subscribeIds/calendar.ts";
import { Heating, HeatingControlType } from "@/subscribeIds/heating.ts";
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
import { HolidayStates, AlexaListStates, TimeStates, TrashStates, WindowGlobalStates } from "@/subscribeIds/diverse.ts";
import { AirConditioners } from "@/subscribeIds/air-conditioners.ts";

export interface IoBrokerStoreState {
  adminConnectionEstablished: boolean;
  subscribedIds: string[];
  wetter: Wetter;
  idsToControl: IdsToControl;
  shutterAutoUp: Shutter;
  shutterAutoDownTime: Shutter;
  timer: TimerObject;
  rolladen: Shutter;
  fenster: WindowType;
  pv: Pv;
  trash: TrashStates;
  alexaLists: AlexaListStates;
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
  holiday: HolidayStates;
  windowGlobal: WindowGlobalStates;
  time: TimeStates;
  showTimerCard: TimerObject;
  heatingControl: HeatingControlType;
  airConditioners?: AirConditioners;
}

export type StoreValue<T> = StoreValueType<T> | undefined;
export type StoreValueWithTimestamp<T> = (StoreValueType<T> & Timestamp) | undefined;

export interface Timestamp {
  ts: number;
}

export interface StoreValueType<T> {
  val: T | undefined;
  id: string;
  ack: boolean;
  ts?: number;
  lc?: number;
  from?: string;
  q?: number;
}

export interface ParsedLogs {
  error: Log[];
  warn: Log[];
  info: Log[];
}

interface SetValues {
  storeFolder: keyof IoBrokerStoreState;
  val: string | number | boolean | object;
  id: string;
  key: string;
  subKey?: string;
  timestamp?: boolean;
  state: IobrokerState;
}

export type IoBrokerStates = keyof IoBrokerStoreState;

export const useIobrokerStore = defineStore("iobrokerStore", {
  state: (): IoBrokerStoreState => ({
    adminConnectionEstablished: false,

    alexaAction: {} as AlexaAction,
    airConditioners: {} as AirConditioners,
    batteries: {} as BatteriesType,
    calendar: {} as Calendar,
    fenster: {} as WindowType,
    heating: {} as Heating,
    heatingControl: {} as HeatingControlType,
    heatingTimeSlot: {} as HeatingTimeSlot,
    holiday: {} as HolidayStates,
    idsToControl: {} as IdsToControl,
    infos: {} as Infos,
    landroid: {} as Landroid,
    lights: {} as LightTypes,
    lightsAdditive: {} as LightTypesAdditive,
    logReset: {} as LogReset,
    logs: {} as LogStates,
    phone: {} as PhoneStates,
    pool: {} as Pool,
    presence: {} as PresenceType,
    pv: {} as Pv,
    rolladen: {} as Shutter,
    alexaLists: {} as AlexaListStates,
    showTimerCard: {} as TimerObject,
    subscribedIds: [],
    shutterAutoUp: {} as Shutter,
    shutterAutoDownTime: {} as Shutter,
    styles: {} as StylesType,
    time: {} as TimeStates,
    timer: {} as TimerObject,
    trash: {} as TrashStates,
    wetter: {} as Wetter,
    windowGlobal: {} as WindowGlobalStates,
  }),
  getters: {
    isAdminConnected(state) {
      return state.adminConnectionEstablished;
    },
    getTrash(state) {
      return state.trash;
    },
    getShoppinglist(state) {
      return state.alexaLists;
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

    setValues({ storeFolder, val, id, key, subKey, state }: SetValues): void {
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
  },
});

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
  val: string | number | boolean | object;
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
