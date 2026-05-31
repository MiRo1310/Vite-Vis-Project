import { StoreValue } from "@/store";
import { IdToSubscribe } from "@/types/types.ts";

export interface HolidayStates {
  urlaubAktiv: StoreValue<boolean>;
}

export interface WindowGlobalStates {
  fensterOffen: StoreValue<boolean>;
}

export interface TimeStates {
  sonnenuntergang: StoreValue<boolean>;
}

export const holiday: IdToSubscribe<HolidayStates> = {
  storeFolder: "holiday",
  value: [{ id: "0_userdata.0.Urlaub.Urlaub_aktiv", key: "urlaubAktiv" }],
};

export const windowGlobal: IdToSubscribe<WindowGlobalStates> = {
  storeFolder: "windowGlobal",
  value: [{ id: "0_userdata.0.Fenster.Sind_Fenster_offen", key: "fensterOffen" }],
};

export const timeIds: IdToSubscribe<TimeStates> = {
  storeFolder: "time",
  value: [
    {
      id: "0_userdata.0.Rolladen.Zeit_Rollade_auto_herunter",
      key: "sonnenuntergang",
    },
  ],
};
