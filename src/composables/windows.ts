import { computed } from "vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { storeToRefs } from "pinia";

const { fenster } = storeToRefs(useIobrokerStore());

//TODO Test schreiben

export const getOpenWindows = computed(() => {
  const windows = fenster.value;
  return Object.keys(windows).reduce((prev, current) => {
    prev += windows[current as keyof typeof windows]?.val === true ? 1 : 0;
    return prev;
  }, 0);
});
