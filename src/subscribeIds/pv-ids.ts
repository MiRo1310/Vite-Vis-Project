import { IdToSubscribe, Pv } from "@/types/types.ts";

export const pvIds: IdToSubscribe<Pv> = {
  objectNameInStore: "pv",
  value: [
    { id: "modbus.0.holdingRegisters.41069_soc", firstKey: "batteryCharging" },
    {
      id: "modbus.0.holdingRegisters.41067_Active_Power",
      firstKey: "activeCharging",
    },
    { id: "modbus.0.holdingRegisters.41079_grid_Power", firstKey: "feedIn" },
    {
      id: "shelly.0.shellypro3em#ec6260976f14#1.EM0.TotalActivePower",
      firstKey: "shellyFeedOut",
    },
    { id: "sonoff.0.Photovoltaik.ENERGY_Power", firstKey: "smallPv" },
    {
      id: "0_userdata.0.Photovoltaik.Einnahme_Einspeisung",
      firstKey: "profit",
    },
    { id: "fronius.0.inverter.1.P", firstKey: "pvGross" },
    {
      id: "0_userdata.0.Photovoltaik.Einsparung_durch_PV",
      firstKey: "savedMoney",
    },
  ],
};
