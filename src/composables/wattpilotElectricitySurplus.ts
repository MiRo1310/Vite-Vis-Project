import { computed } from "vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";

const { iobroker } = useIobrokerStore();

export const priceKW = 0.32;

export const wattpilotElectricitySurplus = computed(() => ((iobroker.wattPilot.totalCharging.value / 1000) * priceKW).toFixed(2));
