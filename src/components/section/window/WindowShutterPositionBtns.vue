<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { adminConnection } from "@/lib/connecter-to-iobroker.ts";

const props = defineProps<{ idShutterPosition: string }>();

const handleClick = (i: number) => {
  if (adminConnection) adminConnection.setState(props.idShutterPosition, 100 - (i - 1) * 20);
};
</script>

<template>
  <div class="flex gap-1">
    <Button
      v-for="i in 6"
      :key="i"
      class="w-10 h-6 text-xs bg-accent-foreground/10 rounded-none"
      variant="outline"
      :size="'sm'"
      @click="handleClick(i)"
    >
      {{ 100 - (i - 1) * 20 }}%
    </Button>
  </div>
</template>
