<script setup lang="ts">
import Sheet from "@/components/shared/Sheet.vue";
import NavActionsShoppingList from "@/components/section/home/NavActionsShoppingList.vue";
import { ShoppingBag } from "lucide-vue-next";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { computed } from "vue";
import { getStoreValString } from "@/lib/object.ts";
import { toJSON } from "@michaelroling/ts-library";
import { AlexaList } from "@/types/types.ts";
import HomeActionBtn from "@/components/section/home/HomeActionBtn.vue";

const { iobroker } = useIobrokerStore();

const createShoppinglist = computed((): AlexaList[] => {
  return toJSON<AlexaList[]>(getStoreValString(iobroker.alexaLists?.shoppingListActive)).json ?? [];
});
</script>
<template>
  <Sheet :show-footer="false">
    <template #trigger>
      <HomeActionBtn :title="'Einkaufsliste'" :badge="createShoppinglist?.length" class="flex-1 h-full">
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
