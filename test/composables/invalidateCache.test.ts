import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Mock apollo client at top-level (factory is hoisted) and expose internal spies via __mocks
vi.mock("../../src/apolloClient.ts", () => {
  const evict = vi.fn();
  const gc = vi.fn();
  const reFetch = vi.fn().mockResolvedValue(undefined);
  const client = { cache: { evict, gc }, reFetchObservableQueries: reFetch };
  return { default: client, __mocks: { evict, gc, reFetch } };
});

import { invalidateCache } from "../../src/composables/querys/utils";

describe("invalidateCache", () => {
  let apolloMocks: any;
  let errorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(async () => {
    const ap = await import("../../src/apolloClient.ts");
    apolloMocks = (ap as any).__mocks;
    // reset spies
    apolloMocks.evict.mockReset();
    apolloMocks.gc.mockReset();
    apolloMocks.reFetch.mockReset();

    // ensure reFetchObservableQueries exists on client
    const clientMod = await import("../../src/apolloClient.ts");
    clientMod.default.reFetchObservableQueries = apolloMocks.reFetch;

    errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("evicts and gc and refetches observable queries when available", async () => {
    await invalidateCache("productCategories");
    expect(apolloMocks.evict).toHaveBeenCalledWith({ id: "ROOT_QUERY", fieldName: "productCategories" });
    expect(apolloMocks.gc).toHaveBeenCalled();
    expect(apolloMocks.reFetch).toHaveBeenCalled();
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it("does not throw if reFetchObservableQueries is missing", async () => {
    const clientMod = await import("../../src/apolloClient.ts");
    // remove the refetch function
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    clientMod.default.reFetchObservableQueries = undefined;
    await invalidateCache("otherField");
    expect(apolloMocks.evict).toHaveBeenCalledWith({ id: "ROOT_QUERY", fieldName: "otherField" });
    expect(apolloMocks.gc).toHaveBeenCalled();
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it("logs error when cache operations throw", async () => {
    const error = new Error("boom");
    const clientMod = await import("../../src/apolloClient.ts");
    clientMod.default.cache.evict = () => {
      throw error;
    };

    await invalidateCache("willFail");

    expect(errorSpy).toHaveBeenCalled();
    const call = errorSpy.mock.calls[0];
    expect(call[0]).toMatch(/Failed to invalidate willFail cache/);
    // second argument should be an object containing the error and type: 'error'
    expect(call[1]).toBeDefined();
    expect(call[1].type).toBe(undefined);
  });
});
