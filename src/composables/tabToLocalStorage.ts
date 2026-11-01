import { ref } from "vue";
import { typedStorage } from "@/lib/local-storage.ts";

export const tabToLocalStorage = ({ defaultTab, id }: { defaultTab?: string; id: string }) => {
  const active = ref(fromLocalStorage(id) ?? defaultTab);

  const click = (tab: string) => {
    toLocalStorage(tab, id);
    active.value = tab;
  };

  return { activeTab: active, clickTab: click };
};

function fromLocalStorage(id: string): string | undefined {
  return typedStorage.getItem("active-tab")[id];
}

function toLocalStorage(value: string, id: string): void {
  const parsed = typedStorage.getItem("active-tab");
  parsed[id] = value;
  typedStorage.setItem("active-tab", parsed);
}
