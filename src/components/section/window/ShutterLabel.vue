<script setup lang="ts">
import { StoreValueType } from "@/store/iobrokerStore.ts";

defineProps<{ getShutterPosition: "n/a" | number | StoreValueType<number> }>();

const text = {
  100: "Die Rollade ist komplett offen",
  0: "Die Rollade ist komplett geschlossen",
};
</script>

<template>
  <p :class="['text-[0.68rem] mt-1 ml-1 font-bold inline-block px-1 rounded-sm', getShutterPosition === 'n/a' ? 'animate-bounce text-red-500' : '']">
    {{ text[getShutterPosition as keyof typeof text] || `Rollade ${getShutterPosition}% offen` }}
  </p>
</template>
