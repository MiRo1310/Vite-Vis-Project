import { computed } from "vue";

export const xDomainSynchronized = computed(() => (dates: { date: Date }[][]): Date[] | undefined => {
  const all = dates.flat();
  if (!all.length) {
    return;
  }
  const times = all.map((d) => d.date.getTime());
  const min = Math.min(...times);
  const max = Math.max(...times);
  return [new Date(min), new Date(max)];
});
