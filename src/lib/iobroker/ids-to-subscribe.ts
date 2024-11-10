import { shutterAutoUp } from "./ids-to-subscribe/shutter-auto-up";
import { shutterAutoUpTime } from "./ids-to-subscribe/shutter-auto-up-time";
import { shutterAutoDown } from "./ids-to-subscribe/shutter-auto-down";
import { shutterAutoDownTime } from "./ids-to-subscribe/shutter-auto-down-time";
import { timer, timer1, timer2, timer3, timer4 } from "./ids-to-subscribe/timer";
import { shutterIdsLogo } from "./ids-to-subscribe/shutter-ids-logo";
import { windowOpenClose } from "./ids-to-subscribe/window";
import { pvIds } from "./ids-to-subscribe/pv-ids";
import { IdToSubscribe, Pv, Shutter, Timer1, Timer2, Timer3, Timer4, TimerObject, Window } from "@/types";
import { Pool, poolIds } from "./ids-to-subscribe/pool";
import { Wetter, wetter } from "@/lib/iobroker/ids-to-subscribe/wetter";
import { Landroid, landroid } from "./ids-to-subscribe/landroid";
import { Calendar, calendar } from "./ids-to-subscribe/calendar";
import { Heating, heating } from "./ids-to-subscribe/heating";
import { LogStates, logStates } from "@/lib/iobroker/ids-to-subscribe/logs.ts";

export type IdGroups =
  Pool
  & Shutter
  & TimerObject
  & Timer1
  & Timer2
  & Timer3
  & Timer4
  & Window
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




