import { StoreValue } from "@/store/iobrokerStore.ts";
import { IdToSubscribe } from "@/types/types.ts";

export interface Calendar {
  table: StoreValue<string>;
}

export const calendar: IdToSubscribe<Calendar> = {
  objectNameInStore: "calendar",
  value: [{ id: "ical.1.data.table", firstKey: "table" }],
};
