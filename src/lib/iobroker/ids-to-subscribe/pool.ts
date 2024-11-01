import { StoreValue } from "@/store/iobrokerStore";
import { IdToSubscribe } from "@/types";

export type BoolText = "true" | "false" | true | false;
export interface Pool {
    heaterState: StoreValue<BoolText>;
    tempSet: StoreValue<number>;
    consumption: StoreValue<number>;
    tempIn: StoreValue<number>;
    tempOut: StoreValue<number>;
    rotor: StoreValue<number>;
    mode: StoreValue<string>;
    status: StoreValue<boolean>;
}
export const poolIds: IdToSubscribe<Pool> = {
    objectNameInStore: "pool",
    value: [
        { id: "midas-aquatemp.0.state", firstKeyInObject: "heaterState" },
        { id: "midas-aquatemp.0.tempSet", firstKeyInObject: "tempSet", saveId: true },
        { id: "midas-aquatemp.0.consumption", firstKeyInObject: "consumption", },
        { id: "midas-aquatemp.0.tempIn", firstKeyInObject: "tempIn", },
        { id: "midas-aquatemp.0.tempOut", firstKeyInObject: "tempOut", },
        { id: "midas-aquatemp.0.rotor", firstKeyInObject: "rotor", },
        { id: "midas-aquatemp.0.mode", firstKeyInObject: "mode", },
        { id: "midas-aquatemp.0.info.connection", firstKeyInObject: "status", },

    ],

};