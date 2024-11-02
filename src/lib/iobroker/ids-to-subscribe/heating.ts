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
        periodActive: StoreValue<boolean>;
        guestIncrease: StoreValue<number>;
    };
}


export const heating: IdToSubscribe<Heating> = {
    objectNameInStore: "heating",
    value: [
        { id: "s7.0.DBs.DB1.I6_-_NQ5", firstKey: "automatic" },
        { id: "s7.0.DBs.DB1.I5_-_NQ2", firstKey: "level" },
        { id: "s7.0.DBs.DB1.NQ13", firstKey: "active" },
        { id: "s7.0.DBs.DB1.NQ15", firstKey: "autoSolar" },
        { id: "s7.0.DBs.DB1.B059", firstKey: "heatingTemperature" },
        { id: "s7.0.DBs.DB1.B054", firstKey: "heatingSolar" },
        { id: "s7.0.DBs.DB1.B068", firstKey: "heatingBuffer" },
        { id: "s7.0.DBs.DB1.B076", firstKey: "solarMaxToday" },
        { id: "s7.0.DBs.DB1.B085", firstKey: "solarMax" },
        { id: "s7.0.DBs.DB1.NQ12", firstKey: "pelletExist" },
        { id: "s7.0.DBs.DB1.I3_-_NQ3", firstKey: "watcherAdmitter" },
        { id: "s7.0.DBs.DB1.I4_-_NQ4", firstKey: "tempPelletBuffer" },
        { id: "s7.0.DBs.DB1.NQ14", firstKey: "confirmMessage" },
        { id: "s7.0.DBs.DB1.I1_-_NQ1", firstKey: "snail" },
        { id: "s7.0.DBs.DB1.NQ8", firstKey: "spiral" },
        { id: "s7.0.DBs.DB1.B004", firstKey: "maxTimeToFill" },
        { id: "s7.0.DBs.DB1.B008", firstKey: "offsetFilling" },
        { id: "s7.0.DBs.DB1.B061", firstKey: "tempPumpOn" },
        { id: "s7.0.DBs.DB1.B061_2", firstKey: "tempPumpOff" },
        { id: "s7.0.DBs.DB1.B067", firstKey: "diffSolarBuffer" },
        { id: "s7.0.DBs.DB1.B069", firstKey: "minFillTemp" },
        { id: "s7.0.DBs.DB1.B056", firstKey: "maxFillTemp" },
        { id: "s7.0.DBs.DB1.Q3_-_NQ10", firstKey: "solarPump" },
        { id: "s7.0.DBs.DB1.Q4_-_NQ11", firstKey: "heatingPump" },
        { id: "heatingcontrol.0.CurrentProfile", firstKey: "heatingControl", secondKey: "profile" },
        { id: "heatingcontrol.0.vis.ChoosenRoom", firstKey: "heatingControl", secondKey: "room" },
        { id: "heatingcontrol.0.vis.ProfileValueListText", firstKey: "heatingControl", secondKey: "profileText" },
        { id: "heatingcontrol.0.vis.ProfileValueListValue", firstKey: "heatingControl", secondKey: "profileValue" },
        { id: "heatingcontrol.0.info.UsedRooms", firstKey: "heatingControl", secondKey: "usedRoom" },
        { id: "heatingcontrol.0.HeatingPeriodActive", firstKey: "heatingControl", secondKey: "periodActive" },
        { id: "heatingcontrol.0.vis.TempDecreaseValues.GuestIncrease", firstKey: "heatingControl", secondKey: "guestIncrease" },
    ],

};