import { shutterAutoUpIobroker } from "./shutter-auto-up.iobroker.ts";
import { shutterAutoUpTimeIobroker } from "./shutter-auto-up-time.iobroker.ts";
import { shutterAutoDownIobroker } from "./shutter-auto-down.iobroker.ts";
import { shutterAutoDownTimeIobroker } from "./shutter-auto-down-time.iobroker.ts";
import { timerIobroker, timers } from "./timer.iobroker.ts";
import { shutterIdsLogoIobroker } from "./shutter-ids-logo.iobroker.ts";
import { windowOpenClose } from "./window.iobroker.ts";
import { IPvStates, pvIdsIobroker } from "./pv-ids.iobroker.ts";
import { IdToSubscribe, Shutter, TimerObject, Timers, WindowType } from "@/types/types.ts";
import { PoolIobroker } from "./pool.iobroker.ts";
import { WetterIobroker, wetter } from "./wetter.iobroker.ts";
import { LandroidIobroker, landroid } from "./landroid.iobroker.ts";
import { CalendarIobroker, calendar } from "./calendar.iobroker.ts";
import { HeatingIobroker, heating, heatingControl, HeatingControlType } from "./heating.iobroker.ts";
import { LogStates, logStates } from "./logs.iobroker.ts";
import {
  AlexaListStates,
  holiday,
  HolidayStates,
  shoppingList,
  timeIds,
  TimeStates,
  trash,
  TrashStates,
  windowGlobal,
  WindowGlobalStates,
} from "./diverse.iobroker.ts";
import { AirConditionersIobroker, airConditioners } from "./air-conditioners.iobroker.ts";
import { TankerKoenig, tankerKoenig } from "@/subscribeIds/tankerkoenig.iobroker.ts";

export type IdGroups = PoolIobroker &
  Shutter &
  TimerObject &
  WindowType &
  IPvStates &
  WetterIobroker &
  LandroidIobroker &
  CalendarIobroker &
  HeatingIobroker &
  Timers &
  LogStates &
  TrashStates &
  AlexaListStates &
  HolidayStates &
  WindowGlobalStates &
  TimeStates &
  AirConditionersIobroker &
  HeatingControlType &
  TankerKoenig;

export const idToSubscribeOnAppStart: IdToSubscribe<IdGroups>[] = [
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
];
