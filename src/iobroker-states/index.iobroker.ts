import { shutterAutoUpIobroker } from "./states-subscribed/shutter-auto-up.iobroker.ts";
import { shutterAutoUpTimeIobroker } from "./states-subscribed/shutter-auto-up-time.iobroker.ts";
import { shutterAutoDownIobroker } from "./states-subscribed/shutter-auto-down.iobroker.ts";
import { shutterAutoDownTimeIobroker } from "./states-subscribed/shutter-auto-down-time.iobroker.ts";
import { shutterIdsLogoIobroker } from "./states-subscribed/shutter-ids-logo.iobroker.ts";
import { IdToSubscribe } from "@/types/types.ts";
import { batteryIds } from "./states-subscribed/batteriesType.iobroker.ts";

export const idToSubscribeOnAppStart: IdToSubscribe<any>[] = [
  shutterAutoUpIobroker,
  shutterAutoDownIobroker,
  shutterAutoUpTimeIobroker,
  shutterAutoDownTimeIobroker,
  shutterIdsLogoIobroker,
  batteryIds,
];
