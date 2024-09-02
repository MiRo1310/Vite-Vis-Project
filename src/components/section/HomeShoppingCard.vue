<script setup lang='ts'>
import Sheet from '@/components/shared/Sheet.vue';
import ShoppingList from '@/components/section/HomeShoppingCardList.vue';
import ButtonCard from '@/components/shared/ButtonCard.vue';
import { ShoppingBag } from 'lucide-vue-next';
import { useIobrokerStore } from '@/store/iobrokerStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import Badge from '@/components/shared/badge/Badge.vue';

const { shoppingList } = storeToRefs(useIobrokerStore());

const createShoppinglist = computed(() => {
  try {
    if (shoppingList.value !== "" && typeof shoppingList.value === "string")
      return JSON.parse(shoppingList.value);
  } catch (error) {
    console.log('error', error);
  }
})
</script>
<template>
  <Sheet>
    <template #trigger>
      <ButtonCard :icon="ShoppingBag" class=" text-accent-foreground/70">
        <template #title>

          <p>Einkaufsliste</p>
          <Badge :value="createShoppinglist?.length" />
        </template>
      </ButtonCard>
    </template>
    <template #title>
      <p>Einkaufsliste</p>
    </template>
    <template #content>
      <ShoppingList />
    </template>
  </Sheet>
</template>