import { IdToSubscribe, Shutter } from "@/types/types.ts";

export const shutterAutoUpTime: IdToSubscribe<Shutter> = {
  // Zeit Auto hochfahren Rolladen
  storeFolder: "shutterAutoUp",
  value: [
    {
      id: "0_userdata.0.Rolladen.Wohnzimmer.Zeit_Rollade_hoch",
      key: "wohnzimmerEckeAutoUpTime",
    },
    {
      id: "0_userdata.0.Rolladen.Wohnzimmer.Zeit_Rollade_hoch",
      key: "wohnzimmerLinksAutoUpTime",
    },
    {
      id: "0_userdata.0.Rolladen.Wohnzimmer.Zeit_Rollade_hoch",
      key: "wohnzimmerMittigAutoUpTime",
    },
    {
      id: "0_userdata.0.Rolladen.Wohnzimmer.Zeit_Rollade_hoch",
      key: "wohnzimmerRechtsAutoUpTime",
    },
    {
      id: "0_userdata.0.Rolladen.Schlafzimmer.Zeit_Rollade_hoch_Tür",
      key: "schlafenTuerAutoUpTime",
    },
    {
      id: "0_userdata.0.Rolladen.Schlafzimmer.Zeit_Rollade_hoch",
      key: "schlafenFensterAutoUpTime",
    },
    {
      id: "0_userdata.0.Rolladen.Küche.Zeit_Rollade_hoch_Fenster",
      key: "kuecheFensterAutoUpTime",
    },
    {
      id: "0_userdata.0.Rolladen.Küche.Zeit_Rollade_hoch_Tür",
      key: "kuecheTuerAutoUpTime",
    },
    {
      id: "0_userdata.0.Rolladen.Kinderzimmer.Zeit_Rollade_hoch",
      key: "kinderzimmerFensterAutoUpTime",
    },
    {
      id: "0_userdata.0.Rolladen.Esszimmer.Zeit_Rollade_hoch",
      key: "esszimmerLinksAutoUpTime",
    },
    {
      id: "0_userdata.0.Rolladen.Bad.Zeit_Rollade_hoch",
      key: "badFensterAutoUpTime",
    },
    {
      id: "0_userdata.0.Rolladen.Abstellraum_OG.Zeit_Rollade_hoch_rechts",
      key: "abstellraumOgRechtsAutoUpTime",
    },
    {
      id: "0_userdata.0.Rolladen.Abstellraum_OG.Zeit_Rollade_hoch_links",
      key: "abstellraumOgLinksAutoUpTime",
    },
    {
      id: "0_userdata.0.Rolladen.Gästezimmer.Zeit_Rollade_hoch",
      key: "gaestezimmerFensterAutoUpTime",
    },
  ],
};
