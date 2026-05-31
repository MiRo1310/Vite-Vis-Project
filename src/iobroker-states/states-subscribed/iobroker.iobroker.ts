import type { StoreValue } from "@/store";

type Leaf = StoreValue<unknown>;
type ChannelShape = Record<string, Leaf | Record<string, Leaf>>;

type FlatKeys<T extends ChannelShape> = {
  [K in keyof T]: T[K] extends Leaf ? K : never;
}[keyof T];

type GroupKeys<T extends ChannelShape> = {
  [K in keyof T]: T[K] extends Record<string, Leaf> ? K : never;
}[keyof T];

type FlatId<T extends ChannelShape> = {
  id: string;
  group?: undefined; // optional, aber hier bewusst "nicht gesetzt"
  key: FlatKeys<T>;
  invertValue?: boolean;
};

type GroupedId<T extends ChannelShape> = {
  [G in GroupKeys<T>]: {
    id: string;
    group: G; // nur hier Pflicht
    key: keyof Extract<T[G], Record<string, Leaf>>;
    invertValue?: boolean;
  };
}[GroupKeys<T>];

type IdForChannel<T extends ChannelShape> = FlatId<T> | GroupedId<T>;

export type IobrokerSubscription = {
  [C in keyof IobrokerChannels]: {
    channel: C;
    value: IdForChannel<NonNullable<IobrokerChannels[C]>>[];
  };
}[keyof IobrokerChannels];

export type Optional<T> = T | undefined;

export interface IobrokerChannels {
  system: Optional<{
    ramIoBrokerLxc: StoreValue<string>;
    ramLevIoBrokerLxc: StoreValue<string>;
  }>;
  trash: Optional<{
    json: StoreValue<string>;
  }>;
  channel: Optional<{
    test: {
      json: StoreValue<string>;
    };
  }>;
  alexaLists: Optional<{
    shoppingListActive: StoreValue<string>;
    michaelsTodoList: StoreValue<string>;
  }>;
  time: Optional<{
    sonnenuntergang: StoreValue<boolean>;
  }>;
  holiday: Optional<{
    urlaubAktiv: StoreValue<boolean>;
  }>;
  windowGlobal: Optional<{
    fensterOffen: StoreValue<boolean>;
  }>;
}

export const iobrokerData = [
  {
    channel: "system",
    value: [
      { id: "proxmox.0.lxc.iobroker.mem", key: "ramIoBrokerLxc", invertValue: true },
      { id: "proxmox.0.lxc.iobroker.mem_lev", key: "ramLevIoBrokerLxc" },
    ],
  },
  {
    channel: "trash",
    value: [{ id: "trashschedule.0.type.json", key: "json" }],
  },
  {
    channel: "alexaLists",
    value: [
      { id: "alexa-shoppinglist.0.list_activ", key: "shoppingListActive" },
      { id: "alexa-shoppinglist.1.list_activ", key: "michaelsTodoList" },
    ],
  },
  {
    channel: "time",
    value: [
      {
        id: "0_userdata.0.Rolladen.Zeit_Rollade_auto_herunter",
        key: "sonnenuntergang",
      },
    ],
  },
  {
    channel: "holiday",
    value: [{ id: "0_userdata.0.Urlaub.Urlaub_aktiv", key: "urlaubAktiv" }],
  },
  {
    channel: "windowGlobal",
    value: [{ id: "0_userdata.0.Fenster.Sind_Fenster_offen", key: "fensterOffen" }],
  },
] as const satisfies readonly IobrokerSubscription[];
