import { shutterAutoUp } from "./shutterAutoUp";
import { shutterAutoUpTime } from "./shutterAutoUpTime";
import { shutterAutoDown } from "./shutterAutoDown";
import { shutterAutoDownTime } from "./shutterAutoDownTime";
import { timer, timer1, timer2, timer3, timer4 } from "./timer";
import { shutterIdsLogo } from "./shutterIdsLogo";
import { windowOpenClose } from "./window";
import { pvIds } from "./pvIds";
import { IdToSubscribe } from "@/types";
import { poolIds } from "./pool";

export const idToSubscribe: IdToSubscribe[] = [
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
  {
    objectNameInStore: "iobrokerValues",
    value: [{ id: "javascript.0.Geraete.WetterCom.temp_value", firstKeyInObject: "Aussentemperatur" }],
  },
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




