import { computed } from "vue";
import { useIobrokerStore } from "@/store/iobrokerStore";
import { storeToRefs } from "pinia";

const { fenster } = storeToRefs(useIobrokerStore());

export const getOpenWindows = computed(() => {
  let countedOpenWindows = 0;
  const windows = fenster.value;
  Object.keys(windows).forEach((key) => {
    if (windows[key as keyof typeof windows]?.val) {
      countedOpenWindows++;
    }
  });
  return countedOpenWindows;
});
