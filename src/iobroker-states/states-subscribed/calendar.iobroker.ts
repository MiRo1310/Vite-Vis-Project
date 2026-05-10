import { StoreValue } from "@/store";
import { IdToSubscribe } from "@/types/types.ts";

export interface CalendarIobroker {
  table: StoreValue<string>;
}

export const calendar: IdToSubscribe<CalendarIobroker> = {
  storeFolder: "calendar",
  value: [{ id: "ical.1.data.table", key: "table" }],
};
