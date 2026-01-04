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
  xioami_cellar_door: XiaomiWindowSensor;
  xioami_cellar_stair_window: XiaomiWindowSensor;
  xioami_office_window: XiaomiWindowSensor;
  xioami_housedoor_right: XiaomiWindowSensor;
  xioami_floor_right: XiaomiWindowSensor;
  xioami_floor_left: XiaomiWindowSensor;
  xioami_guest_toilet_left: XiaomiWindowSensor;
  xioami_guest_toilet_right: XiaomiWindowSensor;
  xioami_fensterkontakt_kueche_klingel: XiaomiWindowSensor;
  xioami_kitchen_window: XiaomiWindowSensor;
  xioami_kitchen_door: XiaomiWindowSensor;
  xioami_store_window: XiaomiWindowSensor;
  xioami_diner_window_right: XiaomiWindowSensor;
  xioami_diner_window_left: XiaomiWindowSensor;
  xioami_living_right: XiaomiWindowSensor;
  xioami_living_center: XiaomiWindowSensor;
  xioami_living_left: XiaomiWindowSensor;
  xioami_living_small: XiaomiWindowSensor;
  xioami_bath_window: XiaomiWindowSensor;
  xioami_guest_window: XiaomiWindowSensor;
  xioami_sleeping_door: XiaomiWindowSensor;
  xioami_sleeping_window: XiaomiWindowSensor;
  xioami_children_window: XiaomiWindowSensor;
  xioami_store_og_right: XiaomiWindowSensor;
  xioami_store_og_left: XiaomiWindowSensor;
  xioami_attic_right: XiaomiWindowSensor;
  xioami_attic_left: XiaomiWindowSensor;
}

const batteryIds: IdToSubscribe<BatteriesType> = {
  storeFolder: "batteries",
  value: [
    {
      id: "shelly.0.shellyplussmoke#a0a3b3e60d84#1.DevicePower0.BatteryVoltage",
      key: "Shelly Plus Smoke Flur OG",
      subKey: "voltage",
    },
    {
      id: "shelly.0.shellyplussmoke#a0a3b3e60d84#1.DevicePower0.BatteryPercent",
      key: "Shelly Plus Smoke Flur OG",
      subKey: "percent",
    },
    {
      id: "shelly.0.shellyplussmoke#a0a3b3e60d84#1.firmware",
      key: "Shelly Plus Smoke Flur OG",
      subKey: "firmware",
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
  { name: "xioami_cellar_door", id: "zigbee.0.00158d00045efc35" },
  {
    name: "xioami_cellar_stair_window",
    id: "zigbee.0.00158d0002e3425d",
  },
  { name: "xioami_office_window", id: "zigbee.0.00158d0003cb431e" },
  { name: "xioami_housedoor_right", id: "zigbee.0.00158d00049fd9ee" },
  {
    name: "xioami_floor_right",
    id: "zigbee.0.00158d000477309a",
  },
  { name: "xioami_floor_left", id: "zigbee.0.00158d00047e796c" },
  {
    name: "xioami_guest_toilet_left",
    id: "zigbee.0.00158d00047e7a16",
  },
  {
    name: "xioami_guest_toilet_right",
    id: "zigbee.0.00158d0004a03d10",
  },
  {
    name: "xioami_fensterkontakt_kueche_klingel",
    id: "zigbee.0.00158d0002ec5554",
  },
  {
    name: "xioami_kitchen_window",
    id: "zigbee.0.00158d000431445a",
  },
  { name: "xioami_kitchen_door", id: "zigbee.0.00158d00047d0bcc" },
  {
    name: "xioami_store_window",
    id: "zigbee.0.00158d0004773713",
  },
  {
    name: "xioami_diner_window_right",
    id: "zigbee.0.00158d0002e3376c",
  },
  {
    name: "xioami_diner_window_left",
    id: "zigbee.0.00158d000477238b",
  },
  {
    name: "xioami_living_right",
    id: "zigbee.0.00158d00047c617c",
  },
  {
    name: "xioami_living_center",
    id: "zigbee.0.00158d00047ebffb",
  },
  {
    name: "xioami_living_left",
    id: "zigbee.0.00158d00047d480e",
  },
  {
    name: "xioami_living_small",
    id: "zigbee.0.00158d0004a02290",
  },
  { name: "xioami_bath_window", id: "zigbee.0.00158d00047d0d78" },
  {
    name: "xioami_guest_window",
    id: "zigbee.0.00158d0004772546",
  },
  {
    name: "xioami_sleeping_door",
    id: "zigbee.0.00158d0004522184",
  },
  {
    name: "xioami_sleeping_window",
    id: "zigbee.0.00158d0004a027ee",
  },
  {
    name: "xioami_children_window",
    id: "zigbee.0.00158d0004a0224b",
  },
  {
    name: "xioami_store_og_right",
    id: "zigbee.0.00158d0004a0234e",
  },
  {
    name: "xioami_store_og_left",
    id: "zigbee.0.00158d0004772531",
  },
  {
    name: "xioami_attic_right",
    id: "zigbee.0.00158d0004314104",
  },
  {
    name: "xioami_attic_left",
    id: "zigbee.0.00158d00047d0db9",
  },
];

function addHMIPDevices() {
  for (const device of HMIP) {
    batteryIds.value.push(
      {
        id: `${device.id}.channels.0.lowBat`,
        key: `${device.name}`,
        subKey: "lowBat",
      },
      {
        id: `${device.id}.channels.0.unreach`,
        key: `${device.name}`,
        invertValue: true,
        subKey: "available",
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
        subKey: "percent",
      },
      {
        id: `${device.id}.voltage`,
        key: `${device.name}`,
        subKey: "voltage",
      },
      {
        id: `${device.id}.available`,
        key: `${device.name}`,
        subKey: "available",
      },
    );
  }
}

addHMIPDevices();
addZigbeeWindowDevices();

export { batteryIds };
