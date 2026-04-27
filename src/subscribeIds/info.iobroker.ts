import { IdToSubscribe } from "@/types/types.ts";
import { StoreValue } from "@/store/ioBrokerStore.ts";

export interface Infos {
  updatesJson: StoreValue<string>;
  updatesNumber: StoreValue<number>;
  newsFeeds: StoreValue<string>;
  lastUpdateCheck: StoreValue<string>;
}

export const infoStates: IdToSubscribe<Infos>[] = [
  {
    storeFolder: "infos",
    value: [
      { id: "admin.0.info.updatesJson", key: "updatesJson" },
      { id: "admin.0.info.updatesNumber", key: "updatesNumber" },
      { id: "admin.0.info.lastUpdateCheck", key: "lastUpdateCheck" },
      { id: "admin.0.info.newsFeed", key: "newsFeeds" },
    ],
  },
];
