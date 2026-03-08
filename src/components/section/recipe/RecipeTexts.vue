<script setup lang="ts">
import { GetRecipeDetailsQuery } from "@/api/gql/graphql";

type DescriptionType = NonNullable<GetRecipeDetailsQuery["recipe"]>["recipeDescriptions"];

defineProps<{ descriptions: DescriptionType }>();
</script>

<template>
  <div class="w-[50%] rounded-lg" v-component="'RecipeTexts'">
    <template v-for="(description, index) in [...descriptions].sort((a, b) => a.position - b.position)" :key="index">
      <p class="font-bold text-accent-foreground mb-2 mt-2 2xl:text-xl text-xl first:mt-0">
        {{ description?.header }}
      </p>
      <p class="w-full h-auto whitespace-pre-wrap text-base text-muted-foreground">{{ description?.text }}</p>
    </template>
  </div>
</template>
