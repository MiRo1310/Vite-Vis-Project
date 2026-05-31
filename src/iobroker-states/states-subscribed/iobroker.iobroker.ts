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
    value: IdForChannel<IobrokerChannels[C]>[];
  };
}[keyof IobrokerChannels];

export interface IobrokerChannels {
  system: {
    ramIoBrokerLxc: StoreValue<string>;
    ramLevIoBrokerLxc: StoreValue<string>;
  };
  trash: {
    json: StoreValue<string>;
  };
  channel: {
    test: {
      json: StoreValue<string>;
    };
  };
}

const iobrokerSystem = {
  channel: "system",
  value: [
    { id: "proxmox.0.lxc.iobroker.mem", key: "ramIoBrokerLxc", invertValue: true },
    { id: "proxmox.0.lxc.iobroker.mem_lev", key: "ramLevIoBrokerLxc" },
  ],
} satisfies IobrokerSubscription;

const trash = {
  channel: "trash",
  value: [{ id: "trashschedule.0.type.json", key: "json" }],
} satisfies IobrokerSubscription;

const test = {
  channel: "channel",
  value: [{ id: "trashschedule.0.type.json", key: "json", group: "test" }],
} satisfies IobrokerSubscription;

export const iobrokerData = [iobrokerSystem, trash, test] as const satisfies readonly IobrokerSubscription[];
