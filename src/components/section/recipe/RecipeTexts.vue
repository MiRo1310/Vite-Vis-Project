<script setup lang="ts">
import { GetRecipeDetailsQuery } from "@/api/gql/graphql";
import { getElementByPosition } from "@/components/section/new-recipe/utils";
import { toZeroBasedIndex } from "@/lib/indexHandler.ts";

type DescriptionType = NonNullable<GetRecipeDetailsQuery["recipe"]>["recipeDescriptions"];

defineProps<{ descriptions: DescriptionType }>();
</script>

<template>
  <div class="w-[50%] rounded-lg" v-component="'RecipeTexts'">
    <template v-for="oneBasedIndex in descriptions.length" :key="oneBasedIndex">
      <p class="font-bold text-accent-foreground mb-2 mt-2 2xl:text-2xl text-xl first:mt-0">
        {{ getElementByPosition(toZeroBasedIndex(oneBasedIndex), descriptions)?.header }}
      </p>
      <p class="w-full h-auto whitespace-pre-wrap text-base">{{ getElementByPosition(toZeroBasedIndex(oneBasedIndex), descriptions)?.text }}</p>
    </template>
  </div>
</template>
