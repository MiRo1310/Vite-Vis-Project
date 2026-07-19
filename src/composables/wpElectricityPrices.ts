import { computed } from "vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";

const { iobroker } = useIobrokerStore();

export const priceKW = 0.32;

export const wpElectricityPrices = computed(() =>
  ((iobroker.wattPilot.totalCharging.value / 1000 - iobroker.wattPilot.totalChargingFromGrid.value) * priceKW).toFixed(2),
);

export const wpElectricityGridPrice = computed(() => (iobroker.wattPilot.totalChargingFromGrid.value * priceKW).toFixed(2));
