import { IdToSubscribe } from "@/types.ts";
import { StoreValue } from "@/store/iobrokerStore.ts";

export interface PhoneStates {
  ringing: StoreValue<boolean>;
  lastCallTimestamp: StoreValue<string>;
  callee: StoreValue<string>;
  lastCalleeName: StoreValue<string>;
  lastCallee: StoreValue<string>;
  lastDuration: StoreValue<string>;
  calleeName: StoreValue<string>;
}

export const phoneStates: IdToSubscribe<PhoneStates> =
  {
    objectNameInStore: "phone",
    value: [
      { id: "tr-064.0.callmonitor.ringing", firstKey: "ringing" },
      { id: "tr-064.0.callmonitor.lastCall.timestamp", firstKey: "lastCallTimestamp" },
      { id: "tr-064.0.callmonitor.lastCall.calleeName", firstKey: "lastCalleeName" },
      { id: "tr-064.0.callmonitor.lastCall.callee", firstKey: "lastCallee" },
      { id: "tr-064.0.callmonitor.lastCall.duration", firstKey: "lastDuration" },
      { id: "tr-064.0.callmonitor.inbound.callee", firstKey: "callee" },
      { id: "tr-064.0.callmonitor.inbound.callee", firstKey: "calleeName" }
    ]
  }
;