import { provideApolloClient, useMutation } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";
import apolloClient from "@/apolloClient.ts";

export interface IRecipeGroup {
  position: number;
  recipeId: string;
}

export const removeProductGroups = async (groups: IRecipeGroup[]) => {
  provideApolloClient(apolloClient);

  const { mutate } = useMutation(
    graphql(`
      mutation RemoveRecipeGroup($dto: RecipeGroupRemoveDtoInput!) {
        removeProductGroup(dto: $dto)
      }
    `),
  );

  for (const group of groups) {
    await mutate({ dto: { position: group.position, recipeId: group.recipeId } });
  }
};
