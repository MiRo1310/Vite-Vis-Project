<script setup lang="ts">
import { type GetRecipeDetailsQuery } from "@/api/gql/graphql";

type DescriptionType = NonNullable<GetRecipeDetailsQuery["recipe"]>["recipeDescriptions"];

defineProps<{ descriptions: DescriptionType }>();
</script>

<template>
  <div class="md:w-[60%] w-full">
    <div
      v-for="(description, index) in [...descriptions].sort((a, b) => a.position - b.position)"
      :key="index"
      class="mb-5 last:mb-0"
    >
      <div class="flex items-center gap-2.5 mb-2">
        <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500/15 text-xs font-bold text-orange-600 dark:text-orange-400">
          {{ index + 1 }}
        </span>
        <h3 class="font-semibold text-base leading-tight">{{ description?.header }}</h3>
      </div>
      <p class="whitespace-pre-wrap text-sm text-muted-foreground leading-relaxed pl-8.5">{{ description?.text }}</p>
    </div>
  </div>
</template>
