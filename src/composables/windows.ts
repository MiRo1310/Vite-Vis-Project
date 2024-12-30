import { computed } from "vue";
import { StoreValue, useIobrokerStore } from "@/store/iobrokerStore";
import { storeToRefs } from "pinia";
import { WindowType } from "@/types/types.ts";

const { fenster } = storeToRefs(useIobrokerStore());


export const getWindowInfos = () => {

  const possibleSettings = ["fenster", "tuer", "ecke", "links", "mittig", "rechts", "flurFenster"];

  const getOpenWindows = computed(() => {
    let countedOpenWindows = 0;
    const win = fenster.value;
    Object.keys(win).forEach(key => {

      possibleSettings.forEach(window => {

        if ((win[key as keyof WindowType][window as keyof typeof win[keyof typeof win]] as StoreValue<any>)?.val) {
          countedOpenWindows++;
        }

      });

    });
    return countedOpenWindows;
  });
  return { getOpenWindows };
};