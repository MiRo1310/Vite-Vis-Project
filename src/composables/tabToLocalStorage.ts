import { ref } from "vue";
import { Logger } from "@/lib/logger.ts";
const storageKey = "active-tab";

export const tabToLocalStorage = ({ defaultTab, id }: { defaultTab?: string; id: string }) => {
  const active = ref(fromLocalStorage(id) ?? defaultTab);

  const click = (tab: string) => {
    toLocalStorage(tab, id);
    active.value = tab;
  };

  return { activeTab: active, clickTab: click };
};

function toLocalStorage(value: string, id: string): void {
  const parsed = getParsedStorageValue<Record<string, string>>() ?? {};
  parsed[id] = value;
  localStorage.setItem(storageKey, JSON.stringify(parsed));
}

function fromLocalStorage(id: string): string | undefined {
  const parsed = getParsedStorageValue<Record<string, string>>();

  return parsed ? parsed[id] : undefined;
}

function getParsedStorageValue<T>(): undefined | T {
  const currentJson = localStorage.getItem(storageKey);
  if (currentJson) {
    try {
      return JSON.parse(currentJson);
    } catch (e) {
      Logger("TabParser", { e });
    }
  }
}
