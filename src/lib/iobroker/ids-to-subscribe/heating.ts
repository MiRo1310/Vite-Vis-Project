import { IdToSubscribe } from "@/types";

export interface Heating {
    automatic: boolean;
    level: boolean;
    active: boolean;
    autoSolar: boolean;
    heatingTemperature: number;
    heatingBuffer: number;
    heatingSolar: number;
    solarMaxToday: number;
    solarMax: number;
}


export const heating: IdToSubscribe<Heating> = {
    objectNameInStore: "heating",
    value: [
        { id: "s7.0.DBs.DB1.I6_-_NQ5", firstKeyInObject: "automatic" },
        { id: "s7.0.DBs.DB1.I5_-_NQ2", firstKeyInObject: "level" },
        { id: "s7.0.DBs.DB1.NQ13", firstKeyInObject: "active" },
        { id: "s7.0.DBs.DB1.NQ15", firstKeyInObject: "autoSolar" },
        { id: "s7.0.DBs.DB1.B059", firstKeyInObject: "heatingTemperature" },
        { id: "s7.0.DBs.DB1.B054", firstKeyInObject: "heatingSolar" },
        { id: "s7.0.DBs.DB1.B068", firstKeyInObject: "heatingBuffer" },
        { id: "s7.0.DBs.DB1.B076", firstKeyInObject: "solarMaxToday" },
        { id: "s7.0.DBs.DB1.B085", firstKeyInObject: "solarMax" },

    ],

};