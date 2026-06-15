<script setup lang="ts">
import StatusDot from "@/components/shared/display/StatusDot.vue";

defineProps<{ online: boolean; active: boolean }>();
</script>

<template>
  <div class="flex items-center gap-1.5">
    <StatusDot :active="online" />
    <span class="text-xs font-semibold">{{ online ? "Online" : "Offline" }}</span>
  </div>
  <div class="flex items-center gap-1.5">
    <StatusDot :active />
    <span class="text-xs font-semibold">{{ active ? "An" : "Aus" }}</span>
  </div>
</template>
