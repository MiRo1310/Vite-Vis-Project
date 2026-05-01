<script setup lang="ts">
import { computed } from "vue";
import { Point } from "@/components/shared/energy-flow/index.ts";

const props = withDefaults(
  defineProps<{
    points: Point[];

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
    duration?: number;

    reverse?: boolean;

    padding?: number;
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

    duration: 4,

    reverse: false,

    padding: 20,
  },
);

function clampRadius(prev: Point, current: Point, next: Point, radius: number) {
  const dist1 = Math.hypot(current.x - prev.x, current.y - prev.y);
  const dist2 = Math.hypot(next.x - current.x, next.y - current.y);

  return Math.min(radius, dist1 / 2, dist2 / 2);
}

const bounds = computed(() => {
  const xs = props.points.map((p) => p.x);
  const ys = props.points.map((p) => p.y);

  return {
    minX: Math.min(...xs),
    minY: Math.min(...ys),
    maxX: Math.max(...xs),
    maxY: Math.max(...ys),
  };
});

const svgWidth = computed(() => {
  return bounds.value.maxX - bounds.value.minX + props.padding * 2;
});

const svgHeight = computed(() => {
  return bounds.value.maxY - bounds.value.minY + props.padding * 2;
});

function normalizePoint(p: Point): Point {
  return {
    x: p.x - bounds.value.minX + props.padding,
    y: p.y - bounds.value.minY + props.padding,
  };
}

const pathData = computed(() => {
  if (props.points.length < 2) {
    return "";
  }

  const pts = props.points.map(normalizePoint);

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

function getBegin(groupIndex: number, dotIndex = 0) {
  const groupOffset = (props.duration / props.groupCount) * groupIndex;

  const dotOffset = props.duration * props.dotSpacing * dotIndex;

  return -(groupOffset + dotOffset);
}
</script>

<template>
  <svg :width="svgWidth" :height="svgHeight" class="energy-flow-line overflow-visible display-block absolute" xmlns="http://www.w3.org/2000/svg">
    <!-- Hintergrundlinie -->
    <path :d="pathData" fill="none" :stroke="trackColor" :stroke-width="strokeWidth" stroke-linecap="round" stroke-linejoin="round" />

    <!-- Dot Gruppen -->
    <g v-for="groupIndex in groupCount" :key="groupIndex">
      <template v-for="dotIndex in dotsPerGroup" :key="dotIndex">
        <!-- Kreise -->
        <circle v-if="particleShape === 'circle'" :r="dotRadius" :fill="flowColor">
          <animateMotion
            :dur="`${duration}s`"
            repeatCount="indefinite"
            :begin="`${getBegin(groupIndex - 1, dotIndex - 1)}s`"
            :keyPoints="reverse ? '1;0' : '0;1'"
            keyTimes="0;1"
            calcMode="linear"
            rotate="auto"
          >
            <mpath href="#energy-path" />
          </animateMotion>

          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.1;0.9;1"
            :dur="`${duration}s`"
            repeatCount="indefinite"
            :begin="`${getBegin(groupIndex - 1, dotIndex - 1)}s`"
          />
        </circle>

        <!-- Linien/Balken -->
        <rect v-else :width="lineWidth" :height="lineHeight" :rx="lineHeight / 2" :fill="flowColor" :x="-lineWidth / 2" :y="-lineHeight / 2">
          <animateMotion
            :dur="`${duration}s`"
            repeatCount="indefinite"
            :begin="`${getBegin(groupIndex - 1, dotIndex - 1)}s`"
            :keyPoints="reverse ? '1;0' : '0;1'"
            keyTimes="0;1"
            calcMode="linear"
            rotate="auto"
          >
            <mpath href="#energy-path" />
          </animateMotion>

          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.1;0.9;1"
            :dur="`${duration}s`"
            repeatCount="indefinite"
            :begin="`${getBegin(groupIndex - 1, dotIndex - 1)}s`"
          />
        </rect>
      </template>
    </g>

    <!-- Unsichtbarer Pfad für Motion -->
    <path id="energy-path" :d="pathData" fill="none" stroke="transparent" />
  </svg>
</template>
