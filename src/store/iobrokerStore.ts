import { defineStore } from 'pinia'


export const useIobrokerStore = defineStore("iobrokerStore", {
  state: () => ({
    iobrokerValues: {},
    trash: {},
    shoppingList: {},
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
  },
  actions: {
    setValues(name: string, key: string, val: string | number | boolean | object) {
      if (key === "trash" || key === "shoppingList") {
        this[key] = val;
      } else {
        const value: IobrokerValues = this.iobrokerValues;
        value[name] = val;
        this.iobrokerValues = value;
      }
    },
  },
});
