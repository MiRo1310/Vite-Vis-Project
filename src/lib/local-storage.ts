import { Logger } from "@/lib/logger.ts";

interface StorageTypes {
  autoUpdate: boolean;
}

const typedLocalStorage = () => {
  const defaultValues: StorageTypes = {
    autoUpdate: true,
  };

  function getItem<K extends keyof StorageTypes>(key: K): StorageTypes[K] {
    const value = localStorage.getItem(key);
    if (!value) {
      return defaultValues[key];
    }

    try {
      return JSON.parse(value) as StorageTypes[K];
    } catch (e) {
      Logger(`Error parsing for storage key "${key}"`, { type: "error", e });
      return defaultValues[key];
    }
  }

  function setItem<K extends keyof StorageTypes>(key: K, value: StorageTypes[K]): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  return { getItem, setItem };
};

export const typedStorage = typedLocalStorage();
