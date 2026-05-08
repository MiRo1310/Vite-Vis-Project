import { IdToSubscribe } from "@/types/types.ts";
import { StoreValue } from "@/store";

export interface EnergyStates {
  Waschmaschine: StoreValue<number>;
  Kuehltruhe: StoreValue<number>;
  Rack: StoreValue<number>;
  energyReceived: StoreValue<number>;
  energyReturned: StoreValue<number>;
}

export const energyStates: IdToSubscribe<EnergyStates> = {
  storeFolder: "energy",
  value: [
    { id: "sonoff.0.Steckdose_Waschmaschine .ENERGY_Power", key: "Waschmaschine" },
    { id: "sonoff.0.Tasmota Kühltruhe.ENERGY_Power", key: "Kuehltruhe" },
    { id: "sonoff.0.Tasmota Server.ENERGY_Power", key: "Rack" },
    { id: "sonoff.0.Tasmota Server.ENERGY_Power", key: "Rack" },
    { id: "0_userdata.0.Photovoltaik.Bezug_Tag", key: "energyReceived" },
    { id: "0_userdata.0.Photovoltaik.Einspeisung_Tag", key: "energyReturned" },
  ],
};
