<script setup lang="ts">
import { Button } from "@/components/shared/button";
import { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils.ts";

defineProps<{ class?: HTMLAttributes["class"] }>();

const backToRecipe = defineModel("backToRecipe", { default: false });

const emits = defineEmits(["abort"]);
</script>

<template>
  <div :class="cn('w-full flex justify-end gap-2 mb-2', $props.class)">
    <Button class="w-60" type="button" variant="default" @click.stop="emits('abort')">Abbrechen</Button>
    <Button class="w-60" type="submit" variant="outline">Speichern</Button>
    <Button type="submit" @click="backToRecipe = true">Speichern und zurück zum Rezept</Button>
  </div>
</template>
