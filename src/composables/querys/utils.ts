// Public: Cache invalidieren (evict + garbage collect + evtl. refetch aktiver Queries)
import { ApolloClient } from "@apollo/client/core";
import { Logger } from "@/lib/logger.ts";

export const invalidateCache = async (client: ApolloClient, fieldName: string) => {
  try {
    if (!client) {
      return;
    }
    // Evict das Root-Feld productCategories
    client.cache.evict({ id: "ROOT_QUERY", fieldName });
    // Entferne dereferenzierte Einträge
    client.cache.gc();
    // Optional: refetch alle aktiven observable queries
    if (client.reFetchObservableQueries) {
      await client.reFetchObservableQueries();
    }
  } catch (e) {
    Logger(`Failed to invalidate ${fieldName} cache`, { e, type: "error" });
  }
};
