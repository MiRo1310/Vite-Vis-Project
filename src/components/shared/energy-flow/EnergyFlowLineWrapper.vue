<script setup lang="ts">
import EnergyFlowLine from "@/components/shared/energy-flow/EnergyFlowLine.vue";
import { ILineObject } from "@/components/shared/energy-flow/index.ts";
import { Line } from "@/components/shared/energy-flow/line.ts";
import { Positions } from "@/components/shared/energy-flow/position.ts";
import { computed } from "vue";

const props = defineProps<{
  line: ILineObject<any>;
  id: number;
  positions: Positions<any>;
  animationRef: null | SVGGElement;
}>();

const l = computed(() => new Line(props.line.lineStart, props.line.lineEnd, props.line.value, props.line.options));
</script>

<template>
  <EnergyFlowLine
    v-if="l"
    :id="String(id)"
    :animation="l.getActive()"
    :reverse="l.getReverse()"
    :points="l.buildPath(positions)"
    :dots-per-group="l.getDotsPerRow()"
    :particle-shape="l.getParticleShape()"
    :speed="l.getSpeed()"
    :line-width="l.getLineWidth()"
    :line-height="l.getLineHeight()"
    :group-count="l.getGroupCount()"
    :spacing="l.getSpacing()"
    :stroke-width="l.getStrokeWidth()"
    :dot-radius="l.getDotRadius()"
    :flow-color="l.getFlowColorHex()"
    :track-color="l.getTrackColor()"
    :_clamp-radius="l.getClampRadius()"
    :animation-ref="animationRef"
  />
</template>
