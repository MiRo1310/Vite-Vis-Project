import { IShutter } from "@/iobroker-states/states-subscribed/shutter-auto-up-time.iobroker.ts";
import { IdToSubscribe } from "@/types/types.ts";

export const shutterAutoDownIobroker: IdToSubscribe<IShutter> = {
  // Auto herunterfahren Rolladen
  storeFolder: "shutterAutoDownTime",
  value: [
    {
      id: "0_userdata.0.Rolladen.Esszimmer.Esszimmer_Rolladen_Zeitsteuerung",
      key: "esszimmerLinksAuto",
    },
    {
      id: "0_userdata.0.Rolladen.Gästezimmer.Rollade_Auto_runter",
      key: "gaestezimmerFensterAuto",
    },
    {
      id: "0_userdata.0.Rolladen.Küche.Fenster_Rolladen_Zeitsteuerung",
      key: "kuecheFensterAuto",
    },
    {
      id: "0_userdata.0.Rolladen.Schlafzimmer.Schlafzimmer_Rolladen_Zeitsteuerung",
      key: "schlafenTuerAuto",
    },
    {
      id: "0_userdata.0.Rolladen.Schlafzimmer.Schlafzimmer_Rollade_Fenster_Zeitsteuerung",
      key: "schlafenFensterAuto",
    },
    {
      id: "0_userdata.0.Rolladen.Kinderzimmer.Rollade_automisch_runter",
      key: "kinderzimmerFensterAuto",
    },
    {
      id: "0_userdata.0.Rolladen.Bad.Bad_Rolladen_Zeitsteuerung",
      key: "badFensterAuto",
    },
    {
      id: "0_userdata.0.Rolladen.Wohnzimmer.Wohnzimmer_Rolladen_Zeitsteuerung",
      key: "wohnzimmerEckeAuto",
    },
    {
      id: "0_userdata.0.Rolladen.Wohnzimmer.Wohnzimmer_Rolladen_Zeitsteuerung",
      key: "wohnzimmerLinksAuto",
    },
    {
      id: "0_userdata.0.Rolladen.Wohnzimmer.Wohnzimmer_Rolladen_Zeitsteuerung",
      key: "wohnzimmerMitteAuto",
    },
    {
      id: "0_userdata.0.Rolladen.Wohnzimmer.Wohnzimmer_Rolladen_Zeitsteuerung",
      key: "wohnzimmerRechtsAuto",
    },
    {
      id: "0_userdata.0.Rolladen.Küche.Tür_Rolladen_Zeitsteuerung",
      key: "kuecheTuerAuto",
    },
    {
      id: "0_userdata.0.Rolladen.Abstellraum_OG.Abstellraum_OG_links_Rolladen_Zeitsteuerung_aktiv",
      key: "abstellraumOgLinksAuto",
    },
    {
      id: "0_userdata.0.Rolladen.Abstellraum_OG.Abstellraum_OG_rechts_Rolladen_Zeitsteuerung_aktiv",
      key: "abstellraumOgRechtsAuto",
    },
  ],
};
