<script setup lang="ts" generic="T extends string">
import EnergyFlowCard from "@/components/shared/energy-flow/EnergyFlowCard.vue";
import { IEnergyFlow } from "@/components/shared/energy-flow/index.ts";
import { Positions } from "@/components/shared/energy-flow/position.ts";
import EnergyFlowLineWrapper from "@/components/shared/energy-flow/EnergyFlowLineWrapper.vue";
import { ref } from "vue";

defineProps<{ data: IEnergyFlow<T>[] }>();
const animationRef = ref<null | SVGGElement>(null);
const positions = new Positions<T>();
</script>

<template>
  <Teleport to="body">
    <svg width="90%" height="80%" class="energy-flow-line overflow-visible absolute top-20 left-10" xmlns="http://www.w3.org/2000/svg">
      <template v-for="(item, i) in data" :key="i">
        <EnergyFlowCard :energy-flow="item" :positions="positions" />
        <template v-for="(line, index) in item.lines" :key="index">
          <EnergyFlowLineWrapper :id="i" :line :positions :animation-ref />
        </template>
      </template>
      <g ref="animationRef" id="svg-animations"></g>
    </svg>
  </Teleport>
</template>
