<script setup lang="ts">
import { InfoType } from "@/types/types.ts";

defineProps<{ isTimeToWarn?: boolean; getOpenWindows?: number; infos: InfoType[] }>();
</script>
<template>
  <div class="card__shadow mt-2">
    <div
      v-for="(info, index) in infos"
      :key="index"
      :class="{
        info__row: true,
        [`${info.class}`]: info.class,
        'animate-bounce': isTimeToWarn && (getOpenWindows ?? 0) > 0 && info.bounce,
        'cursor-pointer': info?.callback,
      }"
      @click="info?.callback ? info.callback() : null"
    >
      <p>{{ info.title }}</p>
      <p class="ml-3 mr-4">
        {{ info.value }}
        <span />
        <span class="w-1 inline-block">{{ info.unit }} </span>
      </p>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.info__row {
  @apply flex justify-between items-center text-accent-foreground/50 font-bold -mx-1 px-1;
}

.card__shadow {
  @apply bg-white p-2 shadow-lg;
}
</style>
