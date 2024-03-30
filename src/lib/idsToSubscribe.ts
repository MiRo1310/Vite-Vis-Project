import { shutterAutoUp } from "./ids/rolladen/shutterAutoUp";
import { shutterAutoUpTime } from "./ids/rolladen/shutterAutoUpTime";
import { shutterAutoDown } from "./ids/rolladen/shutterAutoDown";
import { shutterAutoDownTime } from "./ids/rolladen/shutterAutoDownTime";
import { timer, timer1, timer2, timer3, timer4 } from "./ids/timer/timer";
import { shutterIdsLogo } from "./ids/rolladen/shutterIdsLogo";
import { windowOpenClose } from "./ids/window/window";

export const idToSubscribe: IdToSubscribe[] = [
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
