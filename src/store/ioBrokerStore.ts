import { PoolIobroker } from "../iobroker-states/states-subscribed/pool.iobroker.ts";
import { IdsToControl, IobrokerState, Log, LogReset, TimerObject, Timers } from "@/types/types.ts";
import { defineStore } from "pinia";
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
import { AlexaListStates, HolidayStates, TimeStates, WindowGlobalStates } from "../iobroker-states/states-subscribed/diverse.iobroker.ts";
import { AirConditionersIobroker } from "../iobroker-states/states-subscribed/air-conditioners.iobroker.ts";
import { HmipIobroker } from "../iobroker-states/states-subscribed/hmip.iobroker.ts";
import { getStoreValString } from "@/lib/object.ts";
import { toJSON } from "@michaelroling/ts-library";
import { IoBrokerStoreState, ParsedLogs, SetValues, SetValuesLegacy, StoreType, StoreValue } from "@/store/index.ts";
import { EnergyStates } from "../iobroker-states/states-subscribed/energy.iobroker.ts";
import { TankerKoenig } from "../iobroker-states/states-subscribed/tankerkoenig.iobroker.ts";
import { IPvStates } from "../iobroker-states/states-subscribed/pv-ids.iobroker.ts";
import { WindowType } from "@/iobroker-states/states-subscribed/window.iobroker.ts";
import { IShutter } from "@/iobroker-states/states-subscribed/shutter-auto-up-time.iobroker.ts";
import { PositionIobroker } from "@/iobroker-states/states-subscribed/position.iobroker.ts";
import { IobrokerChannels } from "@/iobroker-states/states-subscribed/iobroker.iobroker.ts";

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
    windowGlobal: empty<WindowGlobalStates>(),
    hmip: empty<HmipIobroker>(),
    tankerKoenig: empty<TankerKoenig>(),
    energy: empty<EnergyStates>(),
    position: empty<PositionIobroker>(),
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
          error: toJSON<Log[]>(getStoreValString(state.logs.error)).json ?? [],
          warn: toJSON<Log[]>(getStoreValString(state.logs.warning)).json ?? [],
          info: toJSON<Log[]>(getStoreValString(state.logs.info)).json ?? [],
          heatPump: toJSON<Log[]>(getStoreValString(state.logs.heatPump)).json ?? [],
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

      const stateObj = { ...state, val, id };

      path.reduce<any>((obj, p, idx) => {
        return (obj[p] ??= isLast(path, idx) ? stateObj : {});
      }, iobroker);

      this["iobroker"] = iobroker;
    },
  },
});

function isLast(array: unknown[], index: number): boolean {
  return array.length - 1 === index;
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
