import { shutterAutoUpIobroker } from "./states-subscribed/shutter-auto-up.iobroker.ts";
import { shutterAutoUpTimeIobroker } from "./states-subscribed/shutter-auto-up-time.iobroker.ts";
import { shutterAutoDownIobroker } from "./states-subscribed/shutter-auto-down.iobroker.ts";
import { shutterAutoDownTimeIobroker } from "./states-subscribed/shutter-auto-down-time.iobroker.ts";
import { timerIobroker, timers } from "./states-subscribed/timer.iobroker.ts";
import { shutterIdsLogoIobroker } from "./states-subscribed/shutter-ids-logo.iobroker.ts";
import { windowOpenClose } from "./states-subscribed/window.iobroker.ts";
import { pvIdsIobroker } from "./states-subscribed/pv-ids.iobroker.ts";
import { IdToSubscribe } from "@/types/types.ts";
import { wetter } from "./states-subscribed/wetter.iobroker.ts";
import { landroid } from "./states-subscribed/landroid.iobroker.ts";
import { calendar } from "./states-subscribed/calendar.iobroker.ts";
import { heating, heatingControl } from "./states-subscribed/heating.iobroker.ts";
import { logStates } from "./states-subscribed/logs.iobroker.ts";
import { holiday, shoppingList, timeIds, trash, windowGlobal } from "./states-subscribed/diverse.iobroker.ts";
import { airConditioners } from "./states-subscribed/air-conditioners.iobroker.ts";
import { tankerKoenig } from "./states-subscribed/tankerkoenig.iobroker.ts";
import { batteryIds } from "./states-subscribed/batteriesType.iobroker.ts";
import { hmipIds } from "./states-subscribed/hmip.iobroker.ts";
import { lightStates } from "./states-subscribed/light.iobroker.ts";
import { energyStates } from "./states-subscribed/energy.iobroker.ts";
import { position } from "@/iobroker-states/states-subscribed/position.iobroker.ts";

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
  position,
];
