import { StoreValue } from "@/store/ioBrokerStore.ts";
import { IdToSubscribe } from "@/types/types.ts";

export interface Calendar {
  table: StoreValue<string>;
}

export const calendar: IdToSubscribe<Calendar> = {
  storeFolder: "calendar",
  value: [{ id: "ical.1.data.table", key: "table" }],
};
