import { IdToSubscribe } from "@/types/types.ts";
import { StoreValue } from "@/store";

export interface TankerKoenig {
  cheapestName: StoreValue<string>;
  cheapestFullStreet: StoreValue<string>;
  cheapestPrice: StoreValue<number>;
  jsonTable: StoreValue<string>;
}

export const tankerKoenig: IdToSubscribe<TankerKoenig> = {
  storeFolder: "tankerKoenig",
  value: [
    {
      id: "tankerkoenig.0.stations.cheapest.e5.name",
      key: "cheapestName",
    },
    {
      id: "tankerkoenig.0.stations.cheapest.e5.fullStreet",
      key: "cheapestFullStreet",
    },
    {
      id: "tankerkoenig.0.stations.cheapest.e5.feed",
      key: "cheapestPrice",
    },
    {
      id: "tankerkoenig.0.stations.jsonTable",
      key: "jsonTable",
    },
  ],
};
