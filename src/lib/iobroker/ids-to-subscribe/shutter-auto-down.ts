import { IdToSubscribe, Shutter } from "@/types";

export const shutterAutoDown: IdToSubscribe<Shutter> = {
  // Auto herunterfahren Rolladen
  objectNameInStore: "shutterAutoDownTime",
  value: [
    {
      id: "0_userdata.0.Rolladen.Esszimmer.Esszimmer_Rolladen_Zeitsteuerung",
      room: "esszimmer",
      subKey: "links",
      subKeyAdditive: "Auto",
      saveId: true,
    },
    {
      id: "0_userdata.0.Rolladen.Gästezimmer.Rollade_Auto_runter",
      room: "gaestezimmer",
      subKey: "fenster",
      subKeyAdditive: "Auto",
      saveId: true,
    },
    {
      id: "0_userdata.0.Rolladen.Küche.Fenster_Rolladen_Zeitsteuerung",
      room: "kueche",
      subKey: "fenster",
      subKeyAdditive: "Auto",
      saveId: true,
    },
    {
      id: "0_userdata.0.Rolladen.Schlafzimmer.Schlafzimmer_Rolladen_Zeitsteuerung",
      room: "schlafen",
      subKey: "tuer",
      subKeyAdditive: "Auto",
      saveId: true,
    },
    {
      id: "0_userdata.0.Rolladen.Kinderzimmer.Rollade_automisch_runter",
      room: "kinderzimmer",
      subKey: "fenster",
      subKeyAdditive: "Auto",
      saveId: true,
    },
    {
      id: "0_userdata.0.Rolladen.Bad.Bad_Rolladen_Zeitsteuerung",
      room: "bad",
      subKey: "fenster",
      subKeyAdditive: "Auto",
      saveId: true,
    },
    {
      id: "0_userdata.0.Rolladen.Wohnzimmer.Wohnzimmer_Rolladen_Zeitsteuerung",
      room: "wohnzimmer",
      subKey: "ecke",
      subKeyAdditive: "Auto",
      saveId: true,
    },
    {
      id: "0_userdata.0.Rolladen.Wohnzimmer.Wohnzimmer_Rolladen_Zeitsteuerung",
      room: "wohnzimmer",
      subKey: "links",
      subKeyAdditive: "Auto",
      saveId: true,
    },
    {
      id: "0_userdata.0.Rolladen.Wohnzimmer.Wohnzimmer_Rolladen_Zeitsteuerung",
      room: "wohnzimmer",
      subKey: "mittig",
      subKeyAdditive: "Auto",
      saveId: true,
    },
    {
      id: "0_userdata.0.Rolladen.Wohnzimmer.Wohnzimmer_Rolladen_Zeitsteuerung",
      room: "wohnzimmer",
      subKey: "rechts",
      subKeyAdditive: "Auto",
      saveId: true,
    },
    {
      id: "0_userdata.0.Rolladen.Küche.Tür_Rolladen_Zeitsteuerung",
      room: "kueche",
      subKey: "tuer",
      subKeyAdditive: "Auto",
      saveId: true,
    },
    {
      id: "0_userdata.0.Rolladen.Abstellraum_OG.Abstellraum_OG_links_Rolladen_Zeitsteuerung_aktiv",
      room: "abstellraumog",
      subKey: "links",
      subKeyAdditive: "Auto",
      saveId: true,
    },
    {
      id: "0_userdata.0.Rolladen.Abstellraum_OG.Abstellraum_OG_rechts_Rolladen_Zeitsteuerung_aktiv",
      room: "abstellraumog",
      subKey: "rechts",
      subKeyAdditive: "Auto",
      saveId: true,
    },
  ],
};
