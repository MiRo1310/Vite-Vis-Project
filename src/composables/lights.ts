import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { computed } from "vue";

const { iobroker } = useIobrokerStore();
export const getActiveLights = computed((): number => {
  const { lights, lightsAdditive } = iobroker;
  return Object.keys(lights).reduce((prev, current): number => {
    const value = current in lights ? lights[current as keyof typeof lights].val : false;
    const isAdditive = current in lightsAdditive ? lightsAdditive[current as keyof typeof lightsAdditive].val : value;
    prev += (isAdditive ?? value) ? 1 : 0;
    return prev;
  }, 0);
});
