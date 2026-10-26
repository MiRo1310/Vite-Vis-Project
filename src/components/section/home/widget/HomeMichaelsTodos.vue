<script setup lang="ts">
import Sheet from "@/components/shared/Sheet.vue";
import AlexaListTable from "@/components/section/home/widget/AlexaListTable.vue";
import { Pickaxe } from "lucide-vue-next";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { computed } from "vue";
import QuickActionButton from "@/components/section/home/widget/QuickActionButton.vue";

const { iobroker } = useIobrokerStore();

const totoList = computed(() => {
  return iobroker.alexaLists.michaelsTodoList.parsed([]);
});
</script>
<template>
  <Sheet :show-footer="false">
    <template #trigger>
      <QuickActionButton title="Michis Todo" :badge="totoList.length" class="flex-1">
        <Pickaxe class="size-4" />
      </QuickActionButton>
    </template>
    <template #title>
      <p>Michis Todo</p>
    </template>
    <template #content>
      <div class="h-[92vh] overflow-y-auto">
        <AlexaListTable :list="totoList" />
      </div>
    </template>
  </Sheet>
</template>
