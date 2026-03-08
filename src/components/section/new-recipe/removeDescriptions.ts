import { useMutation, provideApolloClient } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";
import { Logger } from "@/lib/logger.ts";
import apolloClient from "@/apolloClient.ts";

export const removeDescriptions = (ids: string[]) => {
  // Wenn wir außerhalb eines Komponenten-Setups arbeiten, müssen wir explizit
  // einen Apollo-Client bereitstellen, sonst kommt der Fehler
  // "Apollo client with id default not found".
  provideApolloClient(apolloClient);

  const { mutate } = useMutation(
    graphql(`
      mutation RemoveTextArea($id: UUID!) {
        removeTextArea(id: $id)
      }
    `),
  );
  ids.forEach((id, index) => {
    Logger("Remove description with id from Db:", { value: id });
    if (index === ids.length - 1) {
      mutate({ id }, { refetchQueries: ["getRecipeById"] });
      return;
    }
    mutate({ id });
  });
};
