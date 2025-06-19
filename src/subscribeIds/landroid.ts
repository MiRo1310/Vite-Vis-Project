import { StoreValue } from "@/store/iobrokerStore.ts";
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
  objectNameInStore: "landroid",
  value: [
    {
      id: "worx.0.202330294701005409AD.mower.batteryState",
      firstKey: "battery",
    },
    {
      id: "worx.0.202330294701005409AD.mower.totalDistance",
      firstKey: "totalDistance",
    },
    {
      id: "worx.0.202330294701005409AD.mower.totalBladeTime",
      firstKey: "totalBladeTime",
    },
    { id: "worx.0.202330294701005409AD.mower.status", firstKey: "status" },
    { id: "worx.0.202330294701005409AD.mower.online", firstKey: "online" },
    { id: "worx.0.202330294701005409AD.mower.firmware", firstKey: "firmware" },
    { id: "worx.0.202330294701005409AD.mower.error", firstKey: "error" },
    { id: "worx.0.202330294701005409AD.mower.edgecut", firstKey: "edgecut" },
    {
      id: "worx.0.202330294701005409AD.mower.batteryCharging",
      firstKey: "batteryCharging",
    },
  ],
};
