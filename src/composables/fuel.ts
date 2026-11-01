import { computed } from "vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { getMaxE5Price } from "@/lib/fuel.ts";

const { iobroker } = useIobrokerStore();

export const getMostExpensiveFuelPrice = computed(() => getMaxE5Price(iobroker.tankerKoenig.jsonTable.parsed([])));
