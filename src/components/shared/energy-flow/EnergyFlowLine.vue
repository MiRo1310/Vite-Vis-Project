<script setup lang="ts">
import { computed, ref } from "vue";
import { Point } from "@/components/shared/energy-flow/index.ts";
import EnergyFlowAnimate from "@/components/shared/energy-flow/EnergyFlowAnimate.vue";
import EnergyFlowAnimateMotion from "@/components/shared/energy-flow/EnergyFlowAnimateMotion.vue";

const props = withDefaults(
  defineProps<{
    id: string;
    points: Point[];

    animation?: boolean;

    radius?: number;
    strokeWidth?: number;

    particleShape?: "circle" | "line";
    lineWidth?: number;
    lineHeight?: number;

    trackColor?: string;
    flowColor?: string;

    dotsPerGroup?: number;
    groupCount?: number;

    /**
     * Abstand zwischen Dots
     */
    dotSpacing?: number;

    /**
     * Größe Dot
     */
    dotRadius?: number;

    /**
     * Dauer komplette Strecke
     */
    speed?: number;

    reverse?: boolean;
  }>(),
  {
    radius: 16,
    strokeWidth: 8,

    particleShape: "circle",
    lineHeight: 5,
    lineWidth: 10,

    trackColor: "#1e293b",
    flowColor: "#22c55e",

    dotsPerGroup: 3,
    groupCount: 2,

    dotSpacing: 0.12,
    dotRadius: 5,

    speed: 100,

    reverse: false,
  },
);

function clampRadius(prev: Point, current: Point, next: Point, radius: number) {
  const dist1 = Math.hypot(current.x - prev.x, current.y - prev.y);
  const dist2 = Math.hypot(next.x - current.x, next.y - current.y);

  return Math.min(radius, dist1 / 2, dist2 / 2);
}

const pathData = computed(() => {
  if (props.points.length < 2) {
    return "";
  }

  const pts = props.points.map((p) => ({
    x: p.x,
    y: p.y,
  }));
  let d = `M ${pts[0].x} ${pts[0].y}`;

  for (let i = 1; i < pts.length - 1; i++) {
    const prev = pts[i - 1];
    const current = pts[i];
    const next = pts[i + 1];

    const r = clampRadius(prev, current, next, props.radius);

    const dx1 = Math.sign(current.x - prev.x);
    const dy1 = Math.sign(current.y - prev.y);

    const dx2 = Math.sign(next.x - current.x);
    const dy2 = Math.sign(next.y - current.y);

    const start = {
      x: current.x - dx1 * r,
      y: current.y - dy1 * r,
    };

    const end = {
      x: current.x + dx2 * r,
      y: current.y + dy2 * r,
    };

    d += ` L ${start.x} ${start.y}`;
    d += ` Q ${current.x} ${current.y} ${end.x} ${end.y}`;
  }

  const last = pts[pts.length - 1];

  d += ` L ${last.x} ${last.y}`;

  return d;
});

const duration = computed(() => {
  const duration = (pathRef.value?.getTotalLength() ?? 0) / props.speed;
  return duration === 0 ? 4 : duration;
});

const getBegin = computed(() => (groupIndex: number, dotIndex = 0) => {
  const groupOffset = (duration.value / props.groupCount) * groupIndex;

  const dotOffset = duration.value * props.dotSpacing * dotIndex;

  return -(groupOffset + dotOffset);
});

const pathRef = ref<SVGPathElement | null>(null);
</script>

<template>
  <!-- Hintergrundlinie -->
  <path :d="pathData" fill="none" :stroke="trackColor" :stroke-width="strokeWidth" stroke-linecap="round" stroke-linejoin="round" />

  <!-- Dot Gruppen -->
  <g v-for="groupIndex in groupCount" :key="groupIndex">
    <template v-for="dotIndex in dotsPerGroup" :key="dotIndex">
      <!-- Kreise -->
      <circle v-if="particleShape === 'circle'" :r="dotRadius" :fill="flowColor">
        <EnergyFlowAnimateMotion v-if="animation" :id :duration :begin="`${getBegin(groupIndex - 1, dotIndex - 1)}s`" :reverse />
        <EnergyFlowAnimate :duration :begin="`${getBegin(groupIndex - 1, dotIndex - 1)}s`" />
      </circle>

      <!-- Linien/Balken -->
      <rect v-else :width="lineWidth" :height="lineHeight" :rx="lineHeight / 2" :fill="flowColor" :x="-lineWidth / 2" :y="-lineHeight / 2">
        <EnergyFlowAnimateMotion v-if="animation" :id :duration :begin="`${getBegin(groupIndex - 1, dotIndex - 1)}s`" :reverse />
        <EnergyFlowAnimate :duration :begin="`${getBegin(groupIndex - 1, dotIndex - 1)}s`" />
      </rect>
    </template>
  </g>

  <!-- Unsichtbarer Pfad für Motion -->
  <path ref="pathRef" :id="`energy-path-${id}`" :d="pathData" fill="none" stroke="transparent" />
</template>
