import { computed } from "vue";

export interface AggregatedPerDay {
  localeDateString: string;
  count: number;
  key: string;
}

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

export const aggregatePerDay = computed(() => <T extends { date: Date; key: string }, K extends keyof T>(data: T[], key: K) => {
  return data.reduce((prev, curr) => {
    const newDate = new Date(curr.date).toLocaleDateString();

    const el = prev.find((e) => e.localeDateString === newDate);
    const value = curr[key];
    let currentCount: number;

    if (typeof value !== "number") {
      currentCount = 0;
    } else {
      currentCount = value;
    }

    if (!el) {
      prev.push({ localeDateString: newDate, count: currentCount, key: curr.key });
    } else {
      el.count += currentCount;
    }
    return prev;
  }, [] as AggregatedPerDay[]);
});
