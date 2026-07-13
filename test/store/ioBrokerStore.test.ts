import { beforeEach, describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useIobrokerStore } from "../../src/store/ioBrokerStore";

describe("iobroker store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("has sane defaults", () => {
    const store = useIobrokerStore();
    expect(store.idsToControl).toEqual({});
  });

  it("getIdsToControl returns the current idsToControl state", () => {
    const store = useIobrokerStore();
    expect(store.getIdsToControl).toBe(store.idsToControl);
  });
});
