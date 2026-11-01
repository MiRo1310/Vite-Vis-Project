import { computed } from "vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { countTrue } from "@/lib/boolean.ts";

const { iobroker } = useIobrokerStore();

export const getOpenWindows = computed(() => countTrue(iobroker.fenster));

export const getActiveLights = computed((): number => {
  const { lights, lightsAdditive } = iobroker;
  return countTrue(lights, lightsAdditive);
});
