import { computed } from "vue";
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

const { iobroker } = useIobrokerStore();

type ValueLike<T> = { value: T; ts?: number };

type BatteryItem = {
  percent?: ValueLike<number>;
  lowBat?: ValueLike<boolean>;
  available?: ValueLike<boolean>;
  voltage?: ValueLike<number>;
  firmware?: ValueLike<boolean>;
};

// eslint-disable-next-line complexity
const getTimestamp = (item: BatteryItem): number =>
  item.percent?.ts ?? item.lowBat?.ts ?? item.available?.ts ?? item.voltage?.ts ?? item.firmware?.ts ?? 0;

const getFirmware = (item: BatteryItem): boolean => item.firmware?.value ?? false;

const getXioamiValues = (item: BatteryItem): { available: boolean; percent: number; voltage: number } => ({
  available: item.available?.value ?? false,
  percent: item.percent?.value ?? 0,
  voltage: item.voltage?.value ?? 0,
});

function getBatteryList(list: Record<string, Partial<BatteryItem>>) {
  const data: BatteryTableData[] = [];
  Object.keys(list).forEach((key) => {
    const item = list[key];
    const batteryItem = item as BatteryItem;
    const { available, percent, voltage } = getXioamiValues(batteryItem);
    data.push({
      name: key,
      firmware: getFirmware(batteryItem),
      timestamp: getTimestamp(batteryItem),
      lowBat: batteryItem.lowBat?.value ?? false,
      available,
      percent,
      voltage,
    });
  });
  return data;
}

export const batteryList = computed(() => {
  return getBatteryList(iobroker.batteries);
});
