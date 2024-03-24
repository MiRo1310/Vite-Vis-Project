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
    getTimer(state) {
      return state;
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
          (this as any)[key] = getSubValue(this.getTimer, subKey, val, key, saveId, id);

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

const getSubValue = (
  obj: any,
  subKey: string,
  val: string | number | boolean | object,
  key: string,
  saveId?: boolean,
  id?: string
) => {
  obj = obj[key];
  const subKeyArray = subKey.split(",").map((key) => key.trim());
  if (subKeyArray.length === 1) {
    obj[subKeyArray[0]] = val;
    if (saveId) {
      obj[subKeyArray[0] + "Id"] = id;
    }
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
    if (saveId) {
      obj[subKeyArray[0]][subKeyArray[1] + "Id"] = id;
    }
    return obj;
  }
};
