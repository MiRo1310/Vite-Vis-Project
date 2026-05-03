<script setup lang="ts">
import { computed, ref } from "vue";
import { IEnergyFlow } from "@/components/shared/energy-flow/index.ts";
import { Line, Positions } from "@/components/shared/energy-flow/utils.ts";
import EnergyFlowCard from "@/components/shared/energy-flow/EnergyFlowCard.vue";
import EnergyFlowLine from "@/components/shared/energy-flow/EnergyFlowLine.vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { getValNumber } from "@/lib/object.ts";

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
    type: "react",
    ...columnsCoordinates(2, 1),
    lines: [
      new Line("pv", "netz", "leftRightCenter", {
        groupCount: 1,
        spacing: 0.15,
        offsetYStart: 0,
        autoSpeed: { max: 3000, min: 1000, active: true, maxSpeed: 75, minSpeed: 25, value: pv.pvGross?.val ?? 0 },
        reverse: false,
      }),
    ],
    out: { value: pv.pvGross?.val ?? 0, unit: "W", class: "text-green-600" },
  },
  {
    id: "pvSmall",
    title: "PV Klein",
    type: "react",
    ...columnsCoordinates(3, 1),
    lines: [new Line("netz", "pvSmall", "bottomTopCenter", { offsetXStart: -10, reverse: true, groupCount: 3, dotsPerGroup: 3, spacing: 0.05 })],
    out: { value: pv.smallPv?.val ?? 0, unit: "W", class: "text-green-600" },
  },
  {
    id: "battery",
    ...columnsCoordinates(3, 2),
    title: "Speicher",
    lines: [
      new Line("netz", "battery", "bottomTopCenter", {
        offsetXStart: 10,
        offsetXEnd: 10,
        speed: 10,
        groupCount: 1,
        reverse: false,
        active: getValNumber(pv.activeCharging) !== 0,
      }),
    ],
    out: { value: getValNumber(pv.activeCharging), unit: "W", class: "text-green-400" },
    in: { value: getValNumber(pv.batteryCharging), unit: "%" },
  },
  {
    id: "netz",
    ...columnsCoordinates(2, 2),
    title: "Netz",
    lines: [],
    out: { value: value.value, unit: "W", class: "text-green-400" },
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
        <EnergyFlowCard :energy-flow="item" :positions />
        <template v-for="(line, index) in item.lines" :key="index">
          <EnergyFlowLine
            :id="String(i)"
            :animation="line.getActive()"
            :reverse="line.getReverse()"
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
