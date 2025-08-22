<script setup lang="ts">
import { Button } from "@/components/shared/button";
import { GetRecipeByIdQuery } from "@/api/gql/graphql";

defineProps<{ recipe?: GetRecipeByIdQuery["recipe"]; selectedName?: string }>();
</script>

<template>
  <RouterLink :to="{ name: 'new-recipe', params: { id: recipe?.id } }">
    <Button as="div" size="icon" icon="edit" variant="outline" />
  </RouterLink>
</template>
