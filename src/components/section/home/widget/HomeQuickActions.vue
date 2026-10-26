<script setup lang="ts">
import HomeShoppingCard from "@/components/section/home/widget/HomeShopping.vue";
import HomeMichaelsTodos from "@/components/section/home/widget/HomeMichaelsTodos.vue";
import VacationToggle from "@/components/section/home/widget/VacationToggle.vue";
</script>

<template>
  <div class="flex items-center flex-wrap gap-2">
    <HomeShoppingCard />
    <HomeMichaelsTodos />
    <VacationToggle />
  </div>
</template>
