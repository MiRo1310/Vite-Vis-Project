<script setup lang="ts">
import { InfoType } from "@/types/types.ts";
import CardSubcard from "@/components/shared/card/CardSubcard.vue";
import ValueWithUnit from "@/components/shared/ValueWithUnit.vue";

defineProps<{ isTimeToWarn?: boolean; getOpenWindows?: number; infos: InfoType[] }>();
</script>

<template>
  <CardSubcard class="mt-2">
    <div
      v-for="(info, index) in infos"
      :key="index"
      :class="[
        'flex justify-between items-center text-cardCustom-text/70 font-bold -mx-1 px-1',
        info.class,
        {
          'cursor-pointer': info?.callback,
        },
      ]"
      @click="info?.callback ? info.callback() : null"
    >
      <p>{{ info.title }}</p>
      <ValueWithUnit :value="info.value" :unit="info.unit" />
    </div>
  </CardSubcard>
</template>
