<script setup lang="ts">
import { useTime } from "@/composables/time.ts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { HTMLAttributes } from "vue";

const { date, time } = useTime();

defineProps<{ class?: HTMLAttributes["class"] }>();
</script>
<template>
  <Card styling="small" color="primary" :class="[$props.class]">
    <CardHeader>
      <CardTitle>
        <p class="leading-4">{{ date }}</p>
        <span class="text-xs mb-1 inline-block">
          {{ time }}
        </span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <slot />
    </CardContent>
  </Card>
</template>
