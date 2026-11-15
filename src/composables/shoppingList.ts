import { computed } from "vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { ioBrokerService } from "@/lib/io-broker-service.ts";
import { type AlexaList } from "@/types/types.ts";
import { type ShoppingListItem, type ShoppingListSink, ShoppingListNotConnectedError } from "@/lib/shopping-list.ts";

/**
 * Einkaufsliste über ioBroker (alexa-shoppinglist).
 *
 * TODO(Nutzer): Anbindung einrichten.
 * 1. `isConnected` auf `true` setzen – dann zeigt die App keinen „Noch nicht angebunden“-Hinweis mehr.
 * 2. `add` umsetzen: Einträge an ioBroker schreiben. Den Text pro Eintrag liefert `formatShoppingItem(item)`
 *    aus `@/lib/shopping-list.ts` (z. B. „250 g Mehl“). Die Verbindung gibt es über
 *    `ioBrokerService.connection` (`@/lib/io-broker-service.ts`), geschrieben wird mit
 *    `await connection.setState("<State-ID>", text)`.
 *    State-ID und Format (ein Eintrag pro Schreibvorgang?) bitte im ioBroker-Admin prüfen.
 *    Achtung: Schreiben auf nicht vorhandene States schlägt still fehl.
 * 3. Bei Fehlern werfen – die Oberfläche zeigt dann einen Fehler-Toast.
 */
const ioBrokerShoppingListSink: ShoppingListSink = {
  isConnected: false,
  add: (_items: ShoppingListItem[]): Promise<void> => Promise.reject(new ShoppingListNotConnectedError()),
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
