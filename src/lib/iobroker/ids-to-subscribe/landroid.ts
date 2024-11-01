import { StoreValue } from "@/store/iobrokerStore";
import { IdToSubscribe } from "@/types";

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
        { id: "worx.0.202330294701005409AD.mower.batteryState", firstKeyInObject: "battery" },
        { id: "worx.0.202330294701005409AD.mower.totalDistance", firstKeyInObject: "totalDistance" },
        { id: "worx.0.202330294701005409AD.mower.totalBladeTime", firstKeyInObject: "totalBladeTime" },
        { id: "worx.0.202330294701005409AD.mower.status", firstKeyInObject: "status" },
        { id: "worx.0.202330294701005409AD.mower.online", firstKeyInObject: "online" },
        { id: "worx.0.202330294701005409AD.mower.firmware", firstKeyInObject: "firmware" },
        { id: "worx.0.202330294701005409AD.mower.error", firstKeyInObject: "error" },
        { id: "worx.0.202330294701005409AD.mower.edgecut", firstKeyInObject: "edgecut" },
        { id: "worx.0.202330294701005409AD.mower.batteryCharging", firstKeyInObject: "batteryCharging" },


    ],

};