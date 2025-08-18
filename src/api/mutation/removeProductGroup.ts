import { graphql } from "@/api/gql";

export const removeProductGroupMutation = graphql(`
  mutation RemoveRecipeGroup($dto: RecipeGroupRemoveDtoInput!) {
    removeProductGroup(dto: $dto)
  }
`);
