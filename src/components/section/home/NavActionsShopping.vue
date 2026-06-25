<script setup lang="ts">
import Sheet from "@/components/shared/Sheet.vue";
import NavActionsShoppingList from "@/components/section/home/NavActionsShoppingList.vue";
import { ShoppingBag } from "lucide-vue-next";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { computed } from "vue";
import HomeActionBtn from "@/components/section/home/HomeActionBtn.vue";

const { iobroker } = useIobrokerStore();

const createShoppinglist = computed(() => iobroker.alexaLists.shoppingListActive.parsed([]));
</script>

<template>
  <Sheet :show-footer="false">
    <template #trigger>
      <HomeActionBtn :title="'Einkaufsliste'" :badge="createShoppinglist?.length">
        <ShoppingBag />
      </HomeActionBtn>
    </template>
    <template #title>
      <p>Einkaufsliste</p>
    </template>
    <template #content>
      <div class="h-[92vh] overflow-y-auto">
        <NavActionsShoppingList :list="createShoppinglist" />
      </div>
    </template>
  </Sheet>
</template>
