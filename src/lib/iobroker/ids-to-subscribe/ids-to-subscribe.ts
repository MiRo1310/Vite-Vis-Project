import { shutterAutoUp } from "./shutter-auto-up";
import { shutterAutoUpTime } from "./shutter-auto-up-time";
import { shutterAutoDown } from "./shutter-auto-down";
import { shutterAutoDownTime } from "./shutter-auto-down-time";
import { timer, timer1, timer2, timer3, timer4 } from "./timer";
import { shutterIdsLogo } from "./shutter-ids-logo";
import { windowOpenClose } from "./window";
import { pvIds } from "./pv-ids";
import { IdToSubscribe } from "@/types";
import { poolIds } from "./pool";
import { wetter } from "@/lib/iobroker/ids-to-subscribe/wetter";
import { landroid } from "./landroid";

export const idToSubscribe: IdToSubscribe<any>[] = [
  //Pool
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




