import { StoreValue } from "@/store/iobrokerStore";
import { IdToSubscribe } from "@/types";

export type BoolText = "true" | "false" | true | false;
export interface Wetter {
    Aussentemperatur: StoreValue<number>;
    Luftfeuchtigkeit: StoreValue<number>;
    RegenMenge: StoreValue<number>;
}
export const wetter: IdToSubscribe<Wetter> = {
    objectNameInStore: "wetter",
    value: [
        { id: "javascript.0.Geraete.WetterCom.temp_value", firstKeyInObject: "Aussentemperatur" },
        { id: "daswetter.0.NextHours.Location_1.Day_1.humidity_value", firstKeyInObject: "Luftfeuchtigkeit" },
        { id: "daswetter.0.NextHours.Location_1.Day_1.rain_value", firstKeyInObject: "RegenMenge" },

    ],


};