import type { StoreValue } from "@/store";

export interface Ids<TData, SubKey = string> {
  id: string;
  key: keyof TData;
  subKey?: SubKey;
  invertValue?: boolean; // if true, the value(boolean) will be inverted
}

export type IobrokerSubscription = {
  [C in keyof IobrokerChannels]: {
    channel: C;
    value: Ids<IobrokerChannels[C]>[];
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
}

const iobrokerSystem = {
  channel: "system",
  value: [
    { id: "proxmox.0.lxc.iobroker.mem", key: "ramIoBrokerLxc", invertValue: true },
    { id: "proxmox.0.lxc.iobroker.mem_lev", key: "ramLevIoBrokerLxc" },
  ],
} satisfies IobrokerSubscription;

export const trash = {
  channel: "trash",
  value: [{ id: "trashschedule.0.type.json", key: "json" }],
} satisfies IobrokerSubscription;

export const iobrokerData = [iobrokerSystem, trash] as const satisfies readonly IobrokerSubscription[];
