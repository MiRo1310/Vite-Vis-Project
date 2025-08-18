import { SelectOption } from "@/components/shared/select/select.vue";
import { computed } from "vue";

export const sortedHeaders = computed(() => <T extends { position: number }>(array: (T | null)[]): T[] => {
  if (!Array.isArray(array)) return [] as T[];
  return ([...array] as { position: number }[]).sort((a, b) => {
    if (!a.position || !b.position) return 0;
    return a.position - b.position;
  }) as T[];
});

export function tempArray() {
  const array: SelectOption[] = [];
  for (let i = 5; i < 31; i++) {
    if (i === 5) {
      array.push({
        label: "Aus",
        val: "0",
      });
    }
    array.push({
      label: i.toString(),
      val: i.toString(),
    });
  }
  return array;
}
