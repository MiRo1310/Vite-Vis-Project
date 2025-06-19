import { IdToSubscribe } from "@/types/types.ts";
import { StoreValue } from "@/store/iobrokerStore.ts";

export interface XiaomiWindowSensor {
  percent: StoreValue<number>;
  available: StoreValue<boolean>;
  voltage: StoreValue<number>;
  ts: number;
}

export interface HMIPDevice {
  lowBat: StoreValue<boolean>;
  available: StoreValue<boolean>;
  ts: number;
}

export interface ShellyPlusSmoke {
  percent: StoreValue<number>;
  firmware: StoreValue<boolean>;
  ts: number;
}

export interface BatteriesType {
  "Shelly Plus Smoke Flur OG": ShellyPlusSmoke;
  "HMIP Flur": HMIPDevice;
  "HMIP Wohnzimmer links": HMIPDevice;
  "HMIP Wohnzimmer rechts": HMIPDevice;
  "HMIP Kueche": HMIPDevice;
  "HMIP Esszimmer": HMIPDevice;
  "HMIP Bad": HMIPDevice;
  "HMIP Gaeste WC": HMIPDevice;
  "HMIP Keller Waschen": HMIPDevice;
  "HMIP Buero": HMIPDevice;
  "HMIP Schlafzimmer": HMIPDevice;
  "HMIP Kinderzimmer": HMIPDevice;
  "HMIP Gaestezimmer": HMIPDevice;
  "Xioami Fensterkontakt Keller Tür": XiaomiWindowSensor;
  "Xioami Fensterkontakt Kellertreppe Flur": XiaomiWindowSensor;
  "Xioami Fensterkontakt Büro": XiaomiWindowSensor;
  "Xioami Fensterkontakt Haustür": XiaomiWindowSensor;
  "Xioami Fensterkontakt Flur rechts": XiaomiWindowSensor;
  "Xioami Fensterkontakt Flur links": XiaomiWindowSensor;
  "Xioami Fensterkontakt Gäste WC links": XiaomiWindowSensor;
  "Xioami Fensterkontakt Gäste WC rechts": XiaomiWindowSensor;
  "Xioami Fensterkontakt Küche Klingel": XiaomiWindowSensor;
  "Xioami Fensterkontakt Küche Fenster": XiaomiWindowSensor;
  "Xioami Fensterkontakt Küche Tür": XiaomiWindowSensor;
  "Xioami Fensterkontakt Abstellraum": XiaomiWindowSensor;
  "Xioami Fensterkontakt Esszimmer rechts": XiaomiWindowSensor;
  "Xioami Fensterkontakt Esszimmer links": XiaomiWindowSensor;
  "Xioami Fensterkontakt Wohnzimmer rechts": XiaomiWindowSensor;
  "Xioami Fensterkontakt Wohnzimmer mitte": XiaomiWindowSensor;
  "Xioami Fensterkontakt Wohnzimmer links": XiaomiWindowSensor;
  "Xioami Fensterkontakt Wohnzimmer klein": XiaomiWindowSensor;
  "Xioami Fensterkontakt Badezimmer": XiaomiWindowSensor;
  "Xioami Fensterkontakt Gästezimmer": XiaomiWindowSensor;
  "Xioami Fensterkontakt Schlafen Tür": XiaomiWindowSensor;
  "Xioami Fensterkontakt Schlafen Fenster": XiaomiWindowSensor;
  "Xioami Fensterkontakt Kinderzimmer": XiaomiWindowSensor;
  "Xioami Fensterkontakt Abstellraum OG rechts": XiaomiWindowSensor;
  "Xioami Fensterkontakt Abstellraum OG links": XiaomiWindowSensor;
  "Xioami Fensterkontakt Dachboden rechts": XiaomiWindowSensor;
  "Xioami Fensterkontakt Dachboden links": XiaomiWindowSensor;
}

const batteryIds: IdToSubscribe<BatteriesType> = {
  storeFolder: "batteries",
  value: [
    {
      id: "shelly.0.shellyplussmoke#a0a3b3e60d84#1.DevicePower0.BatteryVoltage",
      key: "Shelly Plus Smoke Flur OG",
      secondKey: "voltage",
    },
    {
      id: "shelly.0.shellyplussmoke#a0a3b3e60d84#1.DevicePower0.BatteryPercent",
      key: "Shelly Plus Smoke Flur OG",
      timestamp: true,
      secondKey: "percent",
    },
    {
      id: "shelly.0.shellyplussmoke#a0a3b3e60d84#1.firmware",
      key: "Shelly Plus Smoke Flur OG",
      secondKey: "firmware",
    },
  ],
};
const HMIP: { name: keyof BatteriesType; id: string }[] = [
  { name: "HMIP Buero", id: "hmip.0.devices.3014F711A000201A49A55C45" },
  {
    name: "HMIP Keller Waschen",
    id: "hmip.0.devices.3014F711A000201A49A55C1D",
  },
  { name: "HMIP Flur", id: "hmip.0.devices.3014F711A000201A499E347E" },
  { name: "HMIP Gaeste WC", id: "hmip.0.devices.3014F711A000201A49A55A77" },
  { name: "HMIP Kueche", id: "hmip.0.devices.3014F711A000201A499E49C4" },
  { name: "HMIP Esszimmer", id: "hmip.0.devices.3014F711A000201A49A55AF0" },
  {
    name: "HMIP Wohnzimmer links",
    id: "hmip.0.devices.3014F711A000201A499E3491",
  },
  {
    name: "HMIP Wohnzimmer rechts",
    id: "hmip.0.devices.3014F711A000201A49A55C21",
  },
  { name: "HMIP Bad", id: "hmip.0.devices.3014F711A000201A49A55A77" },
  { name: "HMIP Schlafzimmer", id: "hmip.0.devices.3014F711A000201A49A55AEF" },
  { name: "HMIP Kinderzimmer", id: "hmip.0.devices.3014F711A000201A49A55E2C" },
  { name: "HMIP Gaestezimmer", id: "hmip.0.devices.3014F711A000201A49A55C2A" },
];

const zigbeeWindowDevices: { name: keyof BatteriesType; id: string }[] = [
  { name: "Xioami Fensterkontakt Keller Tür", id: "zigbee.0.00158d00045efc35" },
  {
    name: "Xioami Fensterkontakt Kellertreppe Flur",
    id: "zigbee.0.00158d0002e3425d",
  },
  { name: "Xioami Fensterkontakt Büro", id: "zigbee.0.00158d0003cb431e" },
  { name: "Xioami Fensterkontakt Haustür", id: "zigbee.0.00158d00049fd9ee" },
  {
    name: "Xioami Fensterkontakt Flur rechts",
    id: "zigbee.0.00158d000477309a",
  },
  { name: "Xioami Fensterkontakt Flur links", id: "zigbee.0.00158d00047e796c" },
  {
    name: "Xioami Fensterkontakt Gäste WC links",
    id: "zigbee.0.00158d00047e7a16",
  },
  {
    name: "Xioami Fensterkontakt Gäste WC rechts",
    id: "zigbee.0.00158d0004a03d10",
  },
  {
    name: "Xioami Fensterkontakt Küche Klingel",
    id: "zigbee.0.00158d0002ec5554",
  },
  {
    name: "Xioami Fensterkontakt Küche Fenster",
    id: "zigbee.0.00158d000431445a",
  },
  { name: "Xioami Fensterkontakt Küche Tür", id: "zigbee.0.00158d00047d0bcc" },
  {
    name: "Xioami Fensterkontakt Abstellraum",
    id: "zigbee.0.00158d0004773713",
  },
  {
    name: "Xioami Fensterkontakt Esszimmer rechts",
    id: "zigbee.0.00158d0002e3376c",
  },
  {
    name: "Xioami Fensterkontakt Esszimmer links",
    id: "zigbee.0.00158d000477238b",
  },
  {
    name: "Xioami Fensterkontakt Wohnzimmer rechts",
    id: "zigbee.0.00158d00047c617c",
  },
  {
    name: "Xioami Fensterkontakt Wohnzimmer mitte",
    id: "zigbee.0.00158d00047ebffb",
  },
  {
    name: "Xioami Fensterkontakt Wohnzimmer links",
    id: "zigbee.0.00158d00047d480e",
  },
  {
    name: "Xioami Fensterkontakt Wohnzimmer klein",
    id: "zigbee.0.00158d0004a02290",
  },
  { name: "Xioami Fensterkontakt Badezimmer", id: "zigbee.0.00158d00047d0d78" },
  {
    name: "Xioami Fensterkontakt Gästezimmer",
    id: "zigbee.0.00158d0004772546",
  },
  {
    name: "Xioami Fensterkontakt Schlafen Tür",
    id: "zigbee.0.00158d0004522184",
  },
  {
    name: "Xioami Fensterkontakt Schlafen Fenster",
    id: "zigbee.0.00158d0004a027ee",
  },
  {
    name: "Xioami Fensterkontakt Kinderzimmer",
    id: "zigbee.0.00158d0004a0224b",
  },
  {
    name: "Xioami Fensterkontakt Abstellraum OG rechts",
    id: "zigbee.0.00158d0004a0234e",
  },
  {
    name: "Xioami Fensterkontakt Abstellraum OG links",
    id: "zigbee.0.00158d0004772531",
  },
  {
    name: "Xioami Fensterkontakt Dachboden rechts",
    id: "zigbee.0.00158d0004314104",
  },
  {
    name: "Xioami Fensterkontakt Dachboden links",
    id: "zigbee.0.00158d00047d0db9",
  },
];

function addHMIPDevices() {
  for (const device of HMIP) {
    batteryIds.value.push(
      {
        id: `${device.id}.channels.0.lowBat`,
        key: `${device.name}`,
        timestamp: true,
        secondKey: "lowBat",
      },
      {
        id: `${device.id}.channels.0.unreach`,
        key: `${device.name}`,
        revertValue: true,
        secondKey: "available",
      },
    );
  }
}

function addZigbeeWindowDevices() {
  for (const device of zigbeeWindowDevices) {
    batteryIds.value.push(
      {
        id: `${device.id}.battery`,
        key: `${device.name}`,
        timestamp: true,
        secondKey: "percent",
      },
      {
        id: `${device.id}.voltage`,
        key: `${device.name}`,
        secondKey: "voltage",
      },
      {
        id: `${device.id}.available`,
        key: `${device.name}`,
        secondKey: "available",
      },
    );
  }
}

addHMIPDevices();
addZigbeeWindowDevices();

export { batteryIds };
