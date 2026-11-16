import { computed } from "vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { ioBrokerService } from "@/lib/io-broker-service.ts";
import { type AlexaList } from "@/types/types.ts";
import { formatShoppingItem, type ShoppingListItem, type ShoppingListSink } from "@/lib/shopping-list.ts";
import { wait } from "@/lib/time.ts";

/**
 * Einkaufsliste über ioBroker (alexa-shoppinglist).
 */
const ioBrokerShoppingListSink: ShoppingListSink = {
  isConnected: true,
  add: async (items: ShoppingListItem[]): Promise<void> => {
    const { iobroker } = useIobrokerStore();
    const state = iobroker.alexa.addNewShoppingListItem;
    for (const [index, item] of items.entries()) {
      state.setState(formatShoppingItem(item), false);

      if (index !== items.length - 1) {
        await wait(500);
      }
    }
  },
};

/** Ziel für neue Einkaufslisten-Einträge. */
export const useShoppingListSink = (): ShoppingListSink => ioBrokerShoppingListSink;

/** Aktuelle Einträge der Alexa-Einkaufsliste (reaktiv, aus dem ioBroker-Store). */
export const useShoppingListEntries = () => {
  const { iobroker } = useIobrokerStore();
  const entries = computed(() => iobroker.alexaLists.shoppingListActive.parsed([]));
  const names = computed(() => entries.value.map((entry) => entry.name));

  /** Eintrag entfernen – über den Lösch-Button-State des Adapters (wie in `AlexaListTable`). */
  const remove = async (entry: AlexaList): Promise<boolean> => {
    const connection = ioBrokerService.connection;
    if (!connection) {
      return false;
    }
    await connection.setState(entry.buttonDeleteId, true);
    return true;
  };

  return { entries, names, remove };
};
