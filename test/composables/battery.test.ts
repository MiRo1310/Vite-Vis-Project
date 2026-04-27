import { describe, expect, test, vi } from "vitest";

// Mock das Store-Modul; wir definieren die Testdaten INSIDE der Mock-Factory
// damit Vitest's hoisting keine Referenz auf noch nicht initialisierte
// Variablen erzeugt.
vi.mock("@/store/ioBrokerStore.ts", () => {
  const testBatteries = {
    xioami_kitchen_window: {
      percent: { val: 85, ts: 123 },
      available: { val: true },
      voltage: { val: 3.7 },
    },
    "HMIP Flur": {
      lowBat: { val: true, ts: 200 },
      available: { val: false },
    },
    "HMIP WC": {
      lowBat: { val: true },
      available: { val: false },
    },
    "Shelly Plus Smoke Flur OG": {
      percent: { val: 90, ts: 300 },
      firmware: { val: true },
      voltage: { val: 3.5 },
    },
    xioami_kitchen_door: {
      percent: {},
      available: { val: true },
      voltage: { val: 3.7 },
    },
    test: {},
  };

  return {
    useIobrokerStore: () => ({ batteries: testBatteries }),
  };
});

// Import nach dem Mock (relativer Pfad, damit TS den Pfad während Tests auflösen kann)
import { batteryList } from "../../src/composables/battery.ts";

describe("battery composable", () => {
  test("produces a table-friendly list from store batteries", () => {
    const list = batteryList.value;

    expect(Array.isArray(list)).toBe(true);
    // Erwartete Einträge in der gleichen Reihenfolge wie die Keys in testBatteries
    expect(list).toHaveLength(6);

    expect(list[0]).toMatchObject({
      name: "xioami_kitchen_window",
      available: true,
      percent: 85,
      voltage: 3.7,
      firmware: false,
      timestamp: 123,
      lowBat: false,
    });

    expect(list[1]).toMatchObject({
      name: "HMIP Flur",
      available: false,
      percent: 0,
      voltage: 0,
      firmware: false,
      timestamp: 200,
      lowBat: true,
    });

    expect(list[2]).toMatchObject({
      name: "HMIP WC",
      available: false,
      percent: 0,
      voltage: 0,
      firmware: false,
      timestamp: 0,
      lowBat: true,
    });

    expect(list[3]).toMatchObject({
      name: "Shelly Plus Smoke Flur OG",
      available: false,
      percent: 90,
      voltage: 3.5,
      firmware: true,
      timestamp: 300,
      lowBat: false,
    });

    expect(list[4]).toMatchObject({
      name: "xioami_kitchen_door",
      available: true,
      percent: 0,
      voltage: 3.7,
      firmware: false,
      timestamp: 0,
      lowBat: false,
    });

    expect(list[5]).toMatchObject({
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
