<script setup lang="ts">
import { Card, CardHeader, CardTitle } from "@/components/shared/card";
import LightCard from "@/pages/LightCard.vue";
</script>

<template>
  <Card styling="blue">
    <CardHeader>
      <CardTitle>Licht</CardTitle>
    </CardHeader>
    <div class="p-2 flex">
      <LightCard />
    </div>
  </Card>
</template>

<style scoped lang="postcss">
</style>
