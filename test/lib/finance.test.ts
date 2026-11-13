import { financeYearBtns, getCellClasses, formatAddress, getYearFilter, getAddressOptions, getDescriptionOptions, type TravelCostRow, yearRange } from "@/lib/finance.ts";
import { descriptionUncheckedColor, financeListTextColorMapping } from "@/constants/finance.ts";
import { type TravelCostListingAddress } from "@/types/types.ts";

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

describe("getCellClasses", () => {
  it("Should get color for text with key", () => {
    financeListTextColorMapping.forEach(([key, value]) => {
      expect(getCellClasses({ hasInvoice: true, isValidated: true, description: `Das sind meine ${key}` } as TravelCostRow)).toBe(value);
    });
  });

  it("Should get color for first find", () => {
    const firstKey = financeListTextColorMapping[0][0];
    const secondKey = financeListTextColorMapping[1][0];
    expect(getCellClasses({ hasInvoice: true, isValidated: true, description: `Das sind meine ${secondKey} für ${firstKey}` } as TravelCostRow)).toBe(
      financeListTextColorMapping[0][1],
    );
  });

  it("Should get also color if text is included and in UPPERCASE", () => {
    expect(getCellClasses({ hasInvoice: true, isValidated: true, description: "Das sind meine RECHNUNGEN" } as TravelCostRow)).toBe(
      financeListTextColorMapping[1][1],
    );
  });

  it("Should get empty string if text is empty", () => {
    expect(getCellClasses({ hasInvoice: true, isValidated: true, description: "" } as TravelCostRow)).toBe(descriptionUncheckedColor);
  });

  it("Should get empty string if text is null", () => {
    expect(getCellClasses({ hasInvoice: true, isValidated: true, description: null } as TravelCostRow)).toBe(descriptionUncheckedColor);
  });

  it("Should get empty string if hasInvoice is false", () => {
    expect(getCellClasses({ hasInvoice: false, isValidated: true, description: "Das sind meine RECHNUNGEN" } as TravelCostRow)).toBe(
      descriptionUncheckedColor,
    );
  });

  it("Should get empty string if isValidated is false", () => {
    expect(getCellClasses({ hasInvoice: true, isValidated: false, description: "Das sind meine RECHNUNGEN" } as TravelCostRow)).toBe(
      descriptionUncheckedColor,
    );
  });

  it("Should get empty string if both are false", () => {
    expect(getCellClasses({ hasInvoice: false, isValidated: false, description: "Das sind meine RECHNUNGEN" } as TravelCostRow)).toBe(
      descriptionUncheckedColor,
    );
  });
});

describe("formatAddress", () => {
  it("returns street and city separated by comma", () => {
    const address: TravelCostListingAddress = { city: "Musterstadt", name: "Max Mustermann", street: "Musterstraße 1" };
    expect(formatAddress(address)).toBe("Musterstraße 1, Musterstadt");
  });

  it("returns street if city is null", () => {
    const address: TravelCostListingAddress = { city: null, name: "Max Mustermann", street: "Musterstraße 1" };
    expect(formatAddress(address)).toBe("Musterstraße 1");
  });

  it("returns street if city is empty String", () => {
    const address: TravelCostListingAddress = { city: "", name: "Max Mustermann", street: "Musterstraße 1" };
    expect(formatAddress(address)).toBe("Musterstraße 1");
  });

  it("returns city if street is null", () => {
    const address: TravelCostListingAddress = { city: "Musterstadt", name: "Max Mustermann", street: null };
    expect(formatAddress(address)).toBe("Musterstadt");
  });

  it("returns city if street is empty string", () => {
    const address: TravelCostListingAddress = { city: "Musterstadt", name: "Max Mustermann", street: "" };
    expect(formatAddress(address)).toBe("Musterstadt");
  });

  it("returns empty string if city and street are null", () => {
    const address: TravelCostListingAddress = { city: null, name: "Max Mustermann", street: null };
    expect(formatAddress(address)).toBe("");
  });

  it("returns empty string if city and street are empty string", () => {
    const address: TravelCostListingAddress = { city: "", name: "Max Mustermann", street: "" };
    expect(formatAddress(address)).toBe("");
  });

  it("returns empty string if address is null", () => {
    expect(formatAddress(null)).toBe("");
  });
});

describe("getYearFilter", () => {
  it("filters from the first to the last day of the year", () => {
    expect(getYearFilter(2026)).toEqual({
      and: [{ date: { lte: "2026-12-31" } }, { date: { gte: "2026-01-01" } }],
    });
  });

  it("accepts the year as string", () => {
    expect(getYearFilter("2025")).toEqual(getYearFilter(2025));
  });
});

describe("getAddressOptions", () => {
  it("maps addresses to input options", () => {
    const addresses = [
      { id: "a1", name: "Firma" },
      { id: "a2", name: "Kunde" },
    ];
    expect(getAddressOptions(addresses)).toEqual([
      { value: "a1", name: "Firma" },
      { value: "a2", name: "Kunde" },
    ]);
  });

  it("filters out addresses without a name", () => {
    const addresses = [
      { id: "a1", name: null },
      { id: "a2", name: "Kunde" },
    ];
    expect(getAddressOptions(addresses)).toEqual([{ value: "a2", name: "Kunde" }]);
  });

  it("keeps addresses with an empty name", () => {
    expect(getAddressOptions([{ id: "a1", name: "" }])).toEqual([{ value: "a1", name: "" }]);
  });

  it("returns an empty array for undefined or an empty list", () => {
    expect(getAddressOptions()).toEqual([]);
    expect(getAddressOptions([])).toEqual([]);
  });
});

describe("getDescriptionOptions", () => {
  it("maps descriptions to select options with text as label and value", () => {
    const descriptions = [
      { id: "d1", text: "Fahrt" },
      { id: "d2", text: "Material" },
    ];
    expect(getDescriptionOptions(descriptions)).toEqual([
      { label: "Fahrt", value: "Fahrt" },
      { label: "Material", value: "Material" },
    ]);
  });

  it("returns an empty array for undefined or an empty list", () => {
    expect(getDescriptionOptions()).toEqual([]);
    expect(getDescriptionOptions([])).toEqual([]);
  });
});
