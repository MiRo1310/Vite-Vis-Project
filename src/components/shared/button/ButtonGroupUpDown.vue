<script setup lang="ts">
import { ChevronDown, ChevronUp } from "lucide-vue-next";
import Button from "@/components/shared/button/Button.vue";

defineProps<{ disabledUp?: boolean; disabledDown?: boolean }>();
const emits = defineEmits(["up", "down"]);
</script>

<template>
  <div class="w-6 h-6 flex flex-col items-center justify-center">
    <Button type="button" variant="ghost" :disabled="disabledUp" size="iconRow" @click="emits('up')">
      <ChevronUp class="size-3 cursor-pointer hover:bg-background/30 rounded-xs" />
    </Button>
    <Button type="button" variant="ghost" :disabled="disabledDown" size="iconRow" @click="emits('down')">
      <ChevronDown class="size-3 cursor-pointer hover:bg-background/30 rounded-xs" />
    </Button>
  </div>
</template>
