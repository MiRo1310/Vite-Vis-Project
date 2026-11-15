import { useWindowSize } from "@vueuse/core";
import { computed } from "vue";

const { width, height } = useWindowSize();
interface Screen {
  name: ScreenDevice;
  width: number;
  height: number;
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
}

interface Breakpoints {
  minWidth: number;
  name: ScreenDevice;
}

export type ScreenDevice = "desktop" | "tablet" | "mobile";

const breakpoints: Breakpoints[] = [
  { minWidth: 1240, name: "desktop" },
  { minWidth: 800, name: "tablet" },
  { minWidth: 0, name: "mobile" },
];

export function getScreenDevice(_width: number): ScreenDevice {
  return breakpoints.find((b) => _width >= b.minWidth)?.name ?? "mobile";
}
const screenDevice = computed(() => getScreenDevice(width.value));

const isDesktop = computed(() => screenDevice.value === "desktop");
const isTablet = computed(() => screenDevice.value === "tablet");
const isMobile = computed(() => screenDevice.value === "mobile");

export const screen = computed((): Screen => ({
  width: width.value,
  height: height.value,
  name: screenDevice.value,
  isDesktop: isDesktop.value,
  isMobile: isMobile.value,
  isTablet: isTablet.value,
}));
