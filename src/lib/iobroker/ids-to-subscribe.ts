import { shutterAutoUp } from "./ids-to-subscribe/shutter-auto-up";
import { shutterAutoUpTime } from "./ids-to-subscribe/shutter-auto-up-time";
import { shutterAutoDown } from "./ids-to-subscribe/shutter-auto-down";
import { shutterAutoDownTime } from "./ids-to-subscribe/shutter-auto-down-time";
import { timer, timer1, timer2, timer3, timer4 } from "./ids-to-subscribe/timer";
import { shutterIdsLogo } from "./ids-to-subscribe/shutter-ids-logo";
import { windowOpenClose } from "./ids-to-subscribe/window";
import { pvIds } from "./ids-to-subscribe/pv-ids";
import { IdToSubscribe } from "@/types";
import { poolIds } from "./ids-to-subscribe/pool";
import { wetter } from "@/lib/iobroker/ids-to-subscribe/wetter";
import { landroid } from "./ids-to-subscribe/landroid";
import { calendar } from "./ids-to-subscribe/calendar";
import { heating } from "./ids-to-subscribe/heating";


export const idToSubscribe: IdToSubscribe<any>[] = [
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

  { objectNameInStore: "trash", value: [{ id: "trashschedule.0.type.json" }] },
  { objectNameInStore: "shoppingList", value: [{ id: "alexa-shoppinglist.0.list_activ" }] },
  { objectNameInStore: "urlaubAktiv", value: [{ id: "0_userdata.0.Urlaub.Urlaub_aktiv" }] },
  {
    // Fenster
    objectNameInStore: "fensterOffen",
    value: [{ id: "0_userdata.0.Fenster.Sind_Fenster_offen" }],
  },
  {
    // Sonnenuntergang
    objectNameInStore: "sonnenuntergang",
    value: [{ id: "0_userdata.0.Rolladen.Zeit_Rollade_auto_herunter" }],
  },

];




