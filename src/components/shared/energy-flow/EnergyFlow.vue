<script setup lang="ts">
import { computed, ref } from "vue";
import { IEnergyFlow } from "@/components/shared/energy-flow/index.ts";
import { Line, Positions } from "@/components/shared/energy-flow/utils.ts";
import EnergyFlowCircle from "@/components/shared/energy-flow/EnergyFlowCircle.vue";
import EnergyFlowLine from "@/components/shared/energy-flow/EnergyFlowLine.vue";

const value = ref(500);
setInterval(() => {
  value.value = Math.round(Math.random() * 500);
}, 5000);

const data = computed((): IEnergyFlow[] => [
  {
    id: "battery",
    x: 100,
    y: 100,
    title: "Speicher",
    lines: [new Line("battery", "pv", "leftRightCenter")],
    out: { value: value.value, unit: "W", class: "text-green-400", reverse: true },
    in: { value: 100 },
  },
  {
    id: "pv",
    title: "PV",
    x: 400,
    y: 100,
    lines: [new Line("pv", "test", "leftRightCenter")],
    out: { value: 2000, unit: "W", class: "text-green-600" },
    in: { value: 100 },
  },
  { id: "test", title: "PV", x: 700, y: 100, lines: [], out: { value: 2000, unit: "W", class: "text-green-600" } },

  {
    id: "2",
    title: "Test",
    x: 100,
    y: 500,
    lines: [new Line("battery", "2", "bottomTopCenter")],
    out: { value: 2000, unit: "W", class: "text-green-600" },
    in: { value: 100 },
  },
  {
    id: "3",
    title: "Test",
    x: 700,
    y: 500,
    lines: [new Line("battery", "3", "bottomTopCenter")],
    out: { value: 2000, unit: "W", class: "text-green-600" },
    in: { value: 100 },
  },
]);

const positions = new Positions();
</script>

<template>
  <Teleport to="body">
    <svg width="100%" height="80%" class="energy-flow-line overflow-visible absolute top-20 left-20 bg-gray-900" xmlns="http://www.w3.org/2000/svg">
      <template v-for="(item, i) in data" :key="i">
        <EnergyFlowCircle :energy-flow="item" :positions />
        <template v-for="(line, index) in item.lines" :key="index">
          <EnergyFlowLine
            :id="String(i)"
            animation
            :reverse="item.out?.reverse"
            :points="line.getCoordinates(positions)"
            :dots-per-group="3"
            particle-shape="circle"
            :line-height="5"
            :line-width="10"
            :group-count="2"
            :dot-spacing="0.05"
            :stroke-width="10"
            :duration="5"
            :dot-radius="4"
            flow-color="#00ff99"
          />
        </template>
      </template>
    </svg>
  </Teleport>
</template>
