<script setup lang="ts">
import { Button } from "@/components/shared/button";
import { GetRecipeDetailsQuery } from "@/api/gql/graphql";
import { routes } from "@/router/routes.ts";

defineProps<{ recipe?: GetRecipeDetailsQuery["recipe"] }>();
</script>

<template>
  <RouterLink :to="{ name: routes.newRecipe.name, params: { id: recipe?.id } }">
    <Button as="div" size="icon" icon="edit" variant="outline" />
  </RouterLink>
</template>
