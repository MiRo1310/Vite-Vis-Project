import { provideApolloClient, useMutation } from "@vue/apollo-composable";
import apolloClient from "@/apolloClient.ts";
import { graphql } from "@/api/gql";
import { newIdPrefix } from "@/components/section/recipe-form/utils.ts";

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
    if (id.includes(newIdPrefix)) {
      return;
    }
    const result = await mutate({ id });
    results.push(result?.data?.removeRecipeProduct);
  }

  return results;
};
