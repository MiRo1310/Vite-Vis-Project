<script setup lang="ts">
import { useTime } from "@/composables/time.ts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";

const { date, time } = useTime();
</script>
<template>
  <Card class="flex-1" styling="small" color="primary">
    <CardHeader>
      <CardTitle>
        <p>{{ date }}</p>
        <span class="text-xs">
          {{ time }}
        </span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <slot />
    </CardContent>
  </Card>
</template>
