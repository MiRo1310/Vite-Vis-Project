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
    pelletExist: boolean;
    watcherAdmitter: boolean;
    tempPelletBuffer: boolean;
    confirmMessage: boolean;
    snail: boolean;
    spiral: boolean;
    maxTimeToFill: number;
    offsetFilling: number;
    tempPumpOn: number;
    tempPumpOff: number;
    diffSolarBuffer: number;
    minFillTemp: number;
    maxFillTemp: number;
    solarPump: boolean;
    heatingPump: boolean;
    heatingControl: {
        profile: number;
        room: number;
    };
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
        { id: "s7.0.DBs.DB1.NQ12", firstKeyInObject: "pelletExist" },
        { id: "s7.0.DBs.DB1.I3_-_NQ3", firstKeyInObject: "watcherAdmitter" },
        { id: "s7.0.DBs.DB1.I4_-_NQ4", firstKeyInObject: "tempPelletBuffer" },
        { id: "s7.0.DBs.DB1.NQ14", firstKeyInObject: "confirmMessage" },
        { id: "s7.0.DBs.DB1.I1_-_NQ1", firstKeyInObject: "snail" },
        { id: "s7.0.DBs.DB1.NQ8", firstKeyInObject: "spiral" },
        { id: "s7.0.DBs.DB1.B004", firstKeyInObject: "maxTimeToFill" },
        { id: "s7.0.DBs.DB1.B008", firstKeyInObject: "offsetFilling" },
        { id: "s7.0.DBs.DB1.B061", firstKeyInObject: "tempPumpOn" },
        { id: "s7.0.DBs.DB1.B061_2", firstKeyInObject: "tempPumpOff" },
        { id: "s7.0.DBs.DB1.B067", firstKeyInObject: "diffSolarBuffer" },
        { id: "s7.0.DBs.DB1.B069", firstKeyInObject: "minFillTemp" },
        { id: "s7.0.DBs.DB1.B056", firstKeyInObject: "maxFillTemp" },
        { id: "s7.0.DBs.DB1.Q3_-_NQ10", firstKeyInObject: "solarPump" },
        { id: "s7.0.DBs.DB1.Q4_-_NQ11", firstKeyInObject: "heatingPump" },
        { id: "heatingcontrol.0.CurrentProfile", firstKeyInObject: "heatingControl", subKey: "profile" },
        { id: "heatingcontrol.0.vis.ChoosenRoom", firstKeyInObject: "heatingControl", subKey: "room" },
    ],

};