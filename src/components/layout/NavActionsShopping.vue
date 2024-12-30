<script setup lang="ts">
import Sheet from "@/components/shared/Sheet.vue";
import NavActionsShoppingList from "@/components/layout/NavActionsShoppingList.vue";
import ButtonCard from "@/components/shared/ButtonCard.vue";
import { ShoppingBag } from "lucide-vue-next";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import Badge from "@/components/shared/badge/Badge.vue";
import { stringToJSON } from "@/lib/string.ts";

const { shoppingList } = storeToRefs(useIobrokerStore());

const createShoppinglist = computed((): any[] => {
  return stringToJSON(shoppingList.value);
});
</script>
<template>
  <Sheet styling="light" :show-footer="false">
    <template #trigger>
      <ButtonCard :icon="ShoppingBag" class=" text-accent-foreground/70" class-card="mt-2 ml-1">
        <template #icon>
          <p class="absolute top-7 ">
            <Badge :value="createShoppinglist?.length" />
          </p>
        </template>
      </ButtonCard>
    </template>
    <template #title>
      <p>Einkaufsliste</p>
    </template>
    <template #content>
      <NavActionsShoppingList />
    </template>
  </Sheet>
</template>