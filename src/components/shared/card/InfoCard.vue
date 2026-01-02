<script setup lang="ts">
import { HTMLAttributes } from "vue";
import CardSubcard from "@/components/shared/card/CardSubcard.vue";
import ValueWithUnit from "@/components/shared/ValueWithUnit.vue";

export interface InfoTypes {
  title: string;
  value: number | string | undefined;
  unit?: string;
  valueClass?: HTMLAttributes["class"];
  class?: HTMLAttributes["class"];
}

defineProps<{ class: HTMLAttributes["class"]; infos: InfoTypes[] }>();
</script>
<template>
  <CardSubcard :class="$props.class">
    <div v-for="(info, index) in infos" :key="index" :class="['flex justify-between items-center text-xs', info.class]">
      <p>{{ info.title }}</p>
      <ValueWithUnit :value="info.value" :unit="info.unit" :class="info.valueClass" />
    </div>
  </CardSubcard>
</template>
