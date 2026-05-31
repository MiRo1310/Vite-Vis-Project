import { IdToSubscribe } from "@/types/types.ts";
import { batteryIds } from "./states-subscribed/batteriesType.iobroker.ts";

export const idToSubscribeOnAppStart: IdToSubscribe<any>[] = [batteryIds];
