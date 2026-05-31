import { computed } from "vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";

const { iobroker } = useIobrokerStore();

//TODO Test schreiben

export const getOpenWindows = computed(() => {
  const windows = iobroker.fenster;
  if (!windows) {
    return 0;
  }
  return Object.keys(windows).reduce((prev, current) => {
    prev += windows[current as keyof typeof windows]?.val === true ? 1 : 0;
    return prev;
  }, 0);
});
