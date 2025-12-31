<script setup lang="ts">
import { GetRecipeDetailsQuery } from "@/api/gql/graphql";
import { getElementByPosition } from "@/components/section/new-recipe/utils";

type DescriptionType = NonNullable<GetRecipeDetailsQuery["recipe"]>["recipeDescriptions"];

defineProps<{ descriptions: DescriptionType }>();
</script>

<template>
  <div class="w-[50%] border border-accent mb-4 p-2 rounded-lg bg-accent">
    <template v-for="index in descriptions.length" :key="index">
      <p class="font-bold text-accent-foreground mb-2 mt-2 2xl:text-2xl text-xl first:mt-0">
        {{ getElementByPosition(index + 1, descriptions)?.header }}
      </p>
      <p class="w-full h-auto whitespace-pre-wrap text-base">{{ getElementByPosition(index + 1, descriptions)?.text }}</p>
    </template>
  </div>
</template>
