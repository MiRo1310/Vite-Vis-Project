<script setup lang="ts">
import Sheet from "@/components/shared/Sheet.vue";
import NavActionsShoppingList from "@/components/section/home/NavActionsShoppingList.vue";
import { Pickaxe } from "lucide-vue-next";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { computed } from "vue";
import HomeActionBtn from "@/components/section/home/HomeActionBtn.vue";

const { iobroker } = useIobrokerStore();

const totoList = computed(() => {
  return iobroker.alexaLists.michaelsTodoList.parsed([]);
});
</script>
<template>
  <Sheet :show-footer="false">
    <template #trigger>
      <HomeActionBtn title="Michis Todos" :badge="totoList?.length" class="flex-1">
        <Pickaxe />
      </HomeActionBtn>
    </template>
    <template #title>
      <p>Michis Todos</p>
    </template>
    <template #content>
      <div class="h-[92vh] overflow-y-auto">
        <NavActionsShoppingList :list="totoList" />
      </div>
    </template>
  </Sheet>
</template>
