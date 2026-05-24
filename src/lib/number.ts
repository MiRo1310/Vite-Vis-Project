import { computed } from "vue";
import { TValue } from "@/components/shared/energy-flow";

export const sumNumbers = computed(() => (val: TValue) => {
  if (Array.isArray(val)) {
    return parseFloat(val.reduce((acc, val) => acc + val, 0).toFixed(2));
  }
  return parseFloat(val.toFixed(2));
});
