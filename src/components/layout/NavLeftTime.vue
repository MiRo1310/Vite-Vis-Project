<script setup lang='ts'>
import { useTime } from '@/composables/time';
import { Card, CardContent } from '@/components/ui/card';

const { date, time } = useTime();


</script>
<template>
  <Card class="mb-2 rounded-md">
    <CardContent class="text-right text-accent-foreground/50 font-bold p-4 text-xs">
      <p>{{ date }} </p>
      <span>
        {{ time }}
      </span>
    </CardContent>
  </Card>
</template>