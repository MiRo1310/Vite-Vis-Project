import { StoreValue } from "@/store/iobrokerStore";
import { IdToSubscribe } from "@/types";


export interface Heating {
    automatic: StoreValue<boolean>;
    level: StoreValue<boolean>;
    active: StoreValue<boolean>;
    autoSolar: StoreValue<boolean>;
    heatingTemperature: StoreValue<number>;
    heatingBuffer: StoreValue<number>;
    heatingSolar: StoreValue<number>;
    solarMaxToday: StoreValue<number>;
    solarMax: StoreValue<number>;
    pelletExist: StoreValue<boolean>;
    watcherAdmitter: StoreValue<boolean>;
    tempPelletBuffer: StoreValue<boolean>;
    confirmMessage: StoreValue<boolean>;
    snail: StoreValue<boolean>;
    spiral: StoreValue<boolean>;
    maxTimeToFill: StoreValue<number>;
    offsetFilling: StoreValue<number>;
    tempPumpOn: StoreValue<number>;
    tempPumpOff: StoreValue<number>;
    diffSolarBuffer: StoreValue<number>;
    minFillTemp: StoreValue<number>;
    maxFillTemp: StoreValue<number>;
    solarPump: StoreValue<boolean>;
    heatingPump: StoreValue<boolean>;
    heatingControl: {
        profile: StoreValue<number>;
        room: StoreValue<number>;
        profileText: StoreValue<string>;
        profileValue: StoreValue<string>;
        usedRoom: StoreValue<string>;
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
        { id: "heatingcontrol.0.vis.ProfileValueListText", firstKeyInObject: "heatingControl", subKey: "profileText" },
        { id: "heatingcontrol.0.vis.ProfileValueListValue", firstKeyInObject: "heatingControl", subKey: "profileValue" },
        { id: "heatingcontrol.0.info.UsedRooms", firstKeyInObject: "heatingControl", subKey: "usedRoom" },
    ],

};