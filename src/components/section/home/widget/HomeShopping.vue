<script setup lang="ts">
import Sheet from "@/components/shared/Sheet.vue";
import AlexaListTable from "@/components/section/home/widget/AlexaListTable.vue";
import { ShoppingBag } from "lucide-vue-next";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { computed } from "vue";
import QuickActionButton from "@/components/section/home/widget/QuickActionButton.vue";

const { iobroker } = useIobrokerStore();

const createShoppinglist = computed(() => iobroker.alexaLists.shoppingListActive.parsed([]));
</script>

<template>
  <Sheet :show-footer="false">
    <template #trigger>
      <QuickActionButton title="Einkaufsliste" :badge="createShoppinglist?.length">
        <ShoppingBag class="size-4" />
      </QuickActionButton>
    </template>
    <template #title>
      <p>Einkaufsliste</p>
    </template>
    <template #content>
      <div class="h-[92vh] overflow-y-auto">
        <AlexaListTable :list="createShoppinglist" />
      </div>
    </template>
  </Sheet>
</template>
