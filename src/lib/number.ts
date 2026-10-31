import { computed } from "vue";
import { type TValue } from "@/components/shared/energy-flow";

export const sumNumbers = computed(() => (val: TValue) => {
  if (Array.isArray(val)) {
    return parseFloat(val.reduce((acc, value) => acc + value, 0).toFixed(2));
  }
  return parseFloat(val.toFixed(2));
});

export function clamp(value: number, min?: number, max?: number): number {
  if (min !== undefined && value < min) {
    return min;
  }
  if (max !== undefined && value > max) {
    return max;
  }
  return value;
}
