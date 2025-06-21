import { shutterAutoUp } from "./shutter-auto-up.ts";
import { shutterAutoUpTime } from "./shutter-auto-up-time.ts";
import { shutterAutoDown } from "./shutter-auto-down.ts";
import { shutterAutoDownTime } from "./shutter-auto-down-time.ts";
import { timer, timer1, timer2, timer3, timer4 } from "./timer.ts";
import { shutterIdsLogo } from "./shutter-ids-logo.ts";
import { windowOpenClose } from "./window.ts";
import { pvIds } from "./pv-ids.ts";
import { IdToSubscribe, Pv, Shutter, Timer1, Timer2, Timer3, Timer4, TimerObject, WindowType } from "@/types/types.ts";
import { Pool } from "./pool.ts";
import { Wetter, wetter } from "@/subscribeIds/wetter.ts";
import { Landroid, landroid } from "./landroid.ts";
import { Calendar, calendar } from "./calendar.ts";
import { Heating, heating, heatingControl, HeatingControlType } from "./heating.ts";
import { LogStates, logStates } from "@/subscribeIds/logs.ts";
import {
  holiday,
  HolidayStates,
  shoppingList,
  ShoppingListStates,
  timeIds,
  TimeStates,
  trash,
  TrashStates,
  windowGlobal,
  WindowGlobalStates,
} from "@/subscribeIds/diverse.ts";

export type IdGroups = Pool &
  Shutter &
  TimerObject &
  Timer1 &
  Timer2 &
  Timer3 &
  Timer4 &
  WindowType &
  Pv &
  Wetter &
  Landroid &
  Calendar &
  Heating &
  LogStates &
  TrashStates &
  ShoppingListStates &
  HolidayStates &
  WindowGlobalStates &
  TimeStates &
  HeatingControlType;

export const idToSubscribe: IdToSubscribe<IdGroups>[] = [
  shutterAutoUp,
  shutterAutoDown,
  shutterAutoUpTime,
  shutterAutoDownTime,
  shutterIdsLogo,
  timer,
  timer1,
  timer2,
  timer3,
  timer4,
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
];
