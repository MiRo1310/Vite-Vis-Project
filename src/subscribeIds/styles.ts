import { IdToSubscribe } from "@/types/types.ts";
import { StoreValue } from "@/store/iobrokerStore.ts";

export interface StylesType {
  calendarStyle: StoreValue<string>;
}

export const styles: IdToSubscribe<StylesType> = {
  storeFolder: "styles",
  value: [
    { id: "0_userdata.0.vis.calendar_styles", firstKey: "calendarStyle" },
  ],
};
