import { StoreValue } from "@/store/iobrokerStore.ts";
import { IdToSubscribe } from "@/types/types.ts";

export interface LightTypes extends LightTypesAdditive {
  Wohnzimmer: StoreValue<boolean>;
  Weihnachtsbaum: StoreValue<boolean>;
  Büro_Schreibtisch: StoreValue<boolean>;
  Büro: StoreValue<boolean>;
  Dachboden: StoreValue<boolean>;
  Abstellraum_OG: StoreValue<boolean>;
}

export interface LightTypesAdditive {
  Wohnzimmer_Ecklampe: StoreValue<boolean>;
}

export const lightStates: IdToSubscribe<LightTypes>[] = [
  {
    storeFolder: "lights",
    value: [
      { id: "sonoff.0.Sonoff_Wohnzimmer.POWER", key: "Wohnzimmer" },
      { id: "s7.2.DBs.DB1.M6", key: "Wohnzimmer_Ecklampe" },
      { id: "zigbee.0.a4c138d35583a3d7.state", key: "Weihnachtsbaum" },
      { id: "sonoff.0.Sonoff_Dachboden.POWER", key: "Dachboden" },
      {
        id: "sonoff.0.Sonoff_OG_Abstellraum.POWER",
        key: "Abstellraum_OG",
      },
      { id: "sonoff.0.Sonoff_Keller_Michi.POWER", key: "Büro" },
      { id: "tuya.0.bfec013e9034a47a12o5so.20", key: "Büro_Schreibtisch" },
    ],
  },
  {
    storeFolder: "lightsAdditive",
    value: [{ id: "s7.2.DBs.DB1.Q11", key: "Wohnzimmer_Ecklampe" }],
  },
];
