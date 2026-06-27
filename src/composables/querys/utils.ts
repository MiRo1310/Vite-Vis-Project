// Public: Cache invalidieren (evict + garbage collect + evtl. refetch aktiver Queries)
import { Logger } from "@/lib/logger.ts";
import apolloClient from "@/apolloClient.ts";

export const invalidateCache = async (fieldName: string) => {
  try {
    // Evict das Root-Feld productCategories
    apolloClient.cache.evict({ id: "ROOT_QUERY", fieldName });
    // Entferne dereferenzierte Einträge
    apolloClient.cache.gc();
    if (typeof apolloClient.reFetchObservableQueries === "function") {
      await apolloClient.reFetchObservableQueries();
    }
  } catch (e) {
    Logger(`Failed to invalidate ${fieldName} cache`, { e, type: "error" });
  }
};
