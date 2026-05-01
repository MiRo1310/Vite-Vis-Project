<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";

type Point = { x: number; y: number };

const props = defineProps<{
  start: Point;
  end: Point;
  // optional intermediate bend points (up to 2). If not provided and orthogonal=true, will auto-generate
  via?: Point[] | null;
  // when true create orthogonal path (Manhattan style)
  orthogonal?: boolean;
  // allow two 90° bends (Z-shape) when orthogonal and preferTwoBends true
  preferTwoBends?: boolean;
  width?: number;
  height?: number;
  color?: string;
  strokeWidth?: number;
  // animation duration seconds
  duration?: number;
  reversed?: boolean;
}>();

const {
  start,
  end,
  via = null,
  orthogonal = true,
  preferTwoBends = false,
  width = 400,
  height = 200,
  color = "#06b6d4",
  strokeWidth = 4,
  duration = 2.5,
  reversed = false,
} = props;

const pathRef = ref<SVGPathElement | null>(null);

function makeOrthogonalPath(s: Point, e: Point, twoBends: boolean): Point[] {
  // If twoBends false: single 90° bend at (s.x, e.y)
  if (!twoBends) {
    return [{ x: s.x, y: e.y }];
  }
  // two bends: create a short vertical offset (2rem) from the start, then horizontal, then vertical to end
  let remPx = 16;
  try {
    const fs = parseFloat(getComputedStyle(document.documentElement).fontSize || "16");
    if (!Number.isNaN(fs) && fs > 0) {
      remPx = fs;
    }
  } catch {
    // ignore
  }
  const offset = remPx * 2; // 2rem
  const dir = Math.sign(e.y - s.y) || 1;
  // first intermediate point: vertical offset from start
  const p1 = { x: s.x, y: s.y + dir * offset };
  // second intermediate point: horizontal to end.x at same y
  const p2 = { x: e.x, y: s.y + dir * offset };
  return [p1, p2];
}

const computedPoints = computed<Point[]>(() => {
  if (via && via.length > 0) {
    return via.slice(0, 2);
  }
  if (orthogonal) {
    return makeOrthogonalPath(start, end, preferTwoBends);
  }
  return [];
});

const allPoints = computed<Point[]>(() => [start, ...computedPoints.value, end]);

const pathD = computed(() => {
  const pts = allPoints.value;
  if (pts.length === 0) {
    return "";
  }
  return pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
});

onMounted(() => {
  // nothing heavy on mount anymore: we use a repeating dash pattern (so stroke-dasharray = "dash gap")
  // this prevents hiding the whole path when animating and avoids dependence on getTotalLength
  if (pathRef.value) {
    const remFallback = 16;
    try {
      const fs = parseFloat(getComputedStyle(document.documentElement).fontSize || "16");
      if (!Number.isNaN(fs) && fs > 0) {
        pathRef.value.style.setProperty("--rem-px", `${fs}`);
      } else {
        pathRef.value.style.setProperty("--rem-px", `${remFallback}`);
      }
    } catch {
      pathRef.value.style.setProperty("--rem-px", `${remFallback}`);
    }
    // default dash pattern (visible dashed animation). Using small dash+gap keeps the path visible.
    const dash = 20;
    const gap = 12;
    pathRef.value.style.strokeDasharray = `${dash} ${gap}`;
    pathRef.value.style.setProperty("--dash-cycle", `${dash + gap}px`);
    // start offset 0 (will be animated by CSS)
    pathRef.value.style.strokeDashoffset = "0";
  }
});

watch(pathD, () => {
  // when path changes, ensure stroke pattern remains set (we don't depend on path length)
  if (pathRef.value) {
    const dash = 20;
    const gap = 12;
    pathRef.value.style.strokeDasharray = `${dash} ${gap}`;
    pathRef.value.style.setProperty("--dash-cycle", `${dash + gap}px`);
    pathRef.value.style.strokeDashoffset = "0";
  }
});

const pathStyle = computed(() => {
  const dir = reversed ? "reverse" : "normal";
  // use CSS animation that moves the dash offset by one dash+gap cycle
  return {
    animation: `dash ${duration}s linear infinite`,
    animationDirection: dir,
  } as any;
});
</script>

<template>
  <svg :width="width" :height="height" :viewBox="`0 0 ${width} ${height}`" xmlns="http://www.w3.org/2000/svg" class="animated-line absolute z-100">
    <path
      ref="pathRef"
      :d="pathD"
      fill="none"
      :stroke="color"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
      stroke-linejoin="round"
      :style="pathStyle"
    />
  </svg>
</template>

<style scoped>
@keyframes dash {
  from {
    stroke-dashoffset: 0;
  }
  to {
    /* fallback to a sufficiently large negative offset so the repeating dash scrolls */
    stroke-dashoffset: -1000;
  }
}

.animated-line path {
  /* use CSS variable set by script if possible; fallback handled by inline style */
  stroke-linejoin: round;
  stroke-linecap: round;
}
</style>
