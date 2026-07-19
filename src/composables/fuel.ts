import { computed } from "vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";

const { iobroker } = useIobrokerStore();

export const getMostExpensiveFuelPrice = computed(() =>
  iobroker.tankerKoenig.jsonTable.parsed([]).reduce((max, current) => (current.e5 > max ? current.e5 : max), 0),
);
