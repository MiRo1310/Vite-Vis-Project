<script setup lang='ts'>
import Sheet from '@/components/shared/Sheet.vue';
import ShoppingList from '@/components/section/HomeShoppingCardList.vue';
import ButtonCard from '@/components/shared/ButtonCard.vue';
import { ShoppingBag } from 'lucide-vue-next';
</script>
<template>
  <Sheet>
    <template #trigger>
      <ButtonCard
        :icon="ShoppingBag"
        title="Einkaufs- liste"
      />
    </template>
    <template #title>
      <p>Einkaufsliste</p>
    </template>
    <template #content>
      <ShoppingList />
    </template>
  </Sheet>
</template>