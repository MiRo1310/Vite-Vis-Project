<script setup lang="ts">
import Sheet from "@/components/shared/Sheet.vue";
import NavActionsShoppingList from "@/components/section/home/NavActionsShoppingList.vue";
import { ShoppingBag } from "lucide-vue-next";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import Badge from "@/components/shared/badge/Badge.vue";
import { stringToJSON } from "@/lib/string.ts";
import { Button } from "@/components/shared/button";

const { alexaLists } = storeToRefs(useIobrokerStore());

const createShoppinglist = computed((): any[] => {
  return stringToJSON(alexaLists.value.shoppingListActive?.val);
});
</script>
<template>
  <Sheet :show-footer="false">
    <template #trigger>
      <Button class="relative">
        Einkaufsliste
        <ShoppingBag class="ml-2" />
        <Badge color="green" class="ml-2" :value="createShoppinglist?.length" />
      </Button>
    </template>
    <template #title>
      <p>Einkaufsliste</p>
    </template>
    <template #content>
      <NavActionsShoppingList :list="createShoppinglist" />
    </template>
  </Sheet>
</template>
