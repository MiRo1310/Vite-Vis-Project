import { IdToSubscribe } from "@/types/types.ts";
import { StoreValue } from "@/store";

export interface WetterIobroker {
  Aussentemperatur: StoreValue<number>;
  Luftfeuchtigkeit: StoreValue<number>;
  RegenMenge: StoreValue<number>;
}

export const wetter: IdToSubscribe<WetterIobroker> = {
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
