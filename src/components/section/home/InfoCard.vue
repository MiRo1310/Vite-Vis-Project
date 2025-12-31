<script setup lang="ts">
import { InfoType } from "@/types/types.ts";

defineProps<{ isTimeToWarn?: boolean; getOpenWindows?: number; infos: InfoType[] }>();
</script>
<template>
  <div class="bg-cardCustom-info p-2 shadow-lg mt-2">
    <div
      v-for="(info, index) in infos"
      :key="index"
      :class="{
        'flex justify-between items-center text-cardCustom-text/70 font-bold -mx-1 px-1': true,
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
