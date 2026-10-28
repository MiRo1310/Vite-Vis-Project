<script setup lang="ts">
import { type AlexaList } from "@/types/types.ts";
import AlexaListTable from "@/components/shared/alexa-list/AlexaListTable.vue";
import QuickActionButton from "@/components/section/home/widget/QuickActionButton.vue";
import Sheet from "@/components/shared/Sheet.vue";
import { type FunctionalComponent } from "vue";

defineProps<{ list: AlexaList[]; title: string; badge?: number; icon: FunctionalComponent }>();
</script>
<template>
  <Sheet :show-footer="false">
    <template #trigger>
      <QuickActionButton :title :badge>
        <Component :is="icon" class="size-4" />
      </QuickActionButton>
    </template>
    <template #title>
      <p>{{ title }}</p>
    </template>
    <template #content>
      <div class="h-[92vh] overflow-y-auto">
        <AlexaListTable :list />
      </div>
    </template>
  </Sheet>
</template>
