import { computed } from "vue";
import { batteryIds, HMIPDevice, ShellyPlusSmoke, XiaomiWindowSensor } from "@/subscribeIds/batteriesType.ts";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import { useDynamicSubscribe } from "@/composables/dynamicSubscribe.ts";

useDynamicSubscribe([batteryIds]);

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

export const batteryList = computed(() => {
  const data: BatteryTableData[] = [];
  Object.keys(batteries).forEach((key) => {
    const item = batteries[key as keyof typeof batteries];
    const timestamp = "percent" in item ? item.percent?.ts : "lowBat" in item ? item.lowBat?.ts : 0;
    data.push({
      name: key,
      firmware: (item as ShellyPlusSmoke)?.firmware?.val ?? false,
      timestamp,
      lowBat: (item as HMIPDevice)?.lowBat?.val ?? false,
      available: (item as XiaomiWindowSensor)?.available?.val ?? false,
      percent: (item as XiaomiWindowSensor)?.percent?.val ?? 0,
      voltage: (item as XiaomiWindowSensor)?.voltage?.val ?? 0,
    });
  });
  return data;
});
