import { computed } from "vue";
import { useIobrokerStore } from "@/store/iobrokerStore";
import { storeToRefs } from "pinia";
import { blinds0, blinds10, blinds100, blinds20, blinds30, blinds40, blinds50, blinds60, blinds70, blinds80, blinds90 } from "@/public";
import { isDefined } from "@vueuse/core";

const { fenster } = storeToRefs(useIobrokerStore());

export const getOpenWindows = computed(() => {
  const windows = fenster.value;
  return Object.keys(windows).reduce((prev, current) => {
    prev += windows[current as keyof typeof windows]?.val === true ? 1 : 0;
    return prev;
  }, 0);
});

export const getShutterImageByPosition = computed(() => (position: number | null) => {
  if (!isDefined(position)) {
    return blinds100;
  }
  if (position === 0) return blinds100;
  if (position <= 10) return blinds90;
  if (position <= 20) return blinds80;
  if (position <= 30) return blinds70;
  if (position <= 40) return blinds60;
  if (position <= 50) return blinds50;
  if (position <= 60) return blinds40;
  if (position <= 70) return blinds30;
  if (position <= 80) return blinds20;
  if (position <= 90) return blinds10;
  return blinds0;
});
