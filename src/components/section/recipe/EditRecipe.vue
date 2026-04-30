<script setup lang="ts">
import { Button } from "@/components/shared/button/button.variants";
import { GetRecipeDetailsQuery } from "@/api/gql/graphql";
import { routes } from "@/router/routes.ts";

defineProps<{ recipe?: GetRecipeDetailsQuery["recipe"] }>();
</script>

<template>
  <RouterLink :to="{ name: routes.editRecipe.name, params: { id: recipe?.id } }">
    <Button as="div" size="icon" icon="edit" variant="outline" />
  </RouterLink>
</template>
