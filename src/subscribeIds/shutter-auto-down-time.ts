import { IdToSubscribe, Shutter } from "@/types/types.ts";

export const shutterAutoDownTime: IdToSubscribe<Shutter> = {
  // Zeitversatz Rolladen Auto herunter fahren
  objectNameInStore: "shutterAutoDownTime",
  value: [
    {
      id: "0_userdata.0.Rolladen.Esszimmer.Zeitversatz_herunterfahren_zum_Sonnenuntergang",
      room: "esszimmer",
      secondKey: "links",
      subKeyAdditive: "Delay",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Küche.Zeitversatz_herunterfahren_zum_Sonnenuntergang",
      room: "kueche",
      secondKey: "fenster",
      subKeyAdditive: "Delay",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Schlafzimmer.Zeitversatz_herunterfahren_zum_Sonnenuntergang_Tür",
      room: "schlafen",
      secondKey: "tuer",
      subKeyAdditive: "Delay",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Schlafzimmer.Zeitversatz_herunterfahren_zum_Sonnenuntergang",
      room: "schlafen",
      secondKey: "fenster",
      subKeyAdditive: "Delay",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Kinderzimmer.Zeitversatz_herunterfahren_zum_Sonnenuntergang",
      room: "kinderzimmer",
      secondKey: "fenster",
      subKeyAdditive: "Delay",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Bad.Zeitversatz_herunterfahren_zum_Sonnenuntergang",
      room: "bad",
      secondKey: "fenster",
      subKeyAdditive: "Delay",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Wohnzimmer.Zeitversatz_herunterfahren_zum_Sonnenuntergang",
      room: "wohnzimmer",
      secondKey: "ecke",
      subKeyAdditive: "Delay",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Wohnzimmer.Zeitversatz_herunterfahren_zum_Sonnenuntergang",
      room: "wohnzimmer",
      secondKey: "links",
      subKeyAdditive: "Delay",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Wohnzimmer.Zeitversatz_herunterfahren_zum_Sonnenuntergang",
      room: "wohnzimmer",
      secondKey: "mittig",
      subKeyAdditive: "Delay",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Wohnzimmer.Zeitversatz_herunterfahren_zum_Sonnenuntergang",
      room: "wohnzimmer",
      secondKey: "rechts",
      subKeyAdditive: "Delay",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Küche.Zeitversatz_herunterfahren_zum_Sonnenuntergang_(Tür)",
      room: "kueche",
      secondKey: "tuer",
      subKeyAdditive: "Delay",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Abstellraum_OG.Zeitversatz_herunterfahren_zum_Sonnenuntergang_(links)",
      room: "abstellraumog",
      secondKey: "links",
      subKeyAdditive: "Delay",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Abstellraum_OG.Zeitversatz_herunterfahren_zum_Sonnenuntergang_(rechts)",
      room: "abstellraumog",
      secondKey: "rechts",
      subKeyAdditive: "Delay",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Gästezimmer.Zeitversatz_herunterfahren_zum_Sonnenuntergang",
      room: "gaestezimmer",
      secondKey: "fenster",
      subKeyAdditive: "Delay",
      saveId: true
    }
  ]
};
