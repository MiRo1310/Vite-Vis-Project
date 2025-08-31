<script setup lang="ts">
import { Button } from "@/components/shared/button";
import { RecipeDescriptionCreateOrUpdateDtoInput } from "@/api/gql/graphql.ts";
import { useMutation } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";

const props = defineProps<{ description: RecipeDescriptionCreateOrUpdateDtoInput }>();

const descriptions = defineModel<RecipeDescriptionCreateOrUpdateDtoInput[]>("descriptions", { default: [] });

const { mutate } = useMutation(
  graphql(`
    mutation RemoveTextArea($id: UUID!) {
      removeTextArea(id: $id)
    }
  `),
);

const removeDescription = () => {
  const { id = null, position } = props.description;
  if (id) {
    mutate({ id }, { refetchQueries: ["getRecipeById"] });
  }

  if (descriptions.value.length === position) {
    descriptions.value.pop();
    return;
  }
};
</script>

<template>
  <Button v-if="descriptions.length > 1" size="icon" variant="outline" icon="remove" @click.prevent="removeDescription" />
</template>

<style scoped lang="scss"></style>
