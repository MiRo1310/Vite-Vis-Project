import { IdToSubscribe } from "@/types";


export interface Calendar {
    table: string;

}


export const calendar: IdToSubscribe<Calendar> = {
    objectNameInStore: "calendar",
    value: [
        { id: "ical.1.data.table", firstKeyInObject: "table" },
    ],

};