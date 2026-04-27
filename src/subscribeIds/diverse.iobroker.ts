import { IdToSubscribe } from "@/types/types.ts";
import { StoreValue } from "@/store/ioBrokerStore.ts";

export interface TrashStates {
  json: StoreValue<string>;
}

export interface AlexaListStates {
  shoppingListActive: StoreValue<string>;
  michaelsTodoList: StoreValue<string>;
}

export interface HolidayStates {
  urlaubAktiv: StoreValue<boolean>;
}

export interface WindowGlobalStates {
  fensterOffen: StoreValue<boolean>;
}

export interface TimeStates {
  sonnenuntergang: StoreValue<boolean>;
}

export const trash: IdToSubscribe<TrashStates> = {
  storeFolder: "trash",
  value: [{ id: "trashschedule.0.type.json", key: "json" }],
};

export const shoppingList: IdToSubscribe<AlexaListStates> = {
  storeFolder: "alexaLists",
  value: [
    { id: "alexa-shoppinglist.0.list_activ", key: "shoppingListActive" },
    { id: "alexa-shoppinglist.1.list_activ", key: "michaelsTodoList" },
  ],
};

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
