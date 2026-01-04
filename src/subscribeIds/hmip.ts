import { StoreValue } from "@/store/iobrokerStore.ts";
import { IdToSubscribe } from "@/types/types.ts";

export interface Hmip {
  children_valvePosition: StoreValue<number>;
  children_valveActualTemp: StoreValue<number>;
}

export const hmipIds: IdToSubscribe<Hmip> = {
  storeFolder: "hmip",
  value: [
    { id: "hmip.0.devices.3014F711A000201A49A55E2C.channels.1.valveActualTemperature", key: "children_valveActualTemp" },
    { id: "hmip.0.devices.3014F711A000201A49A55E2C.channels.1.valvePosition", key: "children_valvePosition" },
  ],
};
