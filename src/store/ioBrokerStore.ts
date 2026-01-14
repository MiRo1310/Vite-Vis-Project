import { Pool } from "@/subscribeIds/pool.ts";
import { IdsToControl, IobrokerState, Log, LogReset, Pv, Shutter, TimerObject, WindowType } from "@/types/types.ts";
import { defineStore, Store, StoreDefinition } from "pinia";
import { Wetter } from "@/subscribeIds/wetter.ts";
import { Landroid } from "../subscribeIds/landroid.ts";
import { Calendar } from "@/subscribeIds/calendar.ts";
import { Heating, HeatingControlType } from "@/subscribeIds/heating.ts";
import { LogStates } from "@/subscribeIds/logs.ts";
import { computed, ComputedRef } from "vue";
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
import { Hmip } from "@/subscribeIds/hmip.ts";

export interface IoBrokerStoreState {
  adminConnectionEstablished: boolean;
  subscribedIds: string[];
  wetter: Wetter;
  hmip: Hmip;
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
  airConditioners: AirConditioners;
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
  val: string | number | boolean | object | null;
  id: string;
  key: string;
  subKey?: string;
  timestamp?: boolean;
  state: IobrokerState;
}

export type IoBrokerStates = keyof IoBrokerStoreState;

interface IoBrokerStoreActions {
  setAdminConnection(val: boolean): void;
  resetIdsToSubscribe(): void;
  addIdToSubscribedIds(id: string): void;
  removeIdFromSubscribedIds(id: string): void;
  setValues(params: SetValues): void;
}

interface IoBrokerStoreGetters {
  isAdminConnected(state: IoBrokerStoreState): boolean;
  getTrash(state: IoBrokerStoreState): TrashStates;
  getShoppinglist(state: IoBrokerStoreState): AlexaListStates;
  getState(state: IoBrokerStoreState): IoBrokerStoreState;
  getIdsToControl(state: IoBrokerStoreState): IdsToControl;
  getParsedLogs(state: IoBrokerStoreState): ComputedRef<ParsedLogs>;
}

type StoreType = StoreDefinition<"iobrokerStore", IoBrokerStoreState, IoBrokerStoreGetters, IoBrokerStoreActions>;
export type IoBrokerStore = Store<"iobrokerStore", IoBrokerStoreState, IoBrokerStoreGetters, IoBrokerStoreActions>;

export const useIobrokerStore: StoreType = defineStore("iobrokerStore", {
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
    hmip: {} as Hmip,
  }),
  getters: {
    isAdminConnected(state: IoBrokerStoreState) {
      return state.adminConnectionEstablished;
    },
    getTrash(state: IoBrokerStoreState) {
      return state.trash;
    },
    getShoppinglist(state: IoBrokerStoreState) {
      return state.alexaLists;
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
