<script setup lang="ts">
import NavActionsShoppingCard from "@/components/section/home/NavActionsShopping.vue";
import NavActionsMichaelsTodos from "@/components/section/home/NavActionsMichaelsTodos.vue";
import Holiday from "@/components/section/home/Holiday.vue";
</script>

<template>
  <div class="rounded-xl border bg-card p-2 shadow-sm">
    <div class="grid grid-cols-3 gap-1">
      <NavActionsShoppingCard />
      <NavActionsMichaelsTodos />
      <Holiday />
    </div>
  </div>
</template>
