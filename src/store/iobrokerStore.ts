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
    timer: {} as any,
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
      return state.timer;
    },
  },
  actions: {
    setValues(name: string, key: string, val: string | number | boolean | object, subKey?: string) {
      console.log(key, val, subKey, name);
      if (key) {
        if (subKey) {
          (this as any)[key] = getSubValue(this.getTimer, subKey, val);

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

const getSubValue = (obj: any, subKey: string, val: string | number | boolean | object) => {
  const subKeyArray = subKey.split(",").map((key) => key.trim());
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
