import { Pool } from "@/lib/iobroker/ids-to-subscribe/pool";
import { TimerObject, Shutter, Pv, Window, IdsToControl } from "@/types";
import { defineStore } from "pinia";

export interface IobrokerStoreState {
  iobrokerValues: object;
  trash: object;
  shoppingList: object;
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
}
export type IobrokerStates = keyof IobrokerStoreState;

export const useIobrokerStore = defineStore("iobrokerStore", {
  state: (): IobrokerStoreState => ({
    iobrokerValues: {},
    trash: {},
    shoppingList: {},
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
    pool: {} as Pool
  }),
  getters: {
    getIobrokerValues(state) {
      return state.iobrokerValues;
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
  },
  actions: {
    setValues(
      objectNameInStore: string,
      val: string | number | boolean | object,
      firstKeyInObject?: string | boolean,
      subKey?: string,
      saveId?: boolean,
      id?: string
    ) {
      if (objectNameInStore) {
        if (firstKeyInObject && firstKeyInObject !== true) {
          if (!(this as any)[objectNameInStore]) {
            console.log("Key not found, please put it to the store. ", objectNameInStore);
          }

          (this as any)[objectNameInStore] = getSubValue(this.getState, firstKeyInObject, subKey, val, objectNameInStore);

          if (saveId && id) {
            (this as any).idsToControl = saveIdToStore(this.getIdsToControl, id, firstKeyInObject, subKey);
          }
          return;
        }
        (this as any)[objectNameInStore] = val;
      }
      return;
    },
  },
});

const saveIdToStore = (obj: any, id: string, key: string, subKey: string | undefined) => {
  try {
    if (!subKey) {
      obj[key + "Id"] = id;
      return obj
    }
    if (!obj[key]) {
      obj[key] = {};
      return obj;
    }
    obj[key][subKey + "Id"] = id;

    return obj;
  } catch (e) {
    console.log("Error in save ids to store " + e);
  }
};

const getSubValue = (
  obj: any,
  key: string,
  subKey: string | undefined,
  val: string | number | boolean | object,
  objectNameInStore: string
) => {
  obj = obj[objectNameInStore];

  if (!subKey) {
    obj[key] = val;
    return obj;
  }

  if (!obj[key]) {
    obj[key] = {};
  }
  if (!obj[key][subKey]) {
    obj[key][subKey] = {};
  }
  obj[key][subKey] = val;
  return obj;
};
