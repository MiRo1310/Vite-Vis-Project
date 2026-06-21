import { computed } from "vue";
import { getStoreValNumber } from "@/lib/object.ts";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";

const { iobroker } = useIobrokerStore();

const priceKW = 0.32;

export const wattpilotElectricitySurplus = computed(() => ((getStoreValNumber(iobroker.wattPilot?.totalCharging) / 1000) * priceKW).toFixed(2));
