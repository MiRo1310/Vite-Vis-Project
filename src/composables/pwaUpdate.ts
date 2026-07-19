import { ref } from "vue";
import { reloadWhenHidden } from "@/lib/pwaUpdate.ts";

const usePwaUpdate = () => {
  const updateAvailable = ref(false);
  const updateTime = ref(new Date());
  const updateInterval = 15 * 60_000;

  function notifyUpdate() {
    updateAvailable.value = true;
    reloadWhenHidden();
  }

  function applyUpdate() {
    window.location.reload();
  }

  function setTime(date: Date) {
    updateTime.value = new Date(date.getTime() + updateInterval);
  }

  return { notifyUpdate, applyUpdate, updateAvailable, updateTime, setTime, updateInterval };
};

export const usePwaUpdateSingleton = usePwaUpdate();
