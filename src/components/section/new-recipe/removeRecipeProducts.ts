import { provideApolloClient, useMutation } from "@vue/apollo-composable";
import apolloClient from "@/apolloClient.ts";
import { graphql } from "@/api/gql";

export const removeRecipeProducts = async (productIds: string[]) => {
  provideApolloClient(apolloClient);

  const { mutate } = useMutation(
    graphql(`
      mutation removeRecipeProduct($id: UUID!) {
        removeRecipeProduct(id: $id)
      }
    `),
  );

  const results: Array<unknown> = [];

  for (const id of productIds) {
    const result = await mutate({ id });
    results.push(result?.data?.removeRecipeProduct);
  }

  return results;
};
