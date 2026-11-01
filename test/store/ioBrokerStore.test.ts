import { beforeEach, describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useIobrokerStore } from "../../src/store/ioBrokerStore";

describe("useIobrokerStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("starts with empty idsToControl", () => {
    const store = useIobrokerStore();
    expect(store.idsToControl).toEqual({});
  });

  describe("getIdsToControl", () => {
    it("returns the current idsToControl", () => {
      const store = useIobrokerStore();
      expect(store.getIdsToControl).toBe(store.idsToControl);
    });
  });
});
