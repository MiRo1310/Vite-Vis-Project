import { beforeEach, describe, expect, it } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useAppStore } from "../../src/store/app-store";

describe("appStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("has default showTimer = false", () => {
    const store = useAppStore();
    expect(store.showTimer).toBe(false);
  });

  it("toggleTimerVisibility flips the value", () => {
    const store = useAppStore();
    expect(store.showTimer).toBe(false);
    store.toggleTimerVisibility();
    expect(store.showTimer).toBe(true);
    store.toggleTimerVisibility();
    expect(store.showTimer).toBe(false);
  });
});
