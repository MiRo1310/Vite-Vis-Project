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
      name: string,
      key: string,
      val: string | number | boolean | object,
      subKey?: string,
      saveId?: boolean,
      id?: string
    ) {
      if (key) {
        if (subKey) {
          if (!(this as any)[key]) {
            console.log("Key not found, please put it to the store. ", key);
          }
          (this as any)[key] = getSubValue(this.getState, subKey, val, key);
          if (saveId && id) {
            (this as any)["idsToControl"] = saveIdToStore(this.getIdsToControl, id, subKey);
          }
          return;
        }
        (this as any)[key] = val;
      } else {
        const value: IobrokerValues = this.iobrokerValues;
        value[name] = val;
        this.iobrokerValues = value;
      }
    },
  },
});

const saveIdToStore = (obj: any, id: string, subKey: string) => {
  try {
    const subKeyArray = getSubKeyArray(subKey);

    if (subKeyArray.length === 1) {
      obj[subKeyArray[0] + "Id"] = id;
    }
    if (subKeyArray.length === 2) {
      if (!obj[subKeyArray[0]]) {
        obj[subKeyArray[0]] = {};
      }
      obj[subKeyArray[0]][subKeyArray[1] + "Id"] = id;
    }
    return obj;
  } catch (e) {
    console.log("Error in save ids to store " + e);
  }
};

const getSubValue = (obj: any, subKey: string, val: string | number | boolean | object, key: string) => {
  obj = obj[key];
  const subKeyArray = getSubKeyArray(subKey);
  if (subKeyArray.length === 1) {
    obj[subKeyArray[0]] = val;
    return obj;
  }
  if (subKeyArray.length === 2) {
    if (!obj[subKeyArray[0]]) {
      obj[subKeyArray[0]] = {};
    }
    if (!obj[subKeyArray[0]][subKeyArray[1]]) {
      obj[subKeyArray[0]][subKeyArray[1]] = {};
    }
    obj[subKeyArray[0]][subKeyArray[1]] = val;
    return obj;
  }
};
const getSubKeyArray = (subKey: string) => {
  return subKey.split(",").map((key) => key.trim());
};
