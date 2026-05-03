<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { Point } from "@/components/shared/energy-flow/index.ts";
import EnergyFlowAnimate from "@/components/shared/energy-flow/EnergyFlowAnimate.vue";
import EnergyFlowAnimateMotion from "@/components/shared/energy-flow/EnergyFlowAnimateMotion.vue";
import { TParticleShape } from "@/components/shared/energy-flow/utils.ts";

const props = withDefaults(
  defineProps<{
    id: string;
    animationRef: null | SVGGElement;
    points: Point[];

    animation?: boolean;

    radius?: number;
    strokeWidth?: number;

    particleShape?: TParticleShape;
    lineWidth?: number;
    lineHeight?: number;

    trackColor?: string;
    flowColor?: string;

    dotsPerGroup?: number;
    groupCount?: number;

    /**
     * Abstand zwischen Dots
     */
    spacing?: number;

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

    spacing: 0.12,
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

const basePathLength = ref<number>(0);
const pathRef = ref<SVGPathElement | null>(null);

onMounted(async () => {
  await nextTick();
  basePathLength.value = pathRef.value?.getTotalLength() ?? 0;
});

const duration = computed(() => {
  const duration = (basePathLength.value ?? 0) / props.speed;
  return duration === 0 ? 4 : duration;
});

const getBegin = computed(() => (groupIndex: number, dotIndex = 0) => {
  const groupOffset = (duration.value / props.groupCount) * groupIndex;

  const dotOffset = props.spacing * dotIndex;

  return -(groupOffset + dotOffset);
});

watch(
  () => props.animationRef,
  (newValue) => {
    if (newValue) {
      animationRefExist.value = true;
    }
  },
);
const animationRefExist = ref<boolean>(false);
</script>

<template>
  <!-- Hintergrundlinie -->
  <path :d="pathData" fill="none" :stroke="trackColor" :stroke-width="strokeWidth" stroke-linecap="round" stroke-linejoin="round" />

  <!-- Dot Gruppen -->
  <Teleport v-if="animationRefExist" to="#svg-animations">
    <g v-if="pathRef?.getTotalLength()">
      <g v-for="groupIndex in groupCount" :key="groupIndex">
        <template v-for="dotIndex in dotsPerGroup" :key="dotIndex">
          <!-- Kreise -->
          <circle v-if="particleShape === 'circle' && animation" :r="dotRadius" :fill="flowColor">
            <EnergyFlowAnimateMotion :id :duration :begin="`${getBegin(groupIndex - 1, dotIndex - 1)}s`" :reverse />
            <EnergyFlowAnimate :duration :begin="`${getBegin(groupIndex - 1, dotIndex - 1)}s`" />
          </circle>

          <!-- Linien/Balken -->
          <rect
            v-else-if="animation"
            :width="lineWidth"
            :height="lineHeight"
            :rx="lineHeight / 2"
            :fill="flowColor"
            :x="-lineWidth / 2"
            :y="-lineHeight / 2"
          >
            <EnergyFlowAnimateMotion :id :duration :begin="`${getBegin(groupIndex - 1, dotIndex - 1)}s`" :reverse />
            <EnergyFlowAnimate :duration :begin="`${getBegin(groupIndex - 1, dotIndex - 1)}s`" />
          </rect>
        </template>
      </g>
    </g>
  </Teleport>
  <!-- Unsichtbarer Pfad für Motion -->
  <path ref="pathRef" :id="`energy-path-${id}`" :d="pathData" fill="none" stroke="transparent" />
</template>
