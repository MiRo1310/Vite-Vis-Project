import { defineStore } from "pinia";
export const useIobrokerStore = defineStore("iobrokerStore", {
  state: () => ({
    test: "false",
  }),
  getters: {
    getTest: (state) => {
      return  state.test
    },
  },
  actions: {
    setTest(val: string) {
      this.test = val;
    },
  },
});
