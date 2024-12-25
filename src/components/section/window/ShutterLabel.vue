<script setup lang="ts">
import { StoreValueType } from "@/store/iobrokerStore.ts";

defineProps<{ getShutterPosition: "n/a" | number | StoreValueType<number> }>();

const text = {
  100: "Die Rollade ist komplett offen",
  0: "Die Rollade ist komplett geschlossen"
};
</script>

<template>
  <p :class="['text text__container',getShutterPosition === 'n/a' ? 'text-bounce' : '']">
    {{ text[getShutterPosition as keyof typeof text] || `Rollade ${getShutterPosition}% offen` }}
  </p>
</template>

<style lang="postcss" scoped>

.text {
  @apply text-[0.68rem] mt-1 ml-1 font-bold;
}

.text-bounce {
  @apply animate-bounce text-red-500;
}

.text__container {
  @apply bg-muted-foreground/40 inline-block px-1 rounded-sm
}
</style>