<script setup lang="ts">
import { Card, CardContent } from "@/components/shared/card";
import NavActionsShoppingCard from "@/components/section/home/NavActionsShopping.vue";
import NavActionsMichaelsTodos from "@/components/section/home/NavActionsMichaelsTodos.vue";
import Holiday from "@/components/section/home/Holiday.vue";
</script>

<template>
  <Card styling="small" color="primary">
    <CardContent class="text-xs flex flex-row flex-wrap gap-1 text-foreground">
      <NavActionsShoppingCard />
      <NavActionsMichaelsTodos />
      <Holiday />
    </CardContent>
  </Card>
</template>
