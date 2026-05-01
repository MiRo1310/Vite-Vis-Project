<script setup lang="ts">
import EnergyFlowCard from "@/components/shared/energy-flow/EnergyFlowCard.vue";
import EnergyFlowLine from "@/components/shared/energy-flow/EnergyFlowLine.vue";
import { computed, ref } from "vue";
import { IEnergyFlow, IEnergyFlowUpdatePosition } from "@/components/shared/energy-flow/index.ts";
import { UseElementBoundingReturn } from "@vueuse/core";
import { EvaluatedModuleNode } from "vite/module-runner";

const value = ref(500);
setInterval(() => {
  value.value = Math.round(Math.random() * 500);
}, 2000);

const data = computed((): IEnergyFlow[] => [
  { id: "battery", title: "Speicher", out: { value: value.value, unit: "W", class: "text-green-400" }, in: { value: 100 } },
  { id: "pv", title: "PV", out: { value: 2000, unit: "W", class: "text-green-600" } },
]);

const positions = ref<Record<string, UseElementBoundingReturn>>({});

const updatePosition = (event: IEnergyFlowUpdatePosition): void => {
  positions.value[event.id] = event.elementBounding;
};
</script>

<template>
  {{ positions }}
  <div class="grid grid-cols-4 gap-4 relative">
    <template v-for="(item, index) in data" :key="index">
      <EnergyFlowCard :energy-flow="item" @update:position="updatePosition" />
    </template>
    {{ positions["battery"].right }}
    <EnergyFlowLine
      :points="[
        { x: 416, y: 160 },
        { x: 600, y: 160 },
      ]"
      :dots-per-group="4"
      particle-shape="circle"
      :line-height="5"
      :line-width="10"
      :group-count="3"
      :dot-spacing="0.05"
      :stroke-width="2"
      :duration="5"
      :dot-radius="4"
      flow-color="#00ff99"
    />
  </div>
</template>
