import { StoreValue } from "@/store";
import { IdToSubscribe } from "@/types/types.ts";

export interface StylesType {
  calendarStyle: StoreValue<string>;
}

export const stylesIobroker: IdToSubscribe<StylesType> = {
  storeFolder: "styles",
  value: [{ id: "0_userdata.0.vis.calendar_styles", key: "calendarStyle" }],
};
