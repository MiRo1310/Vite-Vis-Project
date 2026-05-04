<script setup lang="ts">
import { PositionHandler, Positions } from "@/components/shared/energy-flow/utils.ts";
import { computed, onMounted } from "vue";
import { IEnergyFlow } from "@/components/shared/energy-flow/index.ts";
import { cn } from "@/lib/utils.ts";

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
// const radius = ref(defaultRadius);

onMounted(() => {
  card.updatePosition(coordinates.value.x, coordinates.value.y, coordinates.value.height, coordinates.value.width, props.energyFlow.strokeWidth ?? 2);

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
  const x = coordinates.value.x - width / 2;
  const y = coordinates.value.y - height / 2;
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
    cx: coordinates.value.x,
    cy: coordinates.value.y,
    r: coordinates.value.radius,
    ...getReactAndCircleValues(),
  };
});

const columnsCoordinates = (row: number, column: number, options?: { offsetY?: number; offsetX?: number }) => {
  const xStart = 70;
  const yStart = 70;
  const distanceX = 160;
  const distanceY = 120;

  return {
    x: xStart * column + (column - 1) * distanceX + (options?.offsetX ?? 0),
    y: yStart * row + (row - 1) * distanceY + (options?.offsetY ?? 0),
  };
};

const coordinates = computed(() => {
  const { row, col, options } = props.energyFlow.position;
  const radius = props.energyFlow.circle?.radius ?? defaultRadius;
  let height = props.energyFlow.react?.height ?? defaultReact.height;
  let width = props.energyFlow.react?.width ?? defaultReact.width;

  if (props.energyFlow.type === "circle") {
    height = radius * 2;
    width = radius * 2;
  }
  return { ...columnsCoordinates(row, col, options), height, width, radius, halfHeight: height / 2, halfWidth: width / 2 };
});

const icon = computed(() => {
  const width = props.energyFlow.icon?.width ?? 30;
  const height = props.energyFlow.icon?.height ?? 30;
  return { height, width, x: coordinates.value.x - width / 2, y: coordinates.value.y - coordinates.value.halfHeight + 5 };
});
</script>

<template>
  <g>
    <rect v-if="energyFlow.type === 'react'" v-bind="react" />
    <circle v-else v-bind="circle" />

    <foreignObject :x="icon.x" :y="icon.y" :width="icon.width" :height="icon.height">
      <div xmlns="http://www.w3.org/1999/xhtml" class="flex items-center justify-center w-full h-full">
        <Component
          v-if="energyFlow.icon?.svg"
          :is="energyFlow.icon.svg"
          :class="cn('text-muted-foreground', energyFlow.icon.class)"
          :size="energyFlow.icon.size ?? 32"
        />
      </div>
    </foreignObject>

    <text
      v-for="(cardValue, index) in energyFlow.values"
      :x="coordinates.x"
      :y="coordinates.y - coordinates.halfHeight + icon.height + 20 + index * 13"
      v-bind="{ 'text-anchor': cardValue.textAnchor ?? 'middle' }"
      :fill="cardValue.fill ?? '#22c55e'"
      :font-size="cardValue.fontSize ?? 12"
      :key="index"
    >
      {{ cardValue?.value }} {{ cardValue?.unit }}
    </text>

    <text :x="coordinates.x" :y="coordinates.y + coordinates.halfHeight - 10" text-anchor="middle" fill="white" font-size="10">
      {{ energyFlow.title }}</text
    >
  </g>
</template>
