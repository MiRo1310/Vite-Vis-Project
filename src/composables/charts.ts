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

export const aggregatePerDay = computed(() => <T extends { date: Date }, K extends keyof T>(data: T[], key: K) => {
  return data.reduce(
    (prev, curr) => {
      const newDate = new Date(curr.date).toLocaleDateString();

      const el = prev.find((e) => e.date === newDate);
      const value = curr[key];
      let currentCount;

      if ((!typeof value as unknown) === "number") {
        currentCount = 0;
      } else {
        currentCount = value as unknown as number;
      }

      if (!el) {
        prev.push({ date: newDate, count: currentCount ?? 0 });
      } else {
        el.count += currentCount ?? 0;
      }
      return prev;
    },
    [] as { date: string; count: number }[],
  );
});
