import { financeYearBtns, yearRange } from "@/lib/finance.ts";

describe("financeYearBtns", () => {
  it("should return count of years", () => {
    expect(financeYearBtns(2020, 2026)).toEqual(7);
    expect(financeYearBtns(2026, 2026)).toEqual(1);
  });
});

describe("yearRange", () => {
  it("lists all years from start to current year", () => {
    expect(yearRange(2025, 2026).list).toEqual([2025, 2026]);
    expect(yearRange(2023, 2026).list).toEqual([2023, 2024, 2025, 2026]);
  });

  it("returns an empty list when start is after current year", () => {
    expect(yearRange(2026, 2023).list).toEqual([]);
  });

  it("accepts a year inside the range", () => {
    expect(yearRange(2023, 2026).isValidYear(2024)).toBe(true);
  });

  it("rejects years outside the range and undefined", () => {
    const { isValidYear } = yearRange(2023, 2026);

    expect(isValidYear(2022)).toBe(false);
    expect(isValidYear(2027)).toBe(false);
    expect(isValidYear()).toBe(false);
  });
});
