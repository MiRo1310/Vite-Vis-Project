<template>
  <svg :width="svgWidth" :height="svgHeight" class="energy-flow-line" xmlns="http://www.w3.org/2000/svg">
    <!-- Hintergrund -->
    <path :d="pathData" fill="none" :stroke="trackColor" :stroke-width="strokeWidth" stroke-linecap="round" stroke-linejoin="round" />

    <!-- Bewegte Linie -->
    <path
      :d="pathData"
      fill="none"
      :stroke="flowColor"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke-dasharray="computedDashArray"
      :style="animatedStyle"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";

type Point = {
  x: number;
  y: number;
};

const props = withDefaults(
  defineProps<{
    points: Point[];

    radius?: number;
    strokeWidth?: number;

    trackColor?: string;
    flowColor?: string;

    /**
     * dots | bars
     */
    animation?: "dots" | "bars";

    /**
     * Animationsdauer
     */
    duration?: number;

    /**
     * Richtung umdrehen
     */
    reverse?: boolean;

    /**
     * Größe eines Dots/Balkens
     */
    segmentSize?: number;

    /**
     * Abstand dazwischen
     */
    gapSize?: number;

    padding?: number;
  }>(),
  {
    radius: 16,
    strokeWidth: 8,

    trackColor: "#1e293b",
    flowColor: "#22c55e",

    animation: "dots",

    duration: 2,
    reverse: false,

    segmentSize: 10,
    gapSize: 18,

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

/**
 * Dash-Konfiguration
 *
 * dots:
 *   kleiner sichtbarer Bereich
 *
 * bars:
 *   längerer sichtbarer Bereich
 */
const computedDashArray = computed(() => {
  return `${props.segmentSize} ${props.gapSize}`;
});

const animatedStyle = computed(() => {
  const total = props.segmentSize + props.gapSize;

  return {
    animation: `flowMove ${props.duration}s linear infinite`,
    animationDirection: props.reverse ? "reverse" : "normal",
    strokeDashoffset: 0,
    "--flow-distance": `${total}px`,
  };
});
</script>

<style scoped>
.energy-flow-line {
  overflow: visible;
  display: block;
}

@keyframes flowMove {
  from {
    stroke-dashoffset: 0;
  }

  to {
    stroke-dashoffset: calc(var(--flow-distance) * -1);
  }
}
</style>
