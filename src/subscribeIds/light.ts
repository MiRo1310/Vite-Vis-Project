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
    objectNameInStore: "lights",
    value: [
      { id: "sonoff.0.Sonoff_Wohnzimmer.POWER", firstKey: "Wohnzimmer" },
      { id: "s7.2.DBs.DB1.M6", firstKey: "Wohnzimmer_Ecklampe" },
      { id: "zigbee.0.a4c138d35583a3d7.state", firstKey: "Weihnachtsbaum" },
      { id: "sonoff.0.Sonoff_Dachboden.POWER", firstKey: "Dachboden" },
      { id: "sonoff.0.Sonoff_OG_Abstellraum.POWER", firstKey: "Abstellraum_OG" },
      { id: "sonoff.0.Sonoff_Keller_Michi.POWER", firstKey: "Büro" },
      { id: "tuya.0.bfec013e9034a47a12o5so.20", firstKey: "Büro_Schreibtisch" }
    ]
  },
  {
    objectNameInStore: "lightsAdditive",
    value: [
      { id: "Wohnzimmer Steckdose", firstKey: "Wohnzimmer_Ecklampe" }
    ]
  }
];