import { IdToSubscribe } from "@/types/types.ts";
import { StoreValue } from "@/store/ioBrokerStore.ts";

export interface LogStates {
  error: StoreValue<string>;
  warning: StoreValue<string>;
  info: StoreValue<string>;
}

export const logStates: IdToSubscribe<LogStates> = {
  storeFolder: "logs",
  value: [
    { id: "logparser.0.filters.Error.json", key: "error" },
    { id: "logparser.0.filters.Info.json", key: "info" },
    { id: "logparser.0.filters.Warn.json", key: "warning" },
  ],
};
