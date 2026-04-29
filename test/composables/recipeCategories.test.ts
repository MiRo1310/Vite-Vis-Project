import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock '@vue/apollo-composable' before importing the composable
vi.mock("@vue/apollo-composable", () => {
  const load = vi.fn().mockResolvedValue(undefined);
  const refetch = vi.fn().mockResolvedValue(undefined);
  const result = { value: { recipeCategories: [{ id: "id1", name: "Cat1" }, { id: "id2", name: "Cat2" }] } };
  const loading = { value: false };
  return {
    useLazyQuery: () => ({ load, result, refetch, loading }),
    __mocks: { load, refetch },
  };
});

// Mock internal helpers (use relative paths)
vi.mock("../../src/composables/querys/options", () => ({
  getSelectableOptions: (arr: any) => (arr ? arr.map((a: any) => ({ value: a.id, label: a.name })) : []),
}));

vi.mock("../../src/components/section/recipe-form/utils", () => ({
  getIdByName: (name: string, arr: any) => arr?.find((a: any) => a.name === name)?.id ?? "",
  getNameById: (id: string, arr: any) => arr?.find((a: any) => a.id === id)?.name ?? "",
}));

vi.mock("../../src/composables/querys/utils.ts", () => {
  const invalidateMock = vi.fn().mockResolvedValue(undefined);
  return { invalidateCache: invalidateMock, __mocks: { invalidateMock } };
});

// Import module under test AFTER mocks
import { useRecipeCategories } from "../../src/composables/querys/recipeCategories";

describe("useRecipeCategories", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("provides selectable options and helpers and calls invalidate/refresh", async () => {
    // access mocked apollo helpers
    const apollo = await import("@vue/apollo-composable");
    const { __mocks } = apollo as any;

    const comp = useRecipeCategories();

    // check mapped selectableOptions
    expect(comp.selectableOptions.value).toEqual([
      { value: "id1", label: "Cat1" },
      { value: "id2", label: "Cat2" },
    ]);

    expect(comp.length.value).toBe(2);
    expect(Boolean(comp.isResult.value)).toBe(true);

    expect(comp.getCategoryNameById("id1")).toBe("Cat1");
    expect(comp.getCategoryIdByName("Cat2")).toBe("id2");

    // invalidateCache calls underlying invalidate
    const utils = await import("../../src/composables/querys/utils.ts");
    const utilsMocks = (utils as any).__mocks;
    await comp.invalidateCache();
    expect(utilsMocks.invalidateMock).toHaveBeenCalledWith("recipeCategories");

    // reload should call invalidate, load and refetch
    await comp.reload();
    expect(utilsMocks.invalidateMock).toHaveBeenCalled();
    expect(__mocks.load).toHaveBeenCalled();
    expect(__mocks.refetch).toHaveBeenCalled();
  });
});

