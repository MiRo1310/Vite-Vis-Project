<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { adminConnection } from "@/lib/connecter-to-iobroker.ts";

const props = defineProps<{ idShutterPosition: string }>();

const handleClick = (i: number) => {
  if (adminConnection) adminConnection.setState(props.idShutterPosition, 100 - (i - 1) * 20);
};
</script>

<template>
  <div class="shutter-controls">
    <Button v-for="i in 6" :key="i" class="shutter-controls__button" variant="outline" :size="'sm'" @click="handleClick(i)">
      {{ 100 - (i - 1) * 20 }}%
    </Button>
  </div>
</template>

<style lang="scss" scoped>
.shutter-controls {
  @apply flex gap-1;

  &__button {
    @apply w-10 h-6 text-xs bg-accent-foreground/10 rounded-none;
  }
}
</style>
