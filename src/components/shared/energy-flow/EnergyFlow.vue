<script setup lang="ts">
import EnergyFlowCard from "@/components/shared/energy-flow/EnergyFlowCard.vue";
import { computed, ref } from "vue";
import { IEnergyFlow } from "@/components/shared/energy-flow/index.ts";
import { Line, Positions } from "@/components/shared/energy-flow/utils.ts";

const value = ref(500);
setInterval(() => {
  value.value = Math.round(Math.random() * 500);
}, 2000);

const data = computed((): IEnergyFlow[] => [
  {
    id: "battery",
    title: "Speicher",
    padding: 10,
    lines: [new Line("battery", "pv", "leftRightCenter")],
    out: { value: value.value, unit: "W", class: "text-green-400", reverse: true },
    in: { value: 100 },
  },
  {
    id: "pv",
    title: "PV",
    padding: 10,
    lines: [new Line("pv", "test", "leftRightCenter")],
    out: { value: 2000, unit: "W", class: "text-green-600" },
    in: { value: 100 },
  },
  { id: "test", title: "PV", padding: 10, lines: [], out: { value: 2000, unit: "W", class: "text-green-600" } },
  { id: "", title: "", lines: [] },
  { id: "", title: "", lines: [] },
  {
    id: "2",
    title: "Test",
    padding: 10,
    lines: [new Line("pv", "2", "bottomTopCenter")],
    out: { value: 2000, unit: "W", class: "text-green-600" },
    in: { value: 100 },
  },
]);

const positions = new Positions();
</script>

<template>
  <div class="grid grid-cols-4 gap-4">
    <template v-for="(item, index) in data" :key="index">
      <EnergyFlowCard :energy-flow="item" :positions="positions" :indexForId="index" />
    </template>
  </div>
</template>
