import { IdToSubscribe, Shutter } from "@/types";

export const shutterAutoUpTime: IdToSubscribe<Shutter> = {
  // Zeit Auto hochfahren Rolladen
  objectNameInStore: "shutterAutoUp",
  value: [
    {
      id: "0_userdata.0.Rolladen.Wohnzimmer.Zeit_Rollade_hoch",
      room: "wohnzimmer",
      secondKey: "ecke",
      subKeyAdditive: "AutoUpTime",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Wohnzimmer.Zeit_Rollade_hoch",
      room: "wohnzimmer",
      secondKey: "links",
      subKeyAdditive: "AutoUpTime",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Wohnzimmer.Zeit_Rollade_hoch",
      room: "wohnzimmer",
      secondKey: "mittig",
      subKeyAdditive: "AutoUpTime",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Wohnzimmer.Zeit_Rollade_hoch",
      room: "wohnzimmer",
      secondKey: "rechts",
      subKeyAdditive: "AutoUpTime",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Schlafzimmer.Zeit_Rollade_hoch",
      room: "schlafen",
      secondKey: "tuer",
      subKeyAdditive: "AutoUpTime",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Schlafzimmer.Zeit_Rollade_hoch",
      room: "schlafen",
      secondKey: "fenster",
      subKeyAdditive: "AutoUpTime",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Küche.Zeit_Rollade_hoch_Fenster",
      room: "kueche",
      secondKey: "fenster",
      subKeyAdditive: "AutoUpTime",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Küche.Zeit_Rollade_hoch_Tür",
      room: "kueche",
      secondKey: "tuer",
      subKeyAdditive: "AutoUpTime",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Kinderzimmer.Zeit_Rollade_hoch",
      room: "kinderzimmer",
      secondKey: "fenster",
      subKeyAdditive: "AutoUpTime",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Esszimmer.Zeit_Rollade_hoch",
      room: "esszimmer",
      secondKey: "links",
      subKeyAdditive: "AutoUpTime",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Bad.Zeit_Rollade_hoch",
      room: "bad",
      secondKey: "fenster",
      subKeyAdditive: "AutoUpTime",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Abstellraum_OG.Zeit_Rollade_hoch_rechts",
      room: "abstellraumog",
      secondKey: "rechts",
      subKeyAdditive: "AutoUpTime",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Abstellraum_OG.Zeit_Rollade_hoch_links",
      room: "abstellraumog",
      secondKey: "links",
      subKeyAdditive: "AutoUpTime",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Gästezimmer.Zeit_Rollade_hoch",
      room: "gaestezimmer",
      secondKey: "fenster",
      subKeyAdditive: "AutoUpTime",
      saveId: true
    }
  ]
};
