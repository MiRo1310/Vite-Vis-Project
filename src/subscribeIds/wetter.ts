import { StoreValue } from "@/store/ioBrokerStore.ts";
import { IdToSubscribe } from "@/types/types.ts";

export type BoolText = "true" | "false" | true | false;

export interface Wetter {
  Aussentemperatur: StoreValue<number>;
  Luftfeuchtigkeit: StoreValue<number>;
  RegenMenge: StoreValue<number>;
}

export const wetter: IdToSubscribe<Wetter> = {
  storeFolder: "wetter",
  value: [
    {
      id: "javascript.0.Geraete.WetterCom.temp_value",
      key: "Aussentemperatur",
    },
    {
      id: "daswetter.0.NextHours.Location_1.Day_1.humidity_value",
      key: "Luftfeuchtigkeit",
    },
    {
      id: "daswetter.0.NextHours.Location_1.Day_1.rain_value",
      key: "RegenMenge",
    },
  ],
};
