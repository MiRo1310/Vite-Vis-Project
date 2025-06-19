import { StoreValue } from "@/store/iobrokerStore.ts";
import { IdToSubscribe } from "@/types/types.ts";

export interface PresenceType {
  Iphone_Michael: StoreValue<boolean>;
  Iphone_Hannah: StoreValue<boolean>;
}

export const presenceStates: IdToSubscribe<PresenceType> = {
  storeFolder: "presence",
  value: [
    { id: "ping.0.iobroker.192_168_1_186", key: "Iphone_Michael" },
    { id: "ping.0.iobroker.192_168_1_187", key: "Iphone_Hannah" },
  ],
};
