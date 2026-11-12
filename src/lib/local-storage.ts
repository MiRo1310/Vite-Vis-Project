import { type RouterReloadRetry } from "@/types/types.ts";
import { deepCopy, isDefined } from "@/lib/utilities.ts";
import type { TRecipe } from "@/store";
import { Logger } from "@/lib/logger.ts";

interface StorageTypes {
  autoUpdate: boolean;
  deviceId: string | null;
  routerReload: RouterReloadRetry;
  lastRecipes: TRecipe[];
  "active-tab": Record<string, string>;
  activeYear: number | undefined;
}

const typedLocalStorage = () => {
  const defaultValues: StorageTypes = {
    autoUpdate: true,
    deviceId: null,
    routerReload: { to: null, attempt: 0, triedNavigateToHome: false },
    lastRecipes: [] as TRecipe[],
    "active-tab": {},
    activeYear: undefined,
  };

  function getItem<K extends keyof StorageTypes>(key: K): StorageTypes[K] {
    const value = localStorage.getItem(key);
    if (!value) {
      return deepCopy(defaultValues[key]) as StorageTypes[K];
    }

    try {
      const parsedValue = JSON.parse(value);
      return (isDefined(parsedValue) ? parsedValue : deepCopy(defaultValues[key])) as StorageTypes[K];
    } catch (e) {
      Logger.error("Error local storage parsing", e);
      return deepCopy(defaultValues[key]) as StorageTypes[K];
    }
  }

  function setItem<K extends keyof StorageTypes>(key: K, value: StorageTypes[K]): StorageTypes[K] {
    localStorage.setItem(key, JSON.stringify(value));
    return value;
  }

  return { getItem, setItem };
};

export const typedStorage = typedLocalStorage();
