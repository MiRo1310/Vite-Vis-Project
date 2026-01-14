import { StoreValue } from "@/store/ioBrokerStore.ts";
import { IdToSubscribe } from "@/types/types.ts";

export interface Hmip {
  children_valvePosition: StoreValue<number>;
  children_valveActualTemp: StoreValue<number>;

  floor_valvePosition: StoreValue<number>;
  floor_valveActualTemp: StoreValue<number>;

  living_right_valvePosition: StoreValue<number>;
  living_right_valveActualTemp: StoreValue<number>;

  living_left_valvePosition: StoreValue<number>;
  living_left_valveActualTemp: StoreValue<number>;

  kitchen_valvePosition: StoreValue<number>;
  kitchen_valveActualTemp: StoreValue<number>;

  guest_wc_valvePosition: StoreValue<number>;
  guest_wc_valveActualTemp: StoreValue<number>;

  bath_valvePosition: StoreValue<number>;
  bath_valveActualTemp: StoreValue<number>;

  sleeping_valvePosition: StoreValue<number>;
  sleeping_valveActualTemp: StoreValue<number>;

  dining_valvePosition: StoreValue<number>;
  dining_valveActualTemp: StoreValue<number>;

  washing_valvePosition: StoreValue<number>;
  washing_valveActualTemp: StoreValue<number>;

  guest_valvePosition: StoreValue<number>;
  guest_valveActualTemp: StoreValue<number>;

  office_valvePosition: StoreValue<number>;
  office_valveActualTemp: StoreValue<number>;
}

export const hmipIds: IdToSubscribe<Hmip> = {
  storeFolder: "hmip",
  value: [
    { id: "hmip.0.devices.3014F711A000201A49A55E2C.channels.1.valveActualTemperature", key: "children_valveActualTemp" },
    { id: "hmip.0.devices.3014F711A000201A49A55E2C.channels.1.valvePosition", key: "children_valvePosition" },

    { id: "hmip.0.devices.3014F711A000201A499E347E.channels.1.valveActualTemperature", key: "floor_valveActualTemp" },
    { id: "hmip.0.devices.3014F711A000201A499E347E.channels.1.valvePosition", key: "floor_valvePosition" },

    { id: "hmip.0.devices.3014F711A000201A49A55C21.channels.1.valveActualTemperature", key: "living_right_valveActualTemp" },
    { id: "hmip.0.devices.3014F711A000201A49A55C21.channels.1.valvePosition", key: "living_right_valvePosition" },

    { id: "hmip.0.devices.3014F711A000201A499E3491.channels.1.valveActualTemperature", key: "living_left_valveActualTemp" },
    { id: "hmip.0.devices.3014F711A000201A499E3491.channels.1.valvePosition", key: "living_left_valvePosition" },

    { id: "hmip.0.devices.3014F711A000201A499E49C4.channels.1.valveActualTemperature", key: "kitchen_valveActualTemp" },
    { id: "hmip.0.devices.3014F711A000201A499E49C4.channels.1.valvePosition", key: "kitchen_valvePosition" },

    { id: "hmip.0.devices.3014F711A000201A499E4A06.channels.1.valveActualTemperature", key: "guest_wc_valveActualTemp" },
    { id: "hmip.0.devices.3014F711A000201A499E4A06.channels.1.valvePosition", key: "guest_wc_valvePosition" },

    { id: "hmip.0.devices.3014F711A000201A49A55A77.channels.1.valveActualTemperature", key: "bath_valveActualTemp" },
    { id: "hmip.0.devices.3014F711A000201A49A55A77.channels.1.valvePosition", key: "bath_valvePosition" },

    { id: "hmip.0.devices.3014F711A000201A49A55AEF.channels.1.valveActualTemperature", key: "sleeping_valveActualTemp" },
    { id: "hmip.0.devices.3014F711A000201A49A55AEF.channels.1.valvePosition", key: "sleeping_valvePosition" },

    { id: "hmip.0.devices.3014F711A000201A49A55AF0.channels.1.valveActualTemperature", key: "dining_valveActualTemp" },
    { id: "hmip.0.devices.3014F711A000201A49A55AF0.channels.1.valvePosition", key: "dining_valvePosition" },

    { id: "hmip.0.devices.3014F711A000201A49A55C1D.channels.1.valveActualTemperature", key: "washing_valveActualTemp" },
    { id: "hmip.0.devices.3014F711A000201A49A55C1D.channels.1.valvePosition", key: "washing_valvePosition" },

    { id: "hmip.0.devices.3014F711A000201A49A55C2A.channels.1.valveActualTemperature", key: "guest_valveActualTemp" },
    { id: "hmip.0.devices.3014F711A000201A49A55C2A.channels.1.valvePosition", key: "guest_valvePosition" },

    { id: "hmip.0.devices.3014F711A000201A49A55C45.channels.1.valveActualTemperature", key: "office_valveActualTemp" },
    { id: "hmip.0.devices.3014F711A000201A49A55C45.channels.1.valvePosition", key: "office_valvePosition" },
  ],
};
