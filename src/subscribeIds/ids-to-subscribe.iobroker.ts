import { shutterAutoUpIobroker } from "./shutter-auto-up.iobroker.ts";
import { shutterAutoUpTimeIobroker } from "./shutter-auto-up-time.iobroker.ts";
import { shutterAutoDownIobroker } from "./shutter-auto-down.iobroker.ts";
import { shutterAutoDownTimeIobroker } from "./shutter-auto-down-time.iobroker.ts";
import { timerIobroker, timers } from "./timer.iobroker.ts";
import { shutterIdsLogoIobroker } from "./shutter-ids-logo.iobroker.ts";
import { windowOpenClose } from "./window.iobroker.ts";
import { pvIdsIobroker } from "./pv-ids.iobroker.ts";
import { IdToSubscribe } from "@/types/types.ts";
import { wetter } from "./wetter.iobroker.ts";
import { landroid } from "./landroid.iobroker.ts";
import { calendar } from "./calendar.iobroker.ts";
import { heating, heatingControl } from "./heating.iobroker.ts";
import { logStates } from "./logs.iobroker.ts";
import { holiday, shoppingList, timeIds, trash, windowGlobal } from "./diverse.iobroker.ts";
import { airConditioners } from "./air-conditioners.iobroker.ts";
import { tankerKoenig } from "@/subscribeIds/tankerkoenig.iobroker.ts";
import { batteryIds } from "@/subscribeIds/batteriesType.iobroker.ts";
import { hmipIds } from "@/subscribeIds/hmip.iobroker.ts";
import { lightStates } from "@/subscribeIds/light.iobroker.ts";
import { energyStates } from "@/subscribeIds/energy.iobroker.ts";

export const idToSubscribeOnAppStart: IdToSubscribe<any>[] = [
  shutterAutoUpIobroker,
  shutterAutoDownIobroker,
  shutterAutoUpTimeIobroker,
  shutterAutoDownTimeIobroker,
  shutterIdsLogoIobroker,
  timerIobroker,
  timers,
  windowOpenClose,
  pvIdsIobroker,
  wetter,
  landroid,
  calendar,
  heating,
  logStates,
  trash,
  shoppingList,
  holiday,
  windowGlobal,
  timeIds,
  heatingControl,
  airConditioners,
  tankerKoenig,
  batteryIds,
  hmipIds,
  ...lightStates,
  heating,
  energyStates,
];
