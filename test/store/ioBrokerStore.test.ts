import { beforeEach, describe, expect, it } from "vitest";
import { setActivePinia, createPinia } from "pinia";
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

  it("setValues stores a simple value without subKey", () => {
    const store = useIobrokerStore();
    const payload = {
      storeFolder: "pv",
      key: "energy",
      val: 123,
      id: "pv.1",
      state: { ack: false, ts: 1, lc: 2, from: "test", q: 0, val: 123 },
    } as any;

    store.setValues(payload);
    expect(store.pv.energy).toBeDefined();
    expect(store.pv.energy.val).toBe(123);
    expect(store.pv.energy.id).toBe("pv.1");
    expect(store.pv.energy.ack).toBe(false);
  });

  it("setValues stores nested subKey values", () => {
    const store = useIobrokerStore();
    const payload = {
      storeFolder: "lights",
      key: "lamp",
      subKey: "color",
      val: "red",
      id: "lamp.1",
      state: { ack: true, ts: 10, lc: 11, from: "test", q: 0, val: "red" },
    } as any;

    store.setValues(payload);
    expect(store.lights.lamp).toBeDefined();
    expect(store.lights.lamp.color).toBeDefined();
    expect(store.lights.lamp.color.val).toBe("red");
    expect(store.lights.lamp.color.id).toBe("lamp.1");
  });
});

