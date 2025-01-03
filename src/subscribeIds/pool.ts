import { StoreValue } from "@/store/iobrokerStore.ts";
import { IdToSubscribe } from "@/types/types.ts";

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
    { id: "midas-aquatemp.0.state", firstKey: "heaterState" },
    { id: "midas-aquatemp.0.tempSet", firstKey: "tempSet", saveId: true },
    { id: "midas-aquatemp.0.consumption", firstKey: "consumption" },
    { id: "midas-aquatemp.0.tempIn", firstKey: "tempIn" },
    { id: "midas-aquatemp.0.tempOut", firstKey: "tempOut" },
    { id: "midas-aquatemp.0.rotor", firstKey: "rotor" },
    { id: "midas-aquatemp.0.mode", firstKey: "mode" },
    { id: "midas-aquatemp.0.info.connection", firstKey: "status" }

  ]

};