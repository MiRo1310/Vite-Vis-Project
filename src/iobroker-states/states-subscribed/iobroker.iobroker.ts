import { StoreValue } from "@/store";

export interface Ids<TData, SubKey = string> {
  id: string;
  key: keyof TData;
  subKey?: SubKey;
  invertValue?: boolean; // if true, the value(boolean) will be inverted
}

export interface IdToSubscribeInIobroker<TData, SubKey = string> {
  value: Ids<TData, SubKey>[];
  channel: keyof IobrokerChannels;
}

export interface IobrokerChannels {
  system: IobrokerData;
}

interface IobrokerData {
  ramIoBrokerLxc: StoreValue<string>;
  ramLevIoBrokerLxc: StoreValue<string>;
}

const iobrokerSystem: IdToSubscribeInIobroker<IobrokerData> = {
  channel: "system",
  value: [
    { id: "proxmox.0.lxc.iobroker.mem", key: "ramIoBrokerLxc" },
    { id: "proxmox.0.lxc.iobroker.mem_lev", key: "ramLevIoBrokerLxc" },
  ],
};

export const iobrokerData: IdToSubscribeInIobroker<any>[] = [iobrokerSystem];
