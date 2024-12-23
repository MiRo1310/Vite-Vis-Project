import { IdToSubscribe, Shutter } from "@/types.ts";

export const shutterAutoUp: IdToSubscribe<Shutter> = {
  // Auto hoch aktiv
  objectNameInStore: "shutterAutoUp",
  value: [
    {
      id: "0_userdata.0.Rolladen.Abstellraum_OG.Auto_hoch_links",
      room: "abstellraumog",
      secondKey: "links",
      subKeyAdditive: "AutoUp",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Abstellraum_OG.Auto_hoch_rechts",
      room: "abstellraumog",
      secondKey: "rechts",
      subKeyAdditive: "AutoUp",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Bad.Rollade_Auto_hoch",
      room: "bad",
      secondKey: "fenster",
      subKeyAdditive: "AutoUp",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Esszimmer.Rollade_Auto_hoch",
      room: "esszimmer",
      secondKey: "links",
      subKeyAdditive: "AutoUp",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Gästezimmer.Rollade_Auto_hoch",
      room: "gaestezimmer",
      secondKey: "fenster",
      subKeyAdditive: "AutoUp",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Kinderzimmer.Rollade_auto_hoch",
      room: "kinderzimmer",
      secondKey: "fenster",
      subKeyAdditive: "AutoUp",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Küche.Rollade_auto_hoch_Tür",
      room: "kueche",
      secondKey: "tuer",
      subKeyAdditive: "AutoUp",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Küche.Rollade_auto_hoch_fenster",
      room: "kueche",
      secondKey: "fenster",
      subKeyAdditive: "AutoUp",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Schlafzimmer.Rollade_auto_hoch_fenster",
      room: "schlafen",
      secondKey: "fenster",
      subKeyAdditive: "AutoUp",
      saveId: true
    }, {
      id: "0_userdata.0.Rolladen.Schlafzimmer.Rollade_auto_hoch_tuer",
      room: "schlafen",
      secondKey: "tuer",
      subKeyAdditive: "AutoUp",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Wohnzimmer.Rollade_auto_hoch",
      room: "wohnzimmer",
      secondKey: "ecke",
      subKeyAdditive: "AutoUp",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Wohnzimmer.Rollade_auto_hoch",
      room: "wohnzimmer",
      secondKey: "links",
      subKeyAdditive: "AutoUp",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Wohnzimmer.Rollade_auto_hoch",
      room: "wohnzimmer",
      secondKey: "mittig",
      subKeyAdditive: "AutoUp",
      saveId: true
    },
    {
      id: "0_userdata.0.Rolladen.Wohnzimmer.Rollade_auto_hoch",
      room: "wohnzimmer",
      secondKey: "rechts",
      subKeyAdditive: "AutoUp",
      saveId: true
    }
  ]
};
