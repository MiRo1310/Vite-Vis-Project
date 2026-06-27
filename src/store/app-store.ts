import { defineStore } from "pinia";
import { type AppStore } from "@/store/index.ts";

export const useAppStore = defineStore("appStore", {
  state: (): AppStore => ({
    showTimer: false,
  }),
  getters: {},
  actions: {
    toggleTimerVisibility() {
      this.showTimer = !this.showTimer;
    },
  },
});
