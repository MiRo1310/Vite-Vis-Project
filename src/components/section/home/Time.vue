<script setup lang="ts">
import { useTime } from "@/composables/time.ts";
import { Card, CardContent } from "@/components/shared/card";

const { date, time } = useTime();
</script>
<template>
  <Card styling="info" class="flex-1">
    <CardContent class="text-left font-bold pt-1 text-xs">
      <p>{{ date }}</p>
      <span>
        {{ time }}
      </span>
      <slot />
    </CardContent>
  </Card>
</template>
