import { StoreValue, StoreValueWithTimestamp } from "@/store/iobrokerStore.ts";
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
  available: StoreValue<boolean>;
  battery: StoreValue<number>;
  el: StoreValue<number>;
  el_max: StoreValue<number>;
  el_min: StoreValue<number>;
  free_chlorine: StoreValue<number>;
  free_chlorine_max: StoreValue<number>;
  free_chlorine_min: StoreValue<number>;
  orp: StoreValue<number>;
  orp_max: StoreValue<number>;
  orp_min: StoreValue<number>;
  ph: StoreValue<number>;
  ph_max: StoreValue<number>;
  ph_min: StoreValue<number>;
  salinity: StoreValue<number>;
  totalDissolvedSolids: StoreValue<number>;
  temperature: StoreValueWithTimestamp<number>;
}

export const poolIds: IdToSubscribe<Pool> = {
  storeFolder: "pool",
  value: [
    { id: "midas-aquatemp.0.state", key: "heaterState" },
    { id: "midas-aquatemp.0.tempSet", key: "tempSet" },
    { id: "midas-aquatemp.0.consumption", key: "consumption" },
    { id: "midas-aquatemp.0.tempIn", key: "tempIn" },
    { id: "midas-aquatemp.0.tempOut", key: "tempOut" },
    { id: "midas-aquatemp.0.rotor", key: "rotor" },
    { id: "midas-aquatemp.0.mode", key: "mode" },
    { id: "midas-aquatemp.0.info.connection", key: "status" },
  ],
};
