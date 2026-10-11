export function reloadWhenHidden(reload: () => void = () => window.location.reload()): void {
  const tryReload = () => {
    if (!document.hidden) {
      return;
    }
    document.removeEventListener("visibilitychange", tryReload);
    reload();
  };

  if (document.hidden) {
    tryReload();
    return;
  }

  document.addEventListener("visibilitychange", tryReload);
}
