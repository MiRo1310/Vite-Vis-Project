import { StoreValue } from "@/store/ioBrokerStore.ts";
import { IdToSubscribe } from "@/types/types.ts";

export type BoolText = "true" | "false" | true | false;

export interface Landroid {
  battery: StoreValue<number>;
  totalDistance: StoreValue<number>;
  totalBladeTime: StoreValue<number>;
  status: StoreValue<number>;
  online: StoreValue<boolean>;
  firmware: StoreValue<string>;
  error: StoreValue<number>;
  edgecut: StoreValue<boolean>;
  batteryCharging: StoreValue<boolean>;
}

export const landroid: IdToSubscribe<Landroid> = {
  storeFolder: "landroid",
  value: [
    {
      id: "worx.0.202330294701005409AD.mower.batteryState",
      key: "battery",
    },
    {
      id: "worx.0.202330294701005409AD.mower.totalDistance",
      key: "totalDistance",
    },
    {
      id: "worx.0.202330294701005409AD.mower.totalBladeTime",
      key: "totalBladeTime",
    },
    { id: "worx.0.202330294701005409AD.mower.status", key: "status" },
    { id: "worx.0.202330294701005409AD.mower.online", key: "online" },
    { id: "worx.0.202330294701005409AD.mower.firmware", key: "firmware" },
    { id: "worx.0.202330294701005409AD.mower.error", key: "error" },
    { id: "worx.0.202330294701005409AD.mower.edgecut", key: "edgecut" },
    {
      id: "worx.0.202330294701005409AD.mower.batteryCharging",
      key: "batteryCharging",
    },
  ],
};
