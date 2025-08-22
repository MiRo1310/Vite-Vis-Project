<script setup lang="ts">
import { HTMLAttributes } from "vue";

const emits = defineEmits(["update:onSubmit"]);
defineProps<{ classContent?: HTMLAttributes["class"] }>();
</script>

<template>
  <form class="form" @submit.prevent="emits('update:onSubmit')">
    <div class="form__content-wrapper">
      <div :class="['form__content', classContent]">
        <slot name="default" />
      </div>
    </div>
    <slot name="footer" />
  </form>
</template>

<style scoped>
.form {
  @apply h-full flex flex-col -ml-2;
}
.form__content-wrapper {
  @apply flex-1 h-full;
}
.form__content {
  @apply flex space-x-2 flex-wrap;
}
</style>
