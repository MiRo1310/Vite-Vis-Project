<script setup lang="ts">
import { PositionHandler, Positions } from "@/components/shared/energy-flow/utils.ts";
import { computed, onMounted, ref } from "vue";
import { IEnergyFlow } from "@/components/shared/energy-flow/index.ts";
import { Battery } from "lucide-vue-next";

const props = defineProps<{
  energyFlow: IEnergyFlow;
  positions: Positions;
}>();

const defaultRadius = 50;
const defaultReact = {
  width: 100,
  height: 100,
};

const card = new PositionHandler(props.energyFlow.id, { padding: props.energyFlow.padding });
const radius = ref(defaultRadius);

onMounted(() => {
  const r = props.energyFlow.circle?.radius;
  if (r) {
    radius.value = r;
  }
  //TODO hier fehlt die react position
  card.updatePosition(props.energyFlow.x, props.energyFlow.y, radius.value * 2, radius.value * 2, 2);
  props.positions.updatePositionsForCard(card);
});

const getReactAndCircleValues = () => {
  return {
    stroke: props.energyFlow.stroke ?? "#22c55e",
    fill: props.energyFlow.fillColor ?? "#1e293b",
    strokeWidth: props.energyFlow.strokeWidth,
  };
};

const react = computed(() => {
  const width = props.energyFlow.react?.width ?? defaultReact.width;
  const height = props.energyFlow.react?.height ?? defaultReact.height;
  const rx = props.energyFlow.react?.radiusX ?? 0;
  const ry = props.energyFlow.react?.radiusY ?? 0;
  const x = props.energyFlow.x - width / 2;
  const y = props.energyFlow.y - height / 2;
  return {
    height: height,
    width: width,
    x: x,
    y: y,
    ry: ry,
    rx: rx,
    ...getReactAndCircleValues(),
  };
});

const circle = computed(() => {
  return {
    cx: props.energyFlow.x,
    cy: props.energyFlow.y,
    r: radius.value,
    ...getReactAndCircleValues(),
  };
});
</script>

<template>
  <g>
    <rect v-if="energyFlow.type === 'react'" v-bind="react" />
    <circle v-else v-bind="circle" />

    <foreignObject :x="energyFlow.x - 20" :y="energyFlow.y - 50" width="40" height="40">
      <div xmlns="http://www.w3.org/1999/xhtml" class="flex items-center justify-center w-full h-full">
        <Component :is="Battery" class="text-green-400" :size="32" />
      </div>
    </foreignObject>

    <text
      v-for="(cardValue, index) in energyFlow.values"
      :x="energyFlow.x"
      :y="energyFlow.y - 3 + index * 13"
      v-bind="{ 'text-anchor': cardValue.textAnchor ?? 'middle' }"
      :fill="cardValue.fill ?? '#22c55e'"
      :font-size="cardValue.fontSize ?? 12"
      :key="index"
    >
      {{ cardValue?.value }} {{ cardValue?.unit }}
    </text>

    <text :x="energyFlow.x" :y="energyFlow.y + 40" text-anchor="middle" fill="white" font-size="10"> {{ energyFlow.title }}</text>
  </g>
</template>
