import { IdToSubscribe } from "@/types.ts";
import { StoreValue } from "@/store/iobrokerStore.ts";

export interface BatteriesType {
  "Shelly Plus Smoke Flur OG": { percent: StoreValue<number>, firmware: StoreValue<boolean> };
  "HMIP Flur": { lowBat: StoreValue<boolean> };
}

export const batteryIds: IdToSubscribe<BatteriesType> = {
  objectNameInStore: "batteries",
  value: [
    {
      id: "shelly.0.shellyplussmoke#a0a3b3e60d84#1.DevicePower0.BatteryPercent",
      firstKey: "Shelly Plus Smoke Flur OG",
      secondKey: "percent"
    },
    {
      id: "shelly.0.shellyplussmoke#a0a3b3e60d84#1.firmware",
      firstKey: "Shelly Plus Smoke Flur OG",
      secondKey: "firmware"
    },
    {
      id: "hmip.0.devices.3014F711A000201A499E347E.channels.0.lowBat",
      firstKey: "HMIP Flur",
      secondKey: "lowBat"
    }
  ]
};