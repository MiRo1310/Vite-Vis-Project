import { IdToSubscribe } from "@/types/types.ts";
import { StoreValue } from "@/store/iobrokerStore.ts";

export interface LogStates {
  error: StoreValue<string>;
  warning: StoreValue<string>;
  info: StoreValue<string>;
}

export const logStates: IdToSubscribe<LogStates> = {
  objectNameInStore: "logs",
  value: [
    { id: "logparser.0.filters.Error.json", firstKey: "error" },
    { id: "logparser.0.filters.Info.json", firstKey: "info" },
    { id: "logparser.0.filters.Warn.json", firstKey: "warning" },
  ],
};
