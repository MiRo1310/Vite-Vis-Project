import { beforeEach, describe, expect, it } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useAppStore } from "../../src/store/app-store";

describe("useAppStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("hides the timer by default", () => {
    const store = useAppStore();
    expect(store.showTimer).toBe(false);
  });

  describe("toggleTimerVisibility", () => {
    it("flips showTimer", () => {
      const store = useAppStore();
      expect(store.showTimer).toBe(false);
      store.toggleTimerVisibility();
      expect(store.showTimer).toBe(true);
      store.toggleTimerVisibility();
      expect(store.showTimer).toBe(false);
    });
  });
});
