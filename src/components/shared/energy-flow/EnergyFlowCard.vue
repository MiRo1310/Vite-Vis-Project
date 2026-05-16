<script setup lang="ts" generic="T extends string">
import { computed, onMounted } from "vue";
import { IBoxValues, IEnergyFlow } from "@/components/shared/energy-flow/index.ts";
import { cn } from "@/lib/utils.ts";
import { HexColors } from "@/components/shared/energy-flow/color-enum.ts";
import { PositionHandler, Positions } from "@/components/shared/energy-flow/position.ts";
import { sumNumbers } from "@/lib/number.ts";

const props = defineProps<{
  energyFlow: IEnergyFlow<T>;
  positions: Positions<T>;
}>();

const defaultRadius = 50;
const defaultReact = {
  width: 100,
  height: 100,
};

const card = new PositionHandler<T>(props.energyFlow.id, { padding: props.energyFlow.padding });

onMounted(() => {
  card.updatePosition(coordinates.value.x, coordinates.value.y, coordinates.value.height, coordinates.value.width, props.energyFlow.strokeWidth ?? 2);

  props.positions.updatePositionsForCard(card);
});

const getReactAndCircleValues = () => {
  return {
    stroke: props.energyFlow.stroke ?? HexColors.DARK_GREEN,
    fill: props.energyFlow.fillColor ?? HexColors.DARK_BLUE_GRAY, // "transparent"
    strokeWidth: props.energyFlow.strokeWidth,
    style: { cursor: props.energyFlow.clickHandler ? "pointer" : "default" },
  };
};

const react = computed(() => {
  const width = props.energyFlow.react?.width ?? defaultReact.width;
  const height = props.energyFlow.react?.height ?? defaultReact.height;
  const rx = props.energyFlow.react?.radiusX ?? 0;
  const ry = props.energyFlow.react?.radiusY ?? 0;
  const x = coordinates.value.x - width / 2;
  const y = coordinates.value.y - height / 2;
  const dataRect: IBoxValues = { x, y, width, height };
  return {
    height: height,
    width: width,
    x: x,
    y: y,
    ry: ry,
    rx: rx,
    ...getReactAndCircleValues(),
    "data-rect": JSON.stringify(dataRect),
  };
});

const circle = computed(() => {
  const r = coordinates.value.radius;
  const cx = coordinates.value.x;
  const cy = coordinates.value.y;
  const dataRect: IBoxValues = { x: cx - r, y: cy - r, width: 2 * r, height: 2 * r };
  return {
    cx,
    cy,
    r,
    ...getReactAndCircleValues(),
    "data-rect": JSON.stringify(dataRect),
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
  const offestX = props.energyFlow.icon?.offsetX ?? 0;
  const offestY = props.energyFlow.icon?.offsetY ?? 0;
  return { height, width, x: coordinates.value.x - width / 2 + offestX, y: coordinates.value.y - coordinates.value.halfHeight + 5 + offestY };
});
</script>

<template>
  <g>
    <rect v-if="energyFlow.type === 'react'" v-bind="react" @click="energyFlow.clickHandler" />
    <circle v-else v-bind="circle" @click="energyFlow.clickHandler" />

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
    <g v-for="(cardValue, index) in energyFlow.values" :key="index">
      <foreignObject
        :x="coordinates.x + (cardValue.icon?.offsetX ?? 0)"
        :y="coordinates.y - coordinates.halfHeight + icon.height + 20 + index * 13 + (cardValue.icon?.offsetY ?? 0)"
        :width="cardValue.icon?.width ?? 10"
        :height="cardValue.icon?.height ?? 10"
      >
        <div xmlns="http://www.w3.org/1999/xhtml" class="flex items-center justify-center w-full h-full">
          <Component :is="cardValue.icon?.svg" :class="cn('text-muted-foreground', cardValue.icon?.class)" :size="cardValue.icon?.size ?? 32" />
        </div>
      </foreignObject>

      <text
        :x="coordinates.x + (cardValue.offsetX ?? 0)"
        :y="coordinates.y - coordinates.halfHeight + icon.height + 20 + index * 13 + (cardValue.offsetY ?? 0)"
        v-bind="{ 'text-anchor': cardValue.textAnchor ?? 'middle' }"
        :fill="cardValue.colorHex ?? HexColors.DARK_GREEN"
        :font-size="cardValue.fontSize ?? 12"
      >
        {{ typeof cardValue?.value === "string" ? cardValue?.value : sumNumbers(cardValue?.value) }} {{ cardValue?.unit }}
      </text>
    </g>
    <text :x="coordinates.x" :y="coordinates.y + coordinates.halfHeight - 10" text-anchor="middle" fill="white" font-size="10">
      {{ energyFlow.title }}</text
    >
  </g>
</template>
