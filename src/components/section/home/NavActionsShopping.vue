<script setup lang="ts">
import Sheet from "@/components/shared/Sheet.vue";
import NavActionsShoppingList from "@/components/section/home/NavActionsShoppingList.vue";
import { ShoppingBag } from "lucide-vue-next";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import Badge from "@/components/shared/badge/Badge.vue";
import { Button } from "@/components/shared/button";
import { getValString } from "@/lib/object.ts";
import { toJSON } from "@michaelroling/ts-library";
import { AlexaList } from "@/types/types.ts";

const { alexaLists } = storeToRefs(useIobrokerStore());

const createShoppinglist = computed((): AlexaList[] => {
  return toJSON<AlexaList[]>(getValString(alexaLists.value.shoppingListActive)).json ?? [];
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
