import { IdToSubscribe } from "@/types/types.ts";
import { StoreValue } from "@/store/iobrokerStore.ts";

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
      { id: "admin.0.info.updatesJson", firstKey: "updatesJson" },
      { id: "admin.0.info.updatesNumber", firstKey: "updatesNumber" },
      { id: "admin.0.info.lastUpdateCheck", firstKey: "lastUpdateCheck" },
      { id: "admin.0.info.newsFeed", firstKey: "newsFeeds" },
    ],
  },
];
