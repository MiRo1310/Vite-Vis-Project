import { StoreValue } from "@/store";
import { IdToSubscribe } from "@/types/types.ts";

export interface IShutter {
  wohnzimmerMitteAuto: StoreValue<boolean>;
  wohnzimmerEckeAuto: StoreValue<boolean>;
  wohnzimmerLinksAuto: StoreValue<boolean>;
  wohnzimmerRechtsAuto: StoreValue<boolean>;

  wohnzimmerMittePosition: StoreValue<number>;
  wohnzimmerEckePosition: StoreValue<number>;
  wohnzimmerLinksPosition: StoreValue<number>;
  wohnzimmerRechtsPosition: StoreValue<number>;

  wohnzimmerMitteAutoUp: StoreValue<boolean>;
  wohnzimmerEckeAutoUp: StoreValue<boolean>;
  wohnzimmerLinksAutoUp: StoreValue<boolean>;
  wohnzimmerRechtsAutoUp: StoreValue<boolean>;

  wohnzimmerMitteAutoUpTime: StoreValue<number>;
  wohnzimmerEckeAutoUpTime: StoreValue<number>;
  wohnzimmerLinksAutoUpTime: StoreValue<number>;
  wohnzimmerRechtsAutoUpTime: StoreValue<number>;

  wohnzimmerMitteDelay: StoreValue<number>;
  wohnzimmerEckeDelay: StoreValue<number>;
  wohnzimmerLinksDelay: StoreValue<number>;
  wohnzimmerRechtsDelay: StoreValue<number>;

  kuecheTuerAuto: StoreValue<boolean>;
  kuecheFensterAuto: StoreValue<boolean>;
  kuecheTuerAutoUp: StoreValue<boolean>;
  kuecheFensterAutoUp: StoreValue<boolean>;
  kuecheTuerAutoUpTime: StoreValue<number>;
  kuecheFensterAutoUpTime: StoreValue<number>;
  kuecheTuerDelay: StoreValue<number>;
  kuecheFensterDelay: StoreValue<number>;
  kuecheTuerPosition: StoreValue<number>;
  kuecheFensterPosition: StoreValue<number>;

  esszimmerLinksAuto: StoreValue<boolean>;
  esszimmerLinksAutoUp: StoreValue<boolean>;
  esszimmerLinksAutoUpTime: StoreValue<number>;
  esszimmerLinksDelay: StoreValue<number>;
  esszimmerLinksPosition: StoreValue<number>;

  kinderzimmerFensterAuto: StoreValue<boolean>;
  kinderzimmerFensterAutoUp: StoreValue<boolean>;
  kinderzimmerFensterAutoUpTime: StoreValue<number>;
  kinderzimmerFensterDelay: StoreValue<number>;
  kinderzimmerFensterPosition: StoreValue<number>;

  gaestezimmerFensterAuto: StoreValue<boolean>;
  gaestezimmerFensterAutoUp: StoreValue<boolean>;
  gaestezimmerFensterAutoUpTime: StoreValue<number>;
  gaestezimmerFensterDelay: StoreValue<number>;
  gaestezimmerFensterPosition: StoreValue<number>;

  schlafenTuerAuto: StoreValue<boolean>;
  schlafenFensterAuto: StoreValue<boolean>;
  schlafenTuerAutoUp: StoreValue<boolean>;
  schlafenFensterAutoUp: StoreValue<boolean>;
  schlafenTuerAutoUpTime: StoreValue<number>;
  schlafenFensterAutoUpTime: StoreValue<number>;
  schlafenTuerDelay: StoreValue<number>;
  schlafenFensterDelay: StoreValue<number>;
  schlafenTuerPosition: StoreValue<number>;
  schlafenFensterPosition: StoreValue<number>;

  badFensterAuto: StoreValue<boolean>;
  badFensterAutoUp: StoreValue<boolean>;
  badFensterAutoUpTime: StoreValue<number>;
  badFensterDelay: StoreValue<number>;
  badFensterPosition: StoreValue<number>;

  abstellraumOgLinksAuto: StoreValue<boolean>;
  abstellraumOgRechtsAuto: StoreValue<boolean>;
  abstellraumOgLinksAutoUp: StoreValue<boolean>;
  abstellraumOgRechtsAutoUp: StoreValue<boolean>;
  abstellraumOgLinksAutoUpTime: StoreValue<number>;
  abstellraumOgRechtsAutoUpTime: StoreValue<number>;
  abstellraumOgLinksDelay: StoreValue<number>;
  abstellraumOgRechtsDelay: StoreValue<number>;
  abstellraumOgLinksPosition: StoreValue<number>;
  abstellraumOgRechtsPosition: StoreValue<number>;
}

export const shutterAutoUpTimeIobroker: IdToSubscribe<IShutter> = {
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
      key: "wohnzimmerMitteAutoUpTime",
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
