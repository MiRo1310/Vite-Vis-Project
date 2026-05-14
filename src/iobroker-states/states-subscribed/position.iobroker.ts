import { StoreValue } from "@/store";
import { IdToSubscribe } from "@/types/types.ts";

export interface PositionIobroker {
  michaelCoordinates: StoreValue<string>;
}

export const position: IdToSubscribe<PositionIobroker> = {
  storeFolder: "position",
  value: [
    {
      id: "life360ng.0.people.afa1605e-1339-4bbc-921e-37b7774a75ce.gps-coordinates",
      key: "michaelCoordinates",
    },
  ],
};
