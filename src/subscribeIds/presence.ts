import { StoreValue } from "@/store/iobrokerStore.ts";
import { IdToSubscribe } from "@/types/types.ts";

export interface PresenceType {
  Iphone_Michael: StoreValue<boolean>;
  Iphone_Hannah: StoreValue<boolean>;
}

export const presenceStates: IdToSubscribe<PresenceType> = {
  objectNameInStore: "presence",
  value: [
    { id: "ping.0.iobroker.192_168_1_186", firstKey: "Iphone_Michael" },
    { id: "ping.0.iobroker.192_168_1_187", firstKey: "Iphone_Hannah" },
  ],
};
