import { typedStorage } from "@/lib/local-storage.ts";

export function reloadWhenHidden(reload: () => void = () => window.location.reload()): void {
  if (typedStorage.getItem("autoUpdate")) {
    const tryReload = () => {
      if (!typedStorage.getItem("autoUpdate")) {
        removeEventListener();
        return;
      }

      if (!document.hidden) {
        return;
      }
      removeEventListener();

      reload();
    };

    function removeEventListener() {
      document.removeEventListener("visibilitychange", tryReload);
    }

    if (document.hidden) {
      tryReload();
      return;
    }

    document.addEventListener("visibilitychange", tryReload);
  }
}
