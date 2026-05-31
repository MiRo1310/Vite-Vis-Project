import { computed } from "vue";
import { BatteriesTypeIobroker } from "../iobroker-states/states-subscribed/batteriesType.iobroker.ts";
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

type BatteryItem = {
  percent?: { ts?: number; val?: number };
  lowBat?: { ts?: number; val?: boolean };
  available?: { ts?: number; val?: boolean };
  voltage?: { ts?: number; val?: number };
  firmware?: { ts?: number; val?: boolean };
};

const getTimestamp = (item: BatteryItem): number =>
  item.percent?.ts ?? item.lowBat?.ts ?? item.available?.ts ?? item.voltage?.ts ?? item.firmware?.ts ?? 0;

const getFirmware = (item: BatteryItem): boolean => item?.firmware?.val ?? false;

const getXioamiValues = (item: BatteryItem): { available: boolean; percent: number; voltage: number } => ({
  available: item?.available?.val ?? false,
  percent: item?.percent?.val ?? 0,
  voltage: item?.voltage?.val ?? 0,
});

function getBatteryList(list: BatteriesTypeIobroker) {
  const data: BatteryTableData[] = [];
  Object.keys(list).forEach((key) => {
    const item = list[key as keyof typeof list];
    const batteryItem = item as BatteryItem;
    const { available, percent, voltage } = getXioamiValues(batteryItem);
    data.push({
      name: key,
      firmware: getFirmware(batteryItem),
      timestamp: getTimestamp(batteryItem),
      lowBat: batteryItem.lowBat?.val ?? false,
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
