import { IdToSubscribe, Shutter } from "@/types/types.ts";

export const shutterAutoUp: IdToSubscribe<Shutter> = {
  // Auto hoch aktiv
  storeFolder: "shutterAutoUp",
  value: [
    {
      id: "0_userdata.0.Rolladen.Abstellraum_OG.Auto_hoch_links",
      key: "abstellraumOgLinksAutoUp",
    },
    {
      id: "0_userdata.0.Rolladen.Abstellraum_OG.Auto_hoch_rechts",
      key: "abstellraumOgRechtsAutoUp",
    },
    {
      id: "0_userdata.0.Rolladen.Bad.Rollade_Auto_hoch",
      key: "badFensterAutoUp",
    },
    {
      id: "0_userdata.0.Rolladen.Esszimmer.Rollade_Auto_hoch",
      key: "esszimmerLinksAutoUp",
    },
    {
      id: "0_userdata.0.Rolladen.Gästezimmer.Rollade_Auto_hoch",
      key: "gaestezimmerFensterAutoUp",
    },
    {
      id: "0_userdata.0.Rolladen.Kinderzimmer.Rollade_auto_hoch",
      key: "kinderzimmerFensterAutoUp",
    },
    {
      id: "0_userdata.0.Rolladen.Küche.Rollade_auto_hoch_Tür",
      key: "kuecheTuerAutoUp",
    },
    {
      id: "0_userdata.0.Rolladen.Küche.Rollade_auto_hoch_fenster",
      key: "kuecheFensterAutoUp",
    },
    {
      id: "0_userdata.0.Rolladen.Schlafzimmer.Rollade_auto_hoch_fenster",
      key: "schlafenFensterAutoUp",
    },
    {
      id: "0_userdata.0.Rolladen.Schlafzimmer.Rollade_auto_hoch_tuer",
      key: "schlafenTuerAutoUp",
    },
    {
      id: "0_userdata.0.Rolladen.Wohnzimmer.Rollade_auto_hoch",
      key: "wohnzimmerEckeAutoUp",
    },
    {
      id: "0_userdata.0.Rolladen.Wohnzimmer.Rollade_auto_hoch",
      key: "wohnzimmerLinksAutoUp",
    },
    {
      id: "0_userdata.0.Rolladen.Wohnzimmer.Rollade_auto_hoch",
      key: "wohnzimmerMitteAutoUp",
    },
    {
      id: "0_userdata.0.Rolladen.Wohnzimmer.Rollade_auto_hoch",
      key: "wohnzimmerRechtsAutoUp",
    },
  ],
};
