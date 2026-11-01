import { describe, expect, test, vi } from "vitest";
import { reactive } from "vue";
import { heatPumpValues, status, wpModus } from "../../src/composables/heat-pump.ts";
import { routes } from "../../src/router/routes.ts";

const { iobroker } = vi.hoisted(() => {
  const mode: { value: number | undefined } = { value: 1 };
  return {
    iobroker: {
      pool: {
        mode,
      heaterState: { value: true },
      silent: { value: false },
      consumption: { value: 1234.567 },
      tempIn: { value: 24.5 },
      tempOut: { value: 27.1 },
      tempSet: { value: 28 },
      },
    },
  };
});

vi.mock("@/store/ioBrokerStore.ts", () => ({
  useIobrokerStore: () => ({ iobroker: reactive(iobroker) }),
}));

// reactive() returns the cached proxy, so changes here trigger the computeds
const store = reactive(iobroker);

describe("status", () => {
  test("returns 'An' with green class for true", () => {
    expect(status(true)).toEqual({ value: "An", valueClass: "text-green-200" });
  });

  test("returns 'Aus' with red class for false", () => {
    expect(status(false)).toEqual({ value: "Aus", valueClass: "text-red-200" });
  });
});

describe("wpModus", () => {
  test.each([
    [0, "Kühlen"],
    [1, "Heizen"],
    [2, "Auto"],
    [3, "Inaktiv"],
    [undefined, "Inaktiv"],
  ])("mode %s → %s", (mode, expected) => {
    store.pool.mode.value = mode;
    expect(wpModus.value).toBe(expected);
  });
});

describe("heatPumpValues", () => {
  test("links to the heat pump route", () => {
    expect(heatPumpValues.value.route).toBe(routes.heatPump.path);
  });

  test("builds the listing from the store values", () => {
    store.pool.mode.value = 1;

    expect(heatPumpValues.value.listing).toEqual([
      { title: "Wärmepumpe", value: "An", valueClass: "text-green-200" },
      { title: "Wärmepumpe Silent", value: "Aus", valueClass: "text-red-200" },
      { title: "Wärmepumpe Modus", value: "Heizen" },
      { title: "Wärmepumpe Bezug", value: "1234.57", unit: "W" },
      { title: "Wärmepumpe In", value: 24.5, unit: "°C", valueClass: "text-blue-200" },
      { title: "Wärmepumpe Out", value: 27.1, unit: "°C", valueClass: "text-orange-200" },
      { title: "Wärmepumpe Soll", value: 28, unit: "°C" },
    ]);
  });
});
