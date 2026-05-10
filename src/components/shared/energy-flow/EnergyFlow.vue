<script setup lang="ts" generic="T extends string">
import { ref } from "vue";
import { Positions } from "@/components/shared/energy-flow/utils.ts";
import EnergyFlowCard from "@/components/shared/energy-flow/EnergyFlowCard.vue";
import EnergyFlowLine from "@/components/shared/energy-flow/EnergyFlowLine.vue";
import { IEnergyFlow } from "@/components/shared/energy-flow/index.ts";

defineProps<{ data: IEnergyFlow<T>[] }>();

const positions = new Positions<T>();
const animationRef = ref<null | SVGGElement>(null);
</script>

<template>
  <Teleport to="body">
    <svg width="90%" height="80%" class="energy-flow-line overflow-visible absolute top-20 left-10" xmlns="http://www.w3.org/2000/svg">
      <template v-for="(item, i) in data" :key="i">
        <EnergyFlowCard :energy-flow="item" :positions="positions" />
        <template v-for="(line, index) in item.lines" :key="index">
          <EnergyFlowLine
            :id="String(i)"
            :animation="line.getActive()"
            :reverse="line.getReverse()"
            :points="line.buildPath(positions)"
            :dots-per-group="line.getDotsPerRow()"
            :particle-shape="line.getParticleShape()"
            :speed="line.getSpeed()"
            :line-width="line.getLineWidth()"
            :line-height="line.getLineHeight()"
            :group-count="line.getGroupCount()"
            :spacing="line.getSpacing()"
            :stroke-width="line.getStrokeWidth()"
            :dot-radius="line.getDotRadius()"
            :flow-color="line.getFlowColorHex()"
            :track-color="line.getTrackColor()"
            :_clamp-radius="line.getClampRadius()"
            :animation-ref
          />
        </template>
      </template>
      <g ref="animationRef" id="svg-animations"></g>
    </svg>
  </Teleport>
</template>
