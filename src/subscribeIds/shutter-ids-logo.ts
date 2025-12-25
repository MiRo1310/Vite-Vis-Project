import { IdToSubscribe, Shutter } from "@/types/types.ts";

export const shutterIdsLogo: IdToSubscribe<Shutter> = {
  storeFolder: "rolladen",
  value: [
    {
      id: "s7.1.DBs.DB1.B150",
      key: "wohnzimmerMittePosition",
    },
    {
      id: "s7.1.DBs.DB1.B152",
      key: "wohnzimmerEckePosition",
    },
    {
      id: "s7.1.DBs.DB1.B159",
      key: "wohnzimmerLinksPosition",
    },
    {
      id: "s7.1.DBs.DB1.B157",
      key: "wohnzimmerRechtsPosition",
    },
    {
      id: "s7.1.DBs.DB1.B129",
      key: "kuecheTuerPosition",
    },
    {
      id: "s7.1.DBs.DB1.B145",
      key: "kuecheFensterPosition",
    },
    {
      id: "s7.1.DBs.DB1.B136",
      key: "esszimmerLinksPosition" /*Einfach links für angenommen als Rollade*/,
    },
    {
      id: "s7.1.DBs.DB1.B164",
      key: "kinderzimmerFensterPosition",
    },
    {
      id: "s7.1.DBs.DB1.B169",
      key: "schlafenTuerPosition",
    },
    {
      id: "s7.2.DBs.DB1.B065",
      key: "schlafenFensterPosition",
    },
    {
      id: "s7.2.DBs.DB1.B073",
      key: "abstellraumOgLinksPosition",
    },
    {
      id: "s7.2.DBs.DB1.B057",
      key: "abstellraumOgRechtsPosition",
    },
    {
      id: "s7.2.DBs.DB1.B078",
      key: "badFensterPosition",
    },
    {
      id: "s7.2.DBs.DB1.B150",
      key: "gaestezimmerFensterPosition",
    },
  ],
};
