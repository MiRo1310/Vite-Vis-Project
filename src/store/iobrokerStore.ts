import { defineStore } from "pinia";

export const useIobrokerStore = defineStore("iobrokerStore", {
  state: () => ({
    iobrokerValues: {},
    trash: {},
    shoppingList: {},
    urlaubAktiv: false,
    fensterOffen: false,
    fensterStatus1: "",
    fensterStatus2: "",
    showTimerCard: false,
    sonnenuntergang: "",
    idsToControl: {},
    shutterAutoUp: {},
    shutterAutoDownTime: {},
    timer: {} as TimerObject,
    rolladen: {} as Rolladen,
    fenster: {} as Fenster,
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
      firstKeyInObject?: string,
      subKey?: string,
      saveId?: boolean,
      id?: string
    ) {
      if (objectNameInStore) {
        if (firstKeyInObject) {
          if (!(this as any)[objectNameInStore]) {
            console.log("Key not found, please put it to the store. ", objectNameInStore);
          }
          (this as any)[objectNameInStore] = getSubValue(this.getState, firstKeyInObject, subKey, val, objectNameInStore);
          if (saveId && id) {
            (this as any)["idsToControl"] = saveIdToStore(this.getIdsToControl, id, firstKeyInObject, subKey);
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
    }
    if (!obj[key]) {
      obj[key] = {};
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
