import { defineStore } from "pinia";
interface IobrokerValues {
  [key: string]: string;
}
export const useIobrokerStore = defineStore("iobrokerStore", {
  state: () => ({
    iobrokerValues: {},
    trash: {},
  }),
  getters: {
    getIobrokerValues(state)  {
      return state.iobrokerValues;
    },
    getTrash(state){
      return state.trash;
    },
  },
  actions: {
    setTest(name: string, key: string, val: string) {
      if (key === "trash") {
        this[key] = val;
      } else {
        const value: IobrokerValues = this.iobrokerValues;
        value[name] = val;
        this.iobrokerValues = value;
      }
    },
  },
});
