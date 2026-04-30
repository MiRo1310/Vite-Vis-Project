import { describe, it, expect } from "vitest";
import { AggregatedPerDay, aggregatePerDay, xDomainSynchronized } from "../../src/composables/charts";

describe("charts -> xDomainSynchronized", () => {
  it("xDomainSynchronized with none value", () => {
    const dates: { date: Date }[][] = [[]];

    const xDomain = xDomainSynchronized.value(dates);
    expect(xDomain).toBeUndefined();
  });

  it("xDomainSynchronized with one value", () => {
    const oldestDate = new Date("2020-01-01");
    const dates: { date: Date }[][] = [[{ date: oldestDate }]];

    const xDomain = xDomainSynchronized.value(dates);
    expect(xDomain).toBeDefined();
    expect(xDomain?.[0]).toStrictEqual(oldestDate);
    expect(xDomain?.[1]).toStrictEqual(oldestDate);
  });

  it("xDomainSynchronized with multi value", () => {
    const oldestDate = new Date("2020-01-01");
    const newestDate = new Date("2026-01-01");
    const dates: { date: Date }[][] = [
      [{ date: oldestDate }, { date: new Date("2023-10-03") }],
      [{ date: new Date("2023-02-03") }, { date: newestDate }],
    ];

    const xDomain = xDomainSynchronized.value(dates);
    expect(xDomain).toBeDefined();
    expect(xDomain?.[0]).toStrictEqual(oldestDate);
    expect(xDomain?.[1]).toStrictEqual(newestDate);
  });
});

describe("charts -> aggregate per day", () => {
  it("should get aggregated values", () => {
    const aggregated = aggregatePerDay.value(
      [
        { date: new Date("2020-01-01"), value: 1, key: "1" },
        { date: new Date("2020-01-01"), value: 2, key: "1" },
        { date: new Date("2020-01-02"), value: 5, key: "3" },
      ],
      "value",
    );

    expect(aggregated).toHaveLength(2);
    const expected: AggregatedPerDay = { localeDateString: new Date("2020-01-01").toLocaleDateString(), count: 3, key: "1" };
    const expected2: AggregatedPerDay = { localeDateString: new Date("2020-01-02").toLocaleDateString(), count: 5, key: "3" };
    expect(aggregated[0]).toStrictEqual(expected);
    expect(aggregated[1]).toStrictEqual(expected2);
  });

  it("aggregatedPerDay with one none number", () => {
    const aggregated = aggregatePerDay.value(
      [
        { date: new Date("2020-01-01"), value: "a", key: "1" },
        { date: new Date("2020-01-01"), value: 2, key: "1" },
        { date: new Date("2020-01-02"), value: 5, key: "3" },
        { date: new Date("2020-01-05"), value: 5, key: "3" },
      ],
      "value",
    );

    expect(aggregated).toHaveLength(3);
    const expected: AggregatedPerDay = { localeDateString: new Date("2020-01-01").toLocaleDateString(), count: 2, key: "1" };
    const expected2: AggregatedPerDay = { localeDateString: new Date("2020-01-02").toLocaleDateString(), count: 5, key: "3" };
    const expected3: AggregatedPerDay = { localeDateString: new Date("2020-01-05").toLocaleDateString(), count: 5, key: "3" };
    expect(aggregated[0]).toStrictEqual(expected);
    expect(aggregated[1]).toStrictEqual(expected2);
    expect(aggregated[2]).toStrictEqual(expected3);
  });
});
