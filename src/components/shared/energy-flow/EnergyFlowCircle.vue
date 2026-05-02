<script setup lang="ts">
import { PositionHandler, Positions } from "@/components/shared/energy-flow/utils.ts";
import { onMounted, ref } from "vue";
import { IEnergyFlow } from "@/components/shared/energy-flow/index.ts";

const props = defineProps<{
  energyFlow: IEnergyFlow;
  positions: Positions;
}>();

const defaultRadius = 50;

const card = new PositionHandler(props.energyFlow.id, { padding: props.energyFlow.padding });
const radius = ref(defaultRadius);

onMounted(() => {
  if (props.energyFlow.radius) {
    radius.value = props.energyFlow.radius;
  }
  card.updatePosition(props.energyFlow.x, props.energyFlow.y, radius.value * 2, radius.value * 2, 2);
  props.positions.updatePositionsForCard(card);
});
</script>

<template>
  <g>
    <circle :cx="energyFlow.x" :cy="energyFlow.y" :r="radius" fill="#1e293b" stroke="#22c55e" stroke-width="2" />

    <text :x="energyFlow.x" :y="energyFlow.y - 15" text-anchor="middle" fill="white" font-size="16"> {{ energyFlow.title }}</text>

    <text :x="energyFlow.x" :y="energyFlow.y + 10" text-anchor="middle" fill="#22c55e" font-size="12">
      {{ energyFlow.out?.value }} {{ energyFlow.out?.unit }}
    </text>
    <text :x="energyFlow.x" :y="energyFlow.y + 25" text-anchor="middle" fill="#22c55e" font-size="12">
      {{ energyFlow.in?.value }} {{ energyFlow.in?.unit }}
    </text>
  </g>
</template>
