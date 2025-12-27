<script setup lang="ts">
import { HTMLAttributes } from "vue";

export interface InfoTypes {
  title: string;
  value: number | string | undefined;
  unit?: string;
  valueClass?: HTMLAttributes["class"];
  class?: HTMLAttributes["class"];
}

defineProps<{ infos: InfoTypes[] }>();
</script>
<template>
  <div class="card__shadow mt-2">
    <div
      v-for="(info, index) in infos"
      :key="index"
      :class="{
        info__row: true,
        [info?.class]: info.class,
      }"
    >
      <p>{{ info.title }}</p>
      <p :class="['ml-3 mr-4', info?.valueClass]">
        {{ info.value }} <span class="w-1 inline-block">{{ info.unit }} </span>
      </p>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.info__row {
  @apply flex justify-between items-center text-accent-foreground/50 font-bold space-y-[2px] text-xs -mx-1 px-1;
}

.card__shadow {
  @apply bg-cardCustom-info p-2 shadow-lg;
}
</style>
