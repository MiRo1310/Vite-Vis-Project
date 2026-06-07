<script setup lang="ts">
import NavActionsShoppingCard from "@/components/section/home/NavActionsShopping.vue";
import NavActionsMichaelsTodos from "@/components/section/home/NavActionsMichaelsTodos.vue";
import Holiday from "@/components/section/home/Holiday.vue";
</script>

<template>
  <div class="flex items-center flex-wrap gap-2">
    <NavActionsShoppingCard />
    <NavActionsMichaelsTodos />
    <Holiday />
  </div>
</template>
