<script setup lang="ts">
import { useTime } from "@/composables/time.ts";
import { Card, CardContent } from "@/components/shared/card";

const { date, time } = useTime();


</script>
<template>
  <Card styling="blue">
    <CardContent class="text-left text-accent-foreground/1000 font-bold pt-1 text-xs">
      <p>{{ date }} </p>
      <span>
        {{ time }}
      </span>
    </CardContent>
  </Card>
</template>