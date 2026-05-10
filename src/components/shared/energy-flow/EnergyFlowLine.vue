<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { Point, TParticleShape } from "@/components/shared/energy-flow/index.ts";

const props = defineProps<{
  id: string;
  animationRef: null | SVGGElement;
  points: Point[];

  animation?: boolean;

  strokeWidth: number;

  particleShape: TParticleShape;
  lineWidth: number;
  lineHeight: number;

  trackColor: string;
  flowColor: string;

  dotsPerGroup: number;
  groupCount: number;

  /**
   * Abstand zwischen Dots
   */
  spacing: number;

  /**
   * Größe Dot
   */
  dotRadius: number;

  /**
   * Dauer komplette Strecke
   */
  speed: number;

  reverse: boolean;

  _clampRadius: number;
}>();

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

    const r = clampRadius(prev, current, next, props._clampRadius);

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

const pathRef = ref<SVGPathElement | null>(null);

const pathLength = ref(0);

const particles = ref<
  {
    animationPosition: number;
    offset: number;
  }[]
>([]);

const positions = ref<
  {
    x: number;
    y: number;
    angle: number;
  }[]
>([]);

function buildParticles() {
  const list = [];
  const length = pathLength.value;
  if (!length) {
    return;
  }
  const groupGap = 1 / props.groupCount;
  const dotGap = props.spacing / length;

  for (let group = 0; group < props.groupCount; group++) {
    for (let dot = 0; dot < props.dotsPerGroup; dot++) {
      const offset = group * groupGap + dot * dotGap;

      list.push({
        animationPosition: props.reverse ? 1 - offset : offset,
        offset,
      });
    }
  }
  particles.value = list;
}

async function updatePathLength() {
  await nextTick();

  pathLength.value = pathRef.value?.getTotalLength() ?? 0;
}
watch(
  () => [props.groupCount, props.dotsPerGroup, props.spacing, props.reverse, pathLength.value],
  () => {
    buildParticles();
  },
  {
    immediate: true,
  },
);

onMounted(async () => {
  await updatePathLength();
  startAnimation();
});

let animationFrame = 0;
let lastTime = performance.now();

function resetPositionGraterEnd(particle: { animationPosition: number; offset: number }) {
  if (particle.animationPosition > 1) {
    particle.animationPosition = 0;
  }
}

function resetPositionLessStart(particle: { animationPosition: number; offset: number }) {
  if (particle.animationPosition < 0) {
    particle.animationPosition = 1;
  }
}

function startAnimation() {
  cancelAnimationFrame(animationFrame);

  const animate = (time: number) => {
    const delta = (time - lastTime) / 1000;

    lastTime = time;

    const length = pathLength.value;

    if (pathRef.value && length > 0) {
      // eslint-disable-next-line complexity
      positions.value = particles.value.map((particle) => {
        const movement = (props.speed * delta) / length;

        particle.animationPosition += props.reverse ? -movement : movement;
        resetPositionGraterEnd(particle);
        resetPositionLessStart(particle);

        const currentLength = particle.animationPosition * length;

        const point = pathRef.value?.getPointAtLength(currentLength);

        const nextPoint = pathRef.value?.getPointAtLength(Math.min(length, currentLength + 1));

        const angle = (Math.atan2((nextPoint?.y ?? 0) - (point?.y ?? 0), (nextPoint?.x ?? 0) - (point?.x ?? 0)) * 180) / Math.PI;

        return {
          x: point?.x ?? 0,
          y: point?.y ?? 0,
          angle,
        };
      });
    }

    animationFrame = requestAnimationFrame(animate);
  };

  animationFrame = requestAnimationFrame(animate);
}

onUnmounted(() => {
  cancelAnimationFrame(animationFrame);
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
    <template v-for="(particle, index) in positions" :key="index">
      <circle v-if="particleShape === 'circle' && animation" :cx="particle.x" :cy="particle.y" :r="dotRadius" :fill="flowColor" />

      <rect
        v-else-if="animation"
        :x="particle.x - lineWidth / 2"
        :y="particle.y - lineHeight / 2"
        :width="lineWidth"
        :height="lineHeight"
        :rx="lineHeight / 2"
        :fill="flowColor"
        :transform="`
      rotate(
        ${particle.angle}
        ${particle.x}
        ${particle.y}
      )
    `"
      />
    </template>
  </Teleport>
  <!-- Unsichtbarer Pfad für Motion -->
  <path ref="pathRef" :id="`energy-path-${id}`" :d="pathData" fill="none" stroke="transparent" />
</template>
