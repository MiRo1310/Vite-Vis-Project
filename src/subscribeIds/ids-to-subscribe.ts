import { shutterAutoUp } from "./shutter-auto-up.ts";
import { shutterAutoUpTime } from "./shutter-auto-up-time.ts";
import { shutterAutoDown } from "./shutter-auto-down.ts";
import { shutterAutoDownTime } from "./shutter-auto-down-time.ts";
import { timer, timer1, timer2, timer3, timer4 } from "./timer.ts";
import { shutterIdsLogo } from "./shutter-ids-logo.ts";
import { windowOpenClose } from "./window.ts";
import { pvIds } from "./pv-ids.ts";
import { IdToSubscribe, Pv, Shutter, Timer1, Timer2, Timer3, Timer4, TimerObject, WindowType } from "@/types/types.ts";
import { Pool, poolIds } from "./pool.ts";
import { Wetter, wetter } from "@/subscribeIds/wetter.ts";
import { Landroid, landroid } from "./landroid.ts";
import { Calendar, calendar } from "./calendar.ts";
import { Heating, heating } from "./heating.ts";
import { LogStates, logStates } from "@/subscribeIds/logs.ts";

export type IdGroups =
  Pool
  & Shutter
  & TimerObject
  & Timer1
  & Timer2
  & Timer3
  & Timer4
  & WindowType
  & Pv
  & Wetter
  & Landroid
  & Calendar
  & Heating
  & LogStates;

export const idToSubscribe: IdToSubscribe<IdGroups>[] = [
  poolIds,
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

  { objectNameInStore: "trash", value: [{ id: "trashschedule.0.type.json" }] },
  { objectNameInStore: "shoppingList", value: [{ id: "alexa-shoppinglist.0.list_activ" }] },
  { objectNameInStore: "urlaubAktiv", value: [{ id: "0_userdata.0.Urlaub.Urlaub_aktiv" }] },
  {
    // Fenster
    objectNameInStore: "fensterOffen",
    value: [{ id: "0_userdata.0.Fenster.Sind_Fenster_offen" }]
  },
  {
    // Sonnenuntergang
    objectNameInStore: "sonnenuntergang",
    value: [{ id: "0_userdata.0.Rolladen.Zeit_Rollade_auto_herunter" }]
  }

];




