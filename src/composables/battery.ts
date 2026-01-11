import { computed } from "vue";
import { HMIPDevice, ShellyPlusSmoke, XiaomiWindowSensor } from "@/subscribeIds/batteriesType.ts";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";

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

export const batteryList = computed(() => {
  const data: BatteryTableData[] = [];
  Object.keys(batteries).forEach((key) => {
    const item = batteries[key as keyof typeof batteries];
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
});
