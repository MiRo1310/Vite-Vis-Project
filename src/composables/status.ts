import { computed } from "vue";

export const activeStatus = computed(() => (val: boolean) => {
  return { value: val ? "An" : "Aus", valueClass: val ? "text-green-200" : "text-red-200" };
});
