import { IdToSubscribe } from "@/types.ts";
import { StoreValue } from "@/store/iobrokerStore.ts";

export interface BatteriesType {
  "Shelly Plus Smoke Flur OG": { percent: StoreValue<number>, firmware: StoreValue<boolean> };
  "HMIP Flur": { lowBat: StoreValue<boolean> };
  "HMIP Wohnzimmer links": { lowBat: StoreValue<boolean> };
  "HMIP Wohnzimmer rechts": { lowBat: StoreValue<boolean> };
  "HMIP Kueche": { lowBat: StoreValue<boolean> };
  "HMIP Esszimmer": { lowBat: StoreValue<boolean> };
  "HMIP Bad": { lowBat: StoreValue<boolean> };
  "HMIP Gaeste WC": { lowBat: StoreValue<boolean> };
  "HMIP Keller Waschen": { lowBat: StoreValue<boolean> };
  "HMIP Buero": { lowBat: StoreValue<boolean> };
  "HMIP Schlafzimmer": { lowBat: StoreValue<boolean> };
  "HMIP Kinderzimmer": { lowBat: StoreValue<boolean> };
  "HMIP Gaestezimmer": { lowBat: StoreValue<boolean> };
}

export const batteryIds: IdToSubscribe<BatteriesType> = {
  objectNameInStore: "batteries",
  value: [
    {
      id: "shelly.0.shellyplussmoke#a0a3b3e60d84#1.DevicePower0.BatteryVoltage",
      firstKey: "Shelly Plus Smoke Flur OG",
      secondKey: "voltage"
    },
    {
      id: "shelly.0.shellyplussmoke#a0a3b3e60d84#1.DevicePower0.BatteryPercent",
      firstKey: "Shelly Plus Smoke Flur OG",
      timestamp: true,
      secondKey: "percent"
    },
    {
      id: "shelly.0.shellyplussmoke#a0a3b3e60d84#1.firmware",
      firstKey: "Shelly Plus Smoke Flur OG",
      secondKey: "firmware"
    },
    {
      id: "hmip.0.devices.3014F711A000201A499E347E.channels.0.lowBat",
      firstKey: "HMIP Flur",
      timestamp: true,
      secondKey: "lowBat"
    },
    {
      id: "hmip.0.devices.3014F711A000201A499E3491.channels.0.lowBat",
      firstKey: "HMIP Wohnzimmer links",
      timestamp: true,
      secondKey: "lowBat"
    }, {
      id: "hmip.0.devices.3014F711A000201A49A55C21.channels.0.lowBat",
      firstKey: "HMIP Wohnzimmer rechts",
      timestamp: true,
      secondKey: "lowBat"
    },
    {
      id: "hmip.0.devices.3014F711A000201A499E49C4.channels.0.lowBat",
      firstKey: "HMIP Kueche",
      timestamp: true,
      secondKey: "lowBat"
    },
    {
      id: "hmip.0.devices.3014F711A000201A499E4A06.channels.0.lowBat",
      firstKey: "HMIP Gaeste WC",
      timestamp: true,
      secondKey: "lowBat"
    }, {
      id: "hmip.0.devices.3014F711A000201A49A55AF0.channels.0.lowBat",
      firstKey: "HMIP Esszimmer",
      timestamp: true,
      secondKey: "lowBat"
    },
    {
      id: "hmip.0.devices.3014F711A000201A49A55A77.channels.0.lowBat",
      firstKey: "HMIP Bad",
      timestamp: true,
      secondKey: "lowBat"
    },
    {
      id: "hmip.0.devices.3014F711A000201A49A55AEF.channels.0.lowBat",
      firstKey: "HMIP Schlafzimmer",
      timestamp: true,
      secondKey: "lowBat"
    }, {
      id: "hmip.0.devices.3014F711A000201A49A55C2A.channels.0.lowBat",
      firstKey: "HMIP Gaestezimmer",
      timestamp: true,
      secondKey: "lowBat"
    },
    {
      id: "hmip.0.devices.3014F711A000201A49A55E2C.channels.0.lowBat",
      firstKey: "HMIP Kinderzimmer",
      timestamp: true,
      secondKey: "lowBat"
    },
    {
      id: "hmip.0.devices.3014F711A000201A49A55C1D.channels.0.lowBat",
      firstKey: "HMIP Keller Waschen",
      timestamp: true,
      secondKey: "lowBat"
    },
    {
      id: "hmip.0.devices.3014F711A000201A49A55C45.channels.0.lowBat",
      firstKey: "HMIP Buero",
      timestamp: true,
      secondKey: "lowBat"
    }

  ]
};