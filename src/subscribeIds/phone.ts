import { IdToSubscribe } from "@/types/types.ts";
import { StoreValue } from "@/store/iobrokerStore.ts";

export interface PhoneStates {
  ringing: StoreValue<boolean>;

  lastCallTimestamp: StoreValue<string>;
  lastCallerName: StoreValue<string>;
  lastCaller: StoreValue<string>;
  lastDuration: StoreValue<string>;

  caller: StoreValue<string>;
  callerName: StoreValue<string>;
  callerTimestamp: StoreValue<string>;
}

export const phoneStates: IdToSubscribe<PhoneStates> = {
  storeFolder: "phone",
  value: [
    { id: "tr-064.0.callmonitor.ringing", firstKey: "ringing" },
    {
      id: "tr-064.0.callmonitor.lastCall.timestamp",
      firstKey: "lastCallTimestamp",
    },
    {
      id: "tr-064.0.callmonitor.lastCall.callerName",
      firstKey: "lastCallerName",
    },
    { id: "tr-064.0.callmonitor.lastCall.caller", firstKey: "lastCaller" },
    { id: "tr-064.0.callmonitor.lastCall.duration", firstKey: "lastDuration" },
    { id: "tr-064.0.callmonitor.inbound.caller", firstKey: "caller" },
    { id: "tr-064.0.callmonitor.inbound.callerName", firstKey: "callerName" },
    {
      id: "tr-064.0.callmonitor.inbound.timestamp",
      firstKey: "callerTimestamp",
    },
  ],
};
