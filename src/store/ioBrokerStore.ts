import { PoolIobroker } from "../iobroker-states/states-subscribed/pool.iobroker.ts";
import { IdsToControl, IobrokerState, Log, LogReset, TimerObject, Timers } from "@/types/types.ts";
import { defineStore } from "pinia";
import { WetterIobroker } from "../iobroker-states/states-subscribed/wetter.iobroker.ts";
import { LandroidIobroker } from "../iobroker-states/states-subscribed/landroid.iobroker.ts";
import { CalendarIobroker } from "../iobroker-states/states-subscribed/calendar.iobroker.ts";
import { HeatingControlType, HeatingIobroker } from "../iobroker-states/states-subscribed/heating.iobroker.ts";
import { LogStates } from "../iobroker-states/states-subscribed/logs.iobroker.ts";
import { computed } from "vue";
import { HeatingTimeSlot } from "@/components/section/heating/HeatingControlPeriodDay.vue";
import { Infos } from "../iobroker-states/states-subscribed/info.iobroker.ts";
import { PhoneStates } from "../iobroker-states/states-subscribed/phone.iobroker.ts";
import { BatteriesTypeIobroker } from "../iobroker-states/states-subscribed/batteriesType.iobroker.ts";
import { AlexaAction } from "@/pages/vis/alexa.vue";
import { LightTypes, LightTypesAdditive } from "../iobroker-states/states-subscribed/light.iobroker.ts";
import { StylesType } from "../iobroker-states/states-subscribed/styles.iobroker.ts";
import {
  AlexaListStates,
  HolidayStates,
  TimeStates,
  TrashStates,
  WindowGlobalStates,
} from "../iobroker-states/states-subscribed/diverse.iobroker.ts";
import { AirConditionersIobroker } from "../iobroker-states/states-subscribed/air-conditioners.iobroker.ts";
import { HmipIobroker } from "../iobroker-states/states-subscribed/hmip.iobroker.ts";
import { getValString } from "@/lib/object.ts";
import { toJSON } from "@michaelroling/ts-library";
import { IoBrokerStoreState, ParsedLogs, SetValues, StoreType, StoreValue } from "@/store/index.ts";
import { EnergyStates } from "../iobroker-states/states-subscribed/energy.iobroker.ts";
import { TankerKoenig } from "../iobroker-states/states-subscribed/tankerkoenig.iobroker.ts";
import { IPvStates } from "../iobroker-states/states-subscribed/pv-ids.iobroker.ts";
import { WindowType } from "@/iobroker-states/states-subscribed/window.iobroker.ts";
import { IShutter } from "@/iobroker-states/states-subscribed/shutter-auto-up-time.iobroker.ts";

const empty = <T>() => ({}) as T;

export const useIobrokerStore: StoreType = defineStore("iobrokerStore", {
  state: (): IoBrokerStoreState => ({
    adminConnectionEstablished: false,
    alexaAction: empty<AlexaAction>(),
    airConditioners: empty<AirConditionersIobroker>(),
    batteries: empty<BatteriesTypeIobroker>(),
    calendar: empty<CalendarIobroker>(),
    fenster: empty<WindowType>(),
    heating: empty<HeatingIobroker>(),
    heatingControl: empty<HeatingControlType>(),
    heatingTimeSlot: empty<HeatingTimeSlot>(),
    holiday: empty<HolidayStates>(),
    idsToControl: empty<IdsToControl>(),
    infos: empty<Infos>(),
    landroid: empty<LandroidIobroker>(),
    lights: empty<LightTypes>(),
    lightsAdditive: empty<LightTypesAdditive>(),
    logReset: empty<LogReset>(),
    logs: empty<LogStates>(),
    phone: empty<PhoneStates>(),
    pool: empty<PoolIobroker>(),
    pv: empty<IPvStates>(),
    rolladen: empty<IShutter>(),
    alexaLists: empty<AlexaListStates>(),
    showTimerCard: empty<TimerObject>(),
    subscribedIds: [],
    shutterAutoUp: empty<IShutter>(),
    shutterAutoDownTime: empty<IShutter>(),
    styles: empty<StylesType>(),
    time: empty<TimeStates>(),
    timers: empty<Timers>(),
    trash: empty<TrashStates>(),
    wetter: empty<WetterIobroker>(),
    windowGlobal: empty<WindowGlobalStates>(),
    hmip: empty<HmipIobroker>(),
    tankerKoenig: empty<TankerKoenig>(),
    energy: empty<EnergyStates>(),
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
