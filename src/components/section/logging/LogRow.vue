<script setup lang="ts">
import { toLocaleTime } from "@/lib/time.ts";
import { Log } from "@/types/types.ts";

defineProps<{ log: Log }>();
</script>

<template>
  <div class="text-2xs">
    <span class="w-28 inline-block">{{ toLocaleTime(log.ts) }}</span>
    <span class="inline-block w-24">{{ log.from }}</span>
    {{ log.message }}
  </div>
</template>
