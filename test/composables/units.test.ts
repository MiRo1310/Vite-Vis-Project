import { describe, it, expect, vi, beforeEach } from "vitest";
import {ref} from "vue";

// Mocks must be registered before importing the module under test.
vi.mock("@vue/apollo-composable", () => {
  
  const result = ref({ units: [{ id: "u1", name: "kg" }, { id: "u2", name: "l" }] });
  return {
    useLazyQuery: () => ({ load: vi.fn().mockResolvedValue(undefined), result, refetch: vi.fn().mockResolvedValue(undefined), loading: ref(false) }),
  };
});

vi.mock("@/composables/querys/options", () => ({
  getSelectableOptions: (units: any) => (units ? units.map((u: any) => ({ value: u.id, label: u.name })) : []),
}));

vi.mock("@/components/section/recipe-form/utils", () => ({
  getIdByName: (name: string, units: any) => units?.find((u: any) => u.name === name)?.id ?? "",
  getNameById: (id: string, units: any) => units?.find((u: any) => u.id === id)?.name ?? "",
}));

// Import module under test (use relative path from test folder)
import { useUnits } from "../../src/composables/querys/units";

describe("useUnits composable", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("exposes selectable options and helpers based on query result", () => {
    const u = useUnits();

    // selectableOptions is computed from the mocked units
    expect(u.selectableOptions.value).toEqual([
      { value: "u1", label: "kg" },
      { value: "u2", label: "l" },
    ]);

    // length and isResult
    expect(u.length.value).toBe(2);
    expect(Boolean(u.isResult.value)).toBe(true);

    // helper functions
    expect(u.getUnitNameById("u1")).toBe("kg");
    expect(u.getUnitIdByName("kg")).toBe("u1");

    // options mapping
    expect(u.getOptions.value).toEqual([
      { value: "u1", name: "kg" },
      { value: "u2", name: "l" },
    ]);

    // refetch exists
    expect(typeof u.refetch).toBe("function");
  });
});

