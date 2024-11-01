import { StoreValue } from "@/store/iobrokerStore";
import { IdToSubscribe } from "@/types";


export interface Calendar {
    table: StoreValue<string>;

}


export const calendar: IdToSubscribe<Calendar> = {
    objectNameInStore: "calendar",
    value: [
        { id: "ical.1.data.table", firstKeyInObject: "table" },
    ],

};