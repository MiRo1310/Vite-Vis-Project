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
    { id: "tr-064.0.callmonitor.ringing", key: "ringing" },
    {
      id: "tr-064.0.callmonitor.lastCall.timestamp",
      key: "lastCallTimestamp",
    },
    {
      id: "tr-064.0.callmonitor.lastCall.callerName",
      key: "lastCallerName",
    },
    { id: "tr-064.0.callmonitor.lastCall.caller", key: "lastCaller" },
    { id: "tr-064.0.callmonitor.lastCall.duration", key: "lastDuration" },
    { id: "tr-064.0.callmonitor.inbound.caller", key: "caller" },
    { id: "tr-064.0.callmonitor.inbound.callerName", key: "callerName" },
    {
      id: "tr-064.0.callmonitor.inbound.timestamp",
      key: "callerTimestamp",
    },
  ],
};
