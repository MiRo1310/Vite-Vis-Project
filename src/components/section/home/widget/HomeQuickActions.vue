<script setup lang="ts">
import HomeShoppingSheetCard from "@/components/section/home/widget/HomeShoppingSheet.vue";
import HomeMichaelsTodosSheet from "@/components/section/home/widget/HomeMichaelsTodosSheet.vue";
import VacationToggle from "@/components/section/home/widget/VacationToggle.vue";
</script>

<template>
  <div class="flex items-center flex-wrap gap-2">
    <HomeShoppingSheetCard />
    <HomeMichaelsTodosSheet />
    <VacationToggle />
  </div>
</template>
