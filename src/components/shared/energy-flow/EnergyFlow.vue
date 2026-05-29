<script setup lang="ts" generic="T extends string">
import EnergyFlowCard from "@/components/shared/energy-flow/EnergyFlowCard.vue";
import { IEnergyFlow } from "@/components/shared/energy-flow/index.ts";
import { Positions } from "@/components/shared/energy-flow/position.ts";
import EnergyFlowLineWrapper from "@/components/shared/energy-flow/EnergyFlowLineWrapper.vue";
import { computed, HTMLAttributes, ref } from "vue";

const props = defineProps<{ data: IEnergyFlow<T>[]; class?: HTMLAttributes["class"]; width: number; height: number }>();
const animationRef = ref<null | SVGGElement>(null);
const animationGroup = computed<SVGGElement | null>(() => animationRef.value as SVGGElement | null);
const positions = new Positions<T>();
</script>

<template>
  <svg :width="`${width}px`" :height="`${height}px`" :class="['energy-flow-line', props.class]" xmlns="http://www.w3.org/2000/svg">
    <template v-for="(item, i) in data" :key="i">
      <EnergyFlowCard :energy-flow="item" :positions="positions" />
      <template v-for="(line, index) in item.lines" :key="index">
        <EnergyFlowLineWrapper :id="i" :line="line" :positions="positions" :animation-ref="animationGroup" />
      </template>
    </template>
    <g ref="animationRef" id="svg-animations"></g>
  </svg>
</template>
