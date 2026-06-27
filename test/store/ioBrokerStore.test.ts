import { beforeEach, describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useIobrokerStore } from "../../src/store/ioBrokerStore";

describe("iobroker store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("has sane defaults", () => {
    const store = useIobrokerStore();
    expect(store.adminConnectionEstablished).toBe(false);
    expect(Array.isArray(store.subscribedIds)).toBe(true);
    expect(store.subscribedIds).toHaveLength(0);
  });

  it("can add and remove subscribed ids", () => {
    const store = useIobrokerStore();
    store.addIdToSubscribedIds("test.id");
    expect(store.subscribedIds).toContain("test.id");
    store.removeIdFromSubscribedIds("test.id");
    expect(store.subscribedIds).not.toContain("test.id");
  });

  it("setAdminConnection and getter works", () => {
    const store = useIobrokerStore();
    expect(store.isAdminConnected).toBe(false);
    store.setAdminConnection(true);
    expect(store.isAdminConnected).toBe(true);
  });
});
