<script setup lang="ts">
import { HTMLAttributes } from "vue";

const emits = defineEmits(["update:onSubmit"]);
defineProps<{ classContent?: HTMLAttributes["class"] }>();
</script>

<template>
  <form class="h-full flex flex-col -ml-2" @submit.prevent="emits('update:onSubmit')">
    <div class="flex-1 h-full">
      <div :class="['flex space-x-2 flex-wrap', classContent]">
        <slot name="default" />
      </div>
    </div>
    <slot name="footer" />
  </form>
</template>
