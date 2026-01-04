<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import NavActionsShoppingCard from "@/components/section/home/NavActionsShopping.vue";
import NavActionsMichaelsTodos from "@/components/section/home/NavActionsMichaelsTodos.vue";
</script>

<template>
  <Card color="primary" styling="small">
    <CardHeader>
      <CardTitle>Listen</CardTitle>
    </CardHeader>
    <CardContent class="text-xs flex flex-col gap-2 text-foreground">
      <NavActionsShoppingCard />
      <NavActionsMichaelsTodos />
    </CardContent>
  </Card>
</template>
