import { defineStore } from "pinia";

interface AppStore {
  showTimer: boolean;
}

export const useAppStore = defineStore("appStore", {
  state: (): AppStore => ({
    showTimer: false
  }),
  getters: {},
  actions: {
    toggleTimerVisibility() {
      this.showTimer = !this.showTimer;
    }
  }
});

