import { computed } from "vue";
import { BatteriesTypeIobroker, HMIPDevice, ShellyPlusSmoke, XiaomiWindowSensor } from "../subscribeIds/batteriesType.iobroker.ts";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";

export interface BatteryTableData {
  name: string;
  percent?: number;
  voltage?: number;
  lowBat?: boolean;
  firmware?: boolean;
  available?: boolean;
  timestamp?: number;
}

const { batteries } = useIobrokerStore();

const getTimestamp = (item: { percent?: { ts?: number }; lowBat?: { ts?: number } }): number =>
  "percent" in item ? (item.percent?.ts ?? 0) : "lowBat" in item ? (item.lowBat?.ts ?? 0) : 0;

const getFirmware = (item: ShellyPlusSmoke): boolean => item?.firmware?.val ?? false;

const getXioamiValues = (item: XiaomiWindowSensor): { available: boolean; percent: number; voltage: number } => ({
  available: item?.available?.val ?? false,
  percent: item?.percent?.val ?? 0,
  voltage: item?.voltage?.val ?? 0,
});

function getBatteryList(list: BatteriesTypeIobroker) {
  const data: BatteryTableData[] = [];
  Object.keys(list).forEach((key) => {
    const item = list[key as keyof typeof list];
    const { available, percent, voltage } = getXioamiValues(item as XiaomiWindowSensor);
    data.push({
      name: key,
      firmware: getFirmware(item as ShellyPlusSmoke),
      timestamp: getTimestamp(item),
      lowBat: (item as HMIPDevice)?.lowBat?.val ?? false,
      available,
      percent,
      voltage,
    });
  });
  return data;
}

export const batteryList = computed(() => {
  return getBatteryList(batteries);
});
