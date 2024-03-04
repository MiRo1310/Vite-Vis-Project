import { defineStore } from "pinia";
interface IobrokerValues {
  [key: string]: string;
}
export const useIobrokerStore = defineStore("iobrokerStore", {
  state: () => ({
    iobrokerValues: {},
  }),
  getters: {
    getIobrokerValues: (state) => {
      return state.iobrokerValues;
    },
  },
  actions: {
    setTest(key: string, val: string) {
      const value: IobrokerValues = this.iobrokerValues;
      value[key] = val;
      this.iobrokerValues = value;
    },
  },
});
