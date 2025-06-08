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
  objectNameInStore: "pool",
  value: [
    { id: "midas-aquatemp.0.state", firstKey: "heaterState" },
    { id: "midas-aquatemp.0.tempSet", firstKey: "tempSet", saveId: true },
    { id: "midas-aquatemp.0.consumption", firstKey: "consumption" },
    { id: "midas-aquatemp.0.tempIn", firstKey: "tempIn" },
    { id: "midas-aquatemp.0.tempOut", firstKey: "tempOut" },
    { id: "midas-aquatemp.0.rotor", firstKey: "rotor" },
    { id: "midas-aquatemp.0.mode", firstKey: "mode" },
    { id: "midas-aquatemp.0.info.connection", firstKey: "status" },

    { id: "zigbee.0.94b216fffecdf240.battery", firstKey: "battery" },
    { id: "zigbee.0.94b216fffecdf240.available", firstKey: "available" },
    { id: "zigbee.0.94b216fffecdf240.ec", firstKey: "el" },//Electrical conductivity
    { id: "zigbee.0.94b216fffecdf240.ec_max", firstKey: "el_max" },//Electrical conductivity
    { id: "zigbee.0.94b216fffecdf240.ec_min", firstKey: "el_min" },//Electrical conductivity
    { id: "zigbee.0.94b216fffecdf240.free_chlorine", firstKey: "free_chlorine" },
    { id: "zigbee.0.94b216fffecdf240.free_chlorine_max", firstKey: "free_chlorine_max" },
    { id: "zigbee.0.94b216fffecdf240.free_chlorine_min", firstKey: "free_chlorine_min" },
    { id: "zigbee.0.94b216fffecdf240.orp", firstKey: "orp" }, //Oxidation Reduction Potential value. If the ORP value is above 850mv, it means that the disinfectant has been added too much, and it is necessary to add water or change the water for neutralization. If the ORP value is below 487mv, it means that too little disinfectant has been added and the pool needs to be disinfected again
    { id: "zigbee.0.94b216fffecdf240.orp_max", firstKey: "orp_max" }, //Oxidation Reduction Potential maximal value
    { id: "zigbee.0.94b216fffecdf240.orp_min", firstKey: "orp_min" },
    { id: "zigbee.0.94b216fffecdf240.ph", firstKey: "ph" },
    { id: "zigbee.0.94b216fffecdf240.ph_max", firstKey: "ph_max" },
    { id: "zigbee.0.94b216fffecdf240.ph_min", firstKey: "ph_min" },
    { id: "zigbee.0.94b216fffecdf240.salinity", firstKey: "salinity" },
    { id: "zigbee.0.94b216fffecdf240.tds", firstKey: "totalDissolvedSolids" },
    { id: "zigbee.0.94b216fffecdf240.temperature", firstKey: "temperature", timestamp: true }

  ]

};