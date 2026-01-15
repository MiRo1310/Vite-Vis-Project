import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { computed } from "vue";

const { lights, lightsAdditive } = useIobrokerStore();
export const getActiveLights = computed((): number => {
  return Object.keys(lights).reduce((prev, current): number => {
    const value = lights[current as keyof typeof lights]?.val;
    const isAdditive = lightsAdditive[current as keyof typeof lightsAdditive]?.val;
    prev += (isAdditive ?? value) ? 1 : 0;
    return prev;
  }, 0);
});
