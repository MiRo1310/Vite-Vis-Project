import { Pool } from "@/lib/iobroker/ids-to-subscribe/pool";
import { TimerObject, Shutter, Pv, Window, IdsToControl } from "@/types";
import { defineStore } from "pinia";
import { Wetter } from "@/lib/iobroker/ids-to-subscribe/wetter";
import { Landroid } from '../lib/iobroker/ids-to-subscribe/landroid';
import { Calendar } from "@/lib/iobroker/ids-to-subscribe/calendar";
import { Heating } from "@/lib/iobroker/ids-to-subscribe/heating";

export interface IobrokerStoreState {
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
  calendar: Calendar
  heating: Heating

}
export type IobrokerStates = keyof IobrokerStoreState;

export const useIobrokerStore = defineStore("iobrokerStore", {
  state: (): IobrokerStoreState => ({
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
    heating: {} as Heating
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
  },
  actions: {
    setValues(
      objectNameInStore: string,
      val: string | number | boolean | object,
      id: string,
      firstKeyInObject?: string | boolean,
      subKey?: string,
    ) {
      if (objectNameInStore) {
        if (firstKeyInObject && firstKeyInObject !== true) {
          if (!(this as any)[objectNameInStore]) {
            console.log("Key not found, please put it to the store. ", objectNameInStore);
          }

          (this as any)[objectNameInStore] = getSubValue(this.getState, firstKeyInObject, subKey, val, objectNameInStore, id);

          return;
        }
        (this as any)[objectNameInStore] = val;
      }
      return;
    },
  },
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
