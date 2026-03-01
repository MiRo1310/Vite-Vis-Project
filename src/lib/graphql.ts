import apolloClient from "@/apolloClient.ts";

export const invalideApollo = () => {
  apolloClient.cache.evict({
    fieldName: "productCategories",
  });

  apolloClient.cache.gc();
};
