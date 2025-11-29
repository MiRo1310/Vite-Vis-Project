import { shutterAutoUp } from "./shutter-auto-up.ts";
import { shutterAutoUpTime } from "./shutter-auto-up-time.ts";
import { shutterAutoDown } from "./shutter-auto-down.ts";
import { shutterAutoDownTime } from "./shutter-auto-down-time.ts";
import { timer, timers } from "./timer.ts";
import { shutterIdsLogo } from "./shutter-ids-logo.ts";
import { windowOpenClose } from "./window.ts";
import { pvIds } from "./pv-ids.ts";
import { IdToSubscribe, Pv, Shutter, TimerObject, Timers, WindowType } from "@/types/types.ts";
import { Pool } from "./pool.ts";
import { Wetter, wetter } from "@/subscribeIds/wetter.ts";
import { Landroid, landroid } from "./landroid.ts";
import { Calendar, calendar } from "./calendar.ts";
import { Heating, heating, heatingControl, HeatingControlType } from "./heating.ts";
import { LogStates, logStates } from "@/subscribeIds/logs.ts";
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
} from "@/subscribeIds/diverse.ts";
import { AirConditioners, airConditioners } from "@/subscribeIds/air-conditioners.ts";

export type IdGroups = Pool &
  Shutter &
  TimerObject &
  WindowType &
  Pv &
  Wetter &
  Landroid &
  Calendar &
  Heating &
  Timers &
  LogStates &
  TrashStates &
  AlexaListStates &
  HolidayStates &
  WindowGlobalStates &
  TimeStates &
  AirConditioners &
  HeatingControlType;

export const idToSubscribeOnAppStart: IdToSubscribe<IdGroups>[] = [
  shutterAutoUp,
  shutterAutoDown,
  shutterAutoUpTime,
  shutterAutoDownTime,
  shutterIdsLogo,
  timer,
  timers,
  windowOpenClose,
  pvIds,
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
];
