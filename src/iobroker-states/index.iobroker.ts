import { shutterAutoUpIobroker } from "./states-subscribed/shutter-auto-up.iobroker.ts";
import { shutterAutoUpTimeIobroker } from "./states-subscribed/shutter-auto-up-time.iobroker.ts";
import { shutterAutoDownIobroker } from "./states-subscribed/shutter-auto-down.iobroker.ts";
import { shutterAutoDownTimeIobroker } from "./states-subscribed/shutter-auto-down-time.iobroker.ts";
import { timerIobroker, timers } from "./states-subscribed/timer.iobroker.ts";
import { shutterIdsLogoIobroker } from "./states-subscribed/shutter-ids-logo.iobroker.ts";
import { windowOpenClose } from "./states-subscribed/window.iobroker.ts";
import { pvIdsIobroker } from "./states-subscribed/pv-ids.iobroker.ts";
import { IdToSubscribe } from "@/types/types.ts";
import { logStates } from "./states-subscribed/logs.iobroker.ts";
import { tankerKoenig } from "./states-subscribed/tankerkoenig.iobroker.ts";
import { batteryIds } from "./states-subscribed/batteriesType.iobroker.ts";
import { hmipIds } from "./states-subscribed/hmip.iobroker.ts";
import { lightStates } from "./states-subscribed/light.iobroker.ts";
import { position } from "@/iobroker-states/states-subscribed/position.iobroker.ts";
import { poolStates } from "@/iobroker-states/states-subscribed/pool.iobroker.ts";

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

  logStates,

  tankerKoenig,
  batteryIds,
  hmipIds,
  ...lightStates,

  position,
  poolStates,
];
