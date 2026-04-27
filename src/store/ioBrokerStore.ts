import { PoolIobroker } from "../subscribeIds/pool.iobroker.ts";
import { IdsToControl, IobrokerState, Log, LogReset, Pv, Shutter, TimerObject, Timers, WindowType } from "@/types/types.ts";
import { defineStore, Store, StoreDefinition } from "pinia";
import { WetterIobroker } from "../subscribeIds/wetter.iobroker.ts";
import { LandroidIobroker } from "../subscribeIds/landroid.iobroker.ts";
import { CalendarIobroker } from "../subscribeIds/calendar.iobroker.ts";
import { HeatingIobroker, HeatingControlType } from "../subscribeIds/heating.iobroker.ts";
import { LogStates } from "../subscribeIds/logs.iobroker.ts";
import { computed, ComputedRef } from "vue";
import { HeatingTimeSlot } from "@/components/section/heating/HeatingControlPeriodDay.vue";
import { Infos } from "../subscribeIds/info.iobroker.ts";
import { PhoneStates } from "../subscribeIds/phone.iobroker.ts";
import { BatteriesTypeIobroker } from "../subscribeIds/batteriesType.iobroker.ts";
import { AlexaAction } from "@/pages/vis/alexa.vue";
import { LightTypes, LightTypesAdditive } from "../subscribeIds/light.iobroker.ts";
import { StylesType } from "../subscribeIds/styles.iobroker.ts";
import { PresenceType } from "../subscribeIds/presence.iobroker.ts";
import { HolidayStates, AlexaListStates, TimeStates, TrashStates, WindowGlobalStates } from "../subscribeIds/diverse.iobroker.ts";
import { AirConditionersIobroker } from "../subscribeIds/air-conditioners.iobroker.ts";
import { HmipIobroker } from "../subscribeIds/hmip.iobroker.ts";
import { getValString } from "@/lib/object.ts";
import { toJSON } from "@michaelroling/ts-library";

export interface IoBrokerStoreState {
  adminConnectionEstablished: boolean;
  subscribedIds: string[];
  wetter: WetterIobroker;
  hmip: HmipIobroker;
  idsToControl: IdsToControl;
  shutterAutoUp: Shutter;
  shutterAutoDownTime: Shutter;
  timers: Timers;
  rolladen: Shutter;
  fenster: WindowType;
  pv: Pv;
  trash: TrashStates;
  alexaLists: AlexaListStates;
  pool: PoolIobroker;
  landroid: LandroidIobroker;
  calendar: CalendarIobroker;
  heating: HeatingIobroker;
  logs: LogStates;
  logReset: LogReset;
  heatingTimeSlot: HeatingTimeSlot;
  infos: Infos;
  phone: PhoneStates;
  batteries: BatteriesTypeIobroker;
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
  airConditioners: AirConditionersIobroker;
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
    airConditioners: {} as AirConditionersIobroker,
    batteries: {} as BatteriesTypeIobroker,
    calendar: {} as CalendarIobroker,
    fenster: {} as WindowType,
    heating: {} as HeatingIobroker,
    heatingControl: {} as HeatingControlType,
    heatingTimeSlot: {} as HeatingTimeSlot,
    holiday: {} as HolidayStates,
    idsToControl: {} as IdsToControl,
    infos: {} as Infos,
    landroid: {} as LandroidIobroker,
    lights: {} as LightTypes,
    lightsAdditive: {} as LightTypesAdditive,
    logReset: {} as LogReset,
    logs: {} as LogStates,
    phone: {} as PhoneStates,
    pool: {} as PoolIobroker,
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
    timers: {} as Timers,
    trash: {} as TrashStates,
    wetter: {} as WetterIobroker,
    windowGlobal: {} as WindowGlobalStates,
    hmip: {} as HmipIobroker,
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
          error: toJSON<Log[]>(getValString(state.logs.error)).json ?? [],
          warn: toJSON<Log[]>(getValString(state.logs.warning)).json ?? [],
          info: toJSON<Log[]>(getValString(state.logs.info)).json ?? [],
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
