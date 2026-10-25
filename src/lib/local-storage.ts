interface StorageTypes {
  autoUpdate: boolean;
  deviceId: string | null;
}

const typedLocalStorage = () => {
  const defaultValues: StorageTypes = {
    autoUpdate: true,
    deviceId: null,
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

  function setItem<K extends keyof StorageTypes>(key: K, value: StorageTypes[K]): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  return { getItem, setItem };
};

export const typedStorage = typedLocalStorage();
