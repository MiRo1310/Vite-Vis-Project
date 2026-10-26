import { type RouterReloadRetry } from "@/types/types.ts";

interface StorageTypes {
  autoUpdate: boolean;
  deviceId: string | null;
  routerReload: RouterReloadRetry;
}

const typedLocalStorage = () => {
  const defaultValues: StorageTypes = {
    autoUpdate: true,
    deviceId: null,
    routerReload: { to: null, attempt: 0 },
  };

  function getItem<K extends keyof StorageTypes>(key: K): StorageTypes[K] {
    const value = localStorage.getItem(key);
    if (!value) {
      return defaultValues[key];
    }

    try {
      return JSON.parse(value) as StorageTypes[K];
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("Error local storage parsing: ", e);
      return defaultValues[key];
    }
  }

  function setItem<K extends keyof StorageTypes>(key: K, value: StorageTypes[K]): StorageTypes[K] {
    localStorage.setItem(key, JSON.stringify(value));
    return value;
  }

  return { getItem, setItem };
};

export const typedStorage = typedLocalStorage();
