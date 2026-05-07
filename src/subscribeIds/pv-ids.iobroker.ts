import { StoreValue } from "@/store";
import { IdToSubscribe } from "@/types/types.ts";

export interface IPvStates {
  feedIn: StoreValue<number>;
  batteryCharging: StoreValue<number>;
  shellyFeedOut: StoreValue<number>;
  smallPv: StoreValue<number>;
  activeCharging: StoreValue<number>;
  profit: StoreValue<number>;
  pvGross: StoreValue<number>;
  savedMoney: StoreValue<number>;
  energyDayGross: StoreValue<number>;
  energyDaySmall: StoreValue<number>;
}

export const pvIdsIobroker: IdToSubscribe<IPvStates> = {
  storeFolder: "pv",
  value: [
    { id: "modbus.0.holdingRegisters.41069_soc", key: "batteryCharging" },
    { id: "modbus.0.holdingRegisters.41067_Active_Power", key: "activeCharging" },
    { id: "modbus.0.holdingRegisters.41079_grid_Power", key: "feedIn" },
    { id: "shelly.0.shellypro3em#ec6260976f14#1.EM0.TotalActivePower", key: "shellyFeedOut" },
    { id: "sonoff.0.Photovoltaik.ENERGY_Power", key: "smallPv" },
    { id: "0_userdata.0.Photovoltaik.Einnahme_Einspeisung", key: "profit" },
    { id: "fronius.0.inverter.1.P", key: "pvGross" },
    { id: "0_userdata.0.Photovoltaik.Einsparung_durch_PV", key: "savedMoney" },
    { id: "sonoff.0.Photovoltaik.ENERGY_Today", key: "energyDaySmall" },
    { id: "fronius.0.inverter.1.DAY_ENERGY", key: "energyDayGross" },
  ],
};
