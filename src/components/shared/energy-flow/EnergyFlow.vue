<script setup lang="ts">
import { computed, ref } from "vue";
import { IEnergyFlow } from "@/components/shared/energy-flow/index.ts";
import { Line, Positions } from "@/components/shared/energy-flow/utils.ts";
import EnergyFlowCircle from "@/components/shared/energy-flow/EnergyFlowCircle.vue";
import EnergyFlowLine from "@/components/shared/energy-flow/EnergyFlowLine.vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";

const { pv } = useIobrokerStore();

const value = ref(500);
const columnsCoordinates = (row: number, column: number, options?: { offsetY?: number; offsetX?: number }) => {
  const xStart = 70;
  const yStart = 70;
  const distanceX = 140;
  const distanceY = 100;

  return {
    x: xStart * column + (column - 1) * distanceX + (options?.offsetX ?? 0),
    y: yStart * row + (row - 1) * distanceY + (options?.offsetY ?? 0),
  };
};

const data = computed((): IEnergyFlow[] => [
  {
    id: "pv",
    title: "PV Gross",
    ...columnsCoordinates(1, 1),
    lines: [new Line("pv", "netz", "leftRightCenter", { groupCount: 1 })],
    out: { value: pv.pvGross?.val ?? 0, unit: "W", class: "text-green-600" },
  },
  {
    id: "3",
    title: "PV Klein",
    ...columnsCoordinates(2, 1),
    lines: [new Line("netz", "3", "bottomTopCenter", { offsetXStart: 0 })],
    out: { value: pv.smallPv?.val ?? 0, unit: "W", class: "text-green-600", reverse: true },
  },
  {
    id: "battery",
    ...columnsCoordinates(2, 2),
    title: "Speicher",
    lines: [],
    out: { value: value.value, unit: "W", class: "text-green-400", reverse: true },
    in: { value: 100 },
  },
  {
    id: "netz",
    ...columnsCoordinates(1, 2),
    title: "Netz",
    lines: [],
    out: { value: value.value, unit: "W", class: "text-green-400", reverse: true },
    in: { value: 100 },
  },
]);

const positions = new Positions();
const animationRef = ref<null | SVGGElement>(null);
</script>

<template>
  <Teleport to="body">
    <svg width="90%" height="80%" class="energy-flow-line overflow-visible absolute top-20 left-10 bg-gray-900" xmlns="http://www.w3.org/2000/svg">
      <template v-for="(item, i) in data" :key="i">
        <EnergyFlowCircle :energy-flow="item" :positions />
        <template v-for="(line, index) in item.lines" :key="index">
          <EnergyFlowLine
            :id="String(i)"
            animation
            :reverse="item.out?.reverse"
            :points="line.getCoordinates(positions)"
            :dots-per-group="line.getDotsPerRow()"
            :particle-shape="line.getParticleShape()"
            :line-height="line.getLineHeight()"
            :speed="line.getSpeed()"
            :line-width="line.getLineWidth()"
            :group-count="line.getGroupCount()"
            :spacing="line.getSpacing()"
            :stroke-width="line.getStrokeWidth()"
            :dot-radius="line.getDotRadius()"
            :flow-color="line.getFlowColorHex()"
            :animation-ref
          />
        </template>
      </template>
      <g ref="animationRef" id="svg-animations"></g>
    </svg>
  </Teleport>
</template>
