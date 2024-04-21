export const pvIds: IdToSubscribe = {
  objectNameInStore: "pv",
  value: [
    { id: "modbus.0.holdingRegisters.41069_soc", firstKeyInObject: "batteryCharging" },
    { id: "modbus.0.holdingRegisters.41067_Active_Power", firstKeyInObject: "activeCharging" },
    { id: "modbus.0.holdingRegisters.41079_grid_Power", firstKeyInObject: "feedIn" },
    { id: "shelly.0.shellypro3em#ec6260976f14#1.EM0.TotalActivePower", firstKeyInObject: "shellyFeedOut" },
    { id: "sonoff.0.Photovoltaik.ENERGY_Power", firstKeyInObject: "smallPv" },
    { id: "0_userdata.0.Photovoltaik.Einnahme_Einspeisung", firstKeyInObject: "profit" },
  ],
};
