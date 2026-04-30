import { beforeEach, describe, expect, it, vi } from "vitest";
// Import module under test AFTER mocks
import { fieldNameProductCategories, refetchQueryProductCategories, useProductCategories } from "../../src/composables/querys/productCategories";

// Mock '@vue/apollo-composable' before importing the composable
vi.mock("@vue/apollo-composable", () => {
  const load = vi.fn().mockResolvedValue(undefined);
  const refetch = vi.fn().mockResolvedValue(undefined);
  const result = {
    value: {
      productCategories: [
        { id: "p1", name: "P1" },
        { id: "p2", name: "P2" },
      ],
    },
  };
  const loading = { value: false };
  return {
    useLazyQuery: () => ({ load, result, refetch, loading }),
    __mocks: { load, refetch },
  };
});

// Mock internal helpers using relative imports (test folder -> src)
vi.mock("../../src/composables/querys/options", () => ({
  getSelectableOptions: (arr: any) => (arr ? arr.map((a: any) => ({ value: a.id, label: a.name })) : []),
}));

vi.mock("../../src/components/section/recipe-form/utils", () => ({
  getIdByName: (name: string, arr: any) => arr?.find((a: any) => a.name === name)?.id ?? "",
  getNameById: (id: string, arr: any) => arr?.find((a: any) => a.id === id)?.name ?? "",
}));

// Mock invalidateCache factory-style to avoid hoisting issues
vi.mock("../../src/composables/querys/utils.ts", () => {
  const invalidateMock = vi.fn().mockResolvedValue(undefined);
  return { invalidateCache: invalidateMock, __mocks: { invalidateMock } };
});

describe("useProductCategories", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("maps selectableOptions and returns helpers and calls invalidate/reload", async () => {
    const apollo = await import("@vue/apollo-composable");
    const { __mocks } = apollo as any;

    const comp = useProductCategories();

    expect(comp.selectableOptions.value).toEqual([
      { value: "p1", label: "P1" },
      { value: "p2", label: "P2" },
    ]);

    expect(comp.length.value).toBe(2);
    expect(Boolean(comp.isResult.value)).toBe(true);

    expect(comp.getCategoryNameById("p1")).toBe("P1");
    expect(comp.getCategoryIdByName("P2")).toBe("p2"); // no matching name -> empty

    // check exported constants
    expect(fieldNameProductCategories).toBe("productCategories");
    expect(refetchQueryProductCategories).toBe("ProductCategories");

    // use utils mock
    const utils = await import("../../src/composables/querys/utils.ts");
    const utilsMocks = (utils as any).__mocks;

    await comp.invalidateCache();
    expect(utilsMocks.invalidateMock).toHaveBeenCalledWith("productCategories");

    // reload should call invalidate, load and refetch
    await comp.reload();
    expect(utilsMocks.invalidateMock).toHaveBeenCalled();
    expect(__mocks.load).toHaveBeenCalled();
    expect(__mocks.refetch).toHaveBeenCalled();
  });
});
