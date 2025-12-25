import { IdToSubscribe, Shutter } from "@/types/types.ts";

export const shutterAutoDownTime: IdToSubscribe<Shutter> = {
  // Zeitversatz Rolladen Auto herunter fahren
  storeFolder: "shutterAutoDownTime",
  value: [
    {
      id: "0_userdata.0.Rolladen.Esszimmer.Zeitversatz_herunterfahren_zum_Sonnenuntergang",
      key: "esszimmerLinksDelay",
    },
    {
      id: "0_userdata.0.Rolladen.Küche.Zeitversatz_herunterfahren_zum_Sonnenuntergang",
      key: "kuecheFensterDelay",
    },
    {
      id: "0_userdata.0.Rolladen.Schlafzimmer.Zeitversatz_herunterfahren_zum_Sonnenuntergang_Tür",
      key: "schlafenTuerDelay",
    },
    {
      id: "0_userdata.0.Rolladen.Schlafzimmer.Zeitversatz_herunterfahren_zum_Sonnenuntergang",
      key: "schlafenFensterDelay",
    },
    {
      id: "0_userdata.0.Rolladen.Kinderzimmer.Zeitversatz_herunterfahren_zum_Sonnenuntergang",
      key: "kinderzimmerFensterDelay",
    },
    {
      id: "0_userdata.0.Rolladen.Bad.Zeitversatz_herunterfahren_zum_Sonnenuntergang",
      key: "badFensterDelay",
    },
    {
      id: "0_userdata.0.Rolladen.Wohnzimmer.Zeitversatz_herunterfahren_zum_Sonnenuntergang",
      key: "wohnzimmerEckeDelay",
    },
    {
      id: "0_userdata.0.Rolladen.Wohnzimmer.Zeitversatz_herunterfahren_zum_Sonnenuntergang",
      key: "wohnzimmerLinksDelay",
    },
    {
      id: "0_userdata.0.Rolladen.Wohnzimmer.Zeitversatz_herunterfahren_zum_Sonnenuntergang",
      key: "wohnzimmerMitteDelay",
    },
    {
      id: "0_userdata.0.Rolladen.Wohnzimmer.Zeitversatz_herunterfahren_zum_Sonnenuntergang",
      key: "wohnzimmerRechtsDelay",
    },
    {
      id: "0_userdata.0.Rolladen.Küche.Zeitversatz_herunterfahren_zum_Sonnenuntergang_(Tür)",
      key: "kuecheTuerDelay",
    },
    {
      id: "0_userdata.0.Rolladen.Abstellraum_OG.Zeitversatz_herunterfahren_zum_Sonnenuntergang_(links)",
      key: "abstellraumOgLinksDelay",
    },
    {
      id: "0_userdata.0.Rolladen.Abstellraum_OG.Zeitversatz_herunterfahren_zum_Sonnenuntergang_(rechts)",
      key: "abstellraumOgRechtsDelay",
    },
    {
      id: "0_userdata.0.Rolladen.Gästezimmer.Zeitversatz_herunterfahren_zum_Sonnenuntergang",
      key: "gaestezimmerFensterDelay",
    },
  ],
};
