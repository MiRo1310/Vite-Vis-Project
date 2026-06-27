import { describe, expect, test, vi } from "vitest";
import { batteryList } from "../../src/composables/battery.ts";

vi.mock("@/store/ioBrokerStore.ts", () => {
  const testBatteries = {
    xioami_kitchen_window: {
      percent: { value: 85, ts: 123 },
      available: { value: true },
      voltage: { value: 3.7 },
    },
    "HMIP Flur": {
      lowBat: { value: true, ts: 200 },
      available: { value: false },
    },
    "HMIP WC": {
      lowBat: { value: true },
      available: { value: false },
    },
    "Shelly Plus Smoke Flur OG": {
      percent: { value: 90, ts: 300 },
      firmware: { value: true },
      voltage: { value: 3.5 },
    },
    xioami_kitchen_door: {
      percent: {},
      available: { value: true },
      voltage: { value: 3.7 },
    },
    test: {},
  };

  return {
    useIobrokerStore: () => ({ iobroker: { batteries: testBatteries } }),
  };
});

describe("battery composable", () => {
  test("produces a table-friendly list from store batteries", () => {
    const list = batteryList.value;

    expect(Array.isArray(list)).toBe(true);
    expect(list).toHaveLength(6);

    expect(list?.[0]).toMatchObject({
      name: "xioami_kitchen_window",
      available: true,
      percent: 85,
      voltage: 3.7,
      firmware: false,
      timestamp: 123,
      lowBat: false,
    });

    expect(list?.[1]).toMatchObject({
      name: "HMIP Flur",
      available: false,
      percent: 0,
      voltage: 0,
      firmware: false,
      timestamp: 200,
      lowBat: true,
    });

    expect(list?.[2]).toMatchObject({
      name: "HMIP WC",
      available: false,
      percent: 0,
      voltage: 0,
      firmware: false,
      timestamp: 0,
      lowBat: true,
    });

    expect(list?.[3]).toMatchObject({
      name: "Shelly Plus Smoke Flur OG",
      available: false,
      percent: 90,
      voltage: 3.5,
      firmware: true,
      timestamp: 300,
      lowBat: false,
    });

    expect(list?.[4]).toMatchObject({
      name: "xioami_kitchen_door",
      available: true,
      percent: 0,
      voltage: 3.7,
      firmware: false,
      timestamp: 0,
      lowBat: false,
    });

    expect(list?.[5]).toMatchObject({
      name: "test",
      available: false,
      percent: 0,
      voltage: 0,
      firmware: false,
      timestamp: 0,
      lowBat: false,
    });
  });
});
