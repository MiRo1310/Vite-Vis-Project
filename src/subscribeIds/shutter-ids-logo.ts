import { IdToSubscribe, Shutter } from "@/types/types.ts";

export const shutterIdsLogo: IdToSubscribe<Shutter> = {
  // Rolladen
  storeFolder: "rolladen",
  value: [
    {
      id: "s7.1.DBs.DB1.B150",
      room: "wohnzimmer",
      secondKey: "mittig",
      saveId: true,
    },
    {
      id: "s7.1.DBs.DB1.B152",
      room: "wohnzimmer",
      secondKey: "ecke",
      saveId: true,
    },
    {
      id: "s7.1.DBs.DB1.B159",
      room: "wohnzimmer",
      secondKey: "links",
      saveId: true,
    },
    {
      id: "s7.1.DBs.DB1.B157",
      room: "wohnzimmer",
      secondKey: "rechts",
      saveId: true,
    },
    {
      id: "s7.1.DBs.DB1.B129",
      room: "kueche",
      secondKey: "tuer",
      saveId: true,
    },
    {
      id: "s7.1.DBs.DB1.B145",
      room: "kueche",
      secondKey: "fenster",
      saveId: true,
    },
    {
      id: "s7.1.DBs.DB1.B136",
      room: "esszimmer",
      secondKey: "links",
      saveId: true /*Einfach links für angenommen als Rollade*/,
    },
    {
      id: "s7.1.DBs.DB1.B164",
      room: "kinderzimmer",
      secondKey: "fenster",
      saveId: true,
    },
    {
      id: "s7.1.DBs.DB1.B169",
      room: "schlafen",
      secondKey: "tuer",
      saveId: true,
    },
    {
      id: "s7.2.DBs.DB1.B065",
      room: "schlafen",
      secondKey: "fenster",
      saveId: true,
    },
    {
      id: "s7.2.DBs.DB1.B073",
      room: "abstellraumog",
      secondKey: "links",
      saveId: true,
    },
    {
      id: "s7.2.DBs.DB1.B057",
      room: "abstellraumog",
      secondKey: "rechts",
      saveId: true,
    },
    {
      id: "s7.2.DBs.DB1.B078",
      room: "bad",
      secondKey: "fenster",
      saveId: true,
    },
    {
      id: "s7.2.DBs.DB1.B150",
      room: "gaestezimmer",
      secondKey: "fenster",
      saveId: true,
    },
  ],
};
