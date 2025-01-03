import { IdToSubscribe, Shutter } from "@/types/types.ts";

export const shutterAutoDown: IdToSubscribe<Shutter> = {
  // Auto herunterfahren Rolladen
  objectNameInStore: "shutterAutoDownTime",
  value: [
    {
      id: "0_userdata.0.Rolladen.Esszimmer.Esszimmer_Rolladen_Zeitsteuerung",
      room: "esszimmer",
      secondKey: "links",
      subKeyAdditive: "Auto",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Gästezimmer.Rollade_Auto_runter",
      room: "gaestezimmer",
      secondKey: "fenster",
      subKeyAdditive: "Auto",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Küche.Fenster_Rolladen_Zeitsteuerung",
      room: "kueche",
      secondKey: "fenster",
      subKeyAdditive: "Auto",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Schlafzimmer.Schlafzimmer_Rolladen_Zeitsteuerung",
      room: "schlafen",
      secondKey: "tuer",
      subKeyAdditive: "Auto",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Schlafzimmer.Schlafzimmer_Rollade_Fenster_Zeitsteuerung",
      room: "schlafen",
      secondKey: "fenster",
      subKeyAdditive: "Auto",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Kinderzimmer.Rollade_automisch_runter",
      room: "kinderzimmer",
      secondKey: "fenster",
      subKeyAdditive: "Auto",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Bad.Bad_Rolladen_Zeitsteuerung",
      room: "bad",
      secondKey: "fenster",
      subKeyAdditive: "Auto",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Wohnzimmer.Wohnzimmer_Rolladen_Zeitsteuerung",
      room: "wohnzimmer",
      secondKey: "ecke",
      subKeyAdditive: "Auto",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Wohnzimmer.Wohnzimmer_Rolladen_Zeitsteuerung",
      room: "wohnzimmer",
      secondKey: "links",
      subKeyAdditive: "Auto",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Wohnzimmer.Wohnzimmer_Rolladen_Zeitsteuerung",
      room: "wohnzimmer",
      secondKey: "mittig",
      subKeyAdditive: "Auto",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Wohnzimmer.Wohnzimmer_Rolladen_Zeitsteuerung",
      room: "wohnzimmer",
      secondKey: "rechts",
      subKeyAdditive: "Auto",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Küche.Tür_Rolladen_Zeitsteuerung",
      room: "kueche",
      secondKey: "tuer",
      subKeyAdditive: "Auto",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Abstellraum_OG.Abstellraum_OG_links_Rolladen_Zeitsteuerung_aktiv",
      room: "abstellraumog",
      secondKey: "links",
      subKeyAdditive: "Auto",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Abstellraum_OG.Abstellraum_OG_rechts_Rolladen_Zeitsteuerung_aktiv",
      room: "abstellraumog",
      secondKey: "rechts",
      subKeyAdditive: "Auto",
      saveId: true
    }
  ]
};
