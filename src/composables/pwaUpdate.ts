import { ref } from "vue";
import { reloadWhenHidden } from "@/lib/pwaUpdate.ts";

const usePwaUpdate = () => {
  const updateAvailable = ref(false);

  function notifyUpdate() {
    updateAvailable.value = true;
    reloadWhenHidden();
  }

  function applyUpdate() {
    window.location.reload();
  }
  return { notifyUpdate, applyUpdate, updateAvailable };
};

export const usePwaUpdateSingleton = usePwaUpdate();
