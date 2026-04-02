import { provideApolloClient, useMutation } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";
import apolloClient from "@/apolloClient.ts";
import { IRecipeGroupToDelete } from "@/store/recipeStore.ts";

export const removeProductGroups = async (groups: IRecipeGroupToDelete[]) => {
  provideApolloClient(apolloClient);

  const { mutate } = useMutation(
    graphql(`
      mutation RemoveRecipeGroup($dto: RecipeGroupRemoveDtoInput!) {
        removeProductGroup(dto: $dto)
      }
    `),
  );

  for (const group of groups) {
    await mutate({ dto: { position: group.groupPosition, recipeId: group.recipeId } });
  }
};
