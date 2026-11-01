import { afterEach, describe, expect, it } from "vitest";
import { createId } from "@/lib/id.ts";
import { wait } from "@/lib/time.ts";

describe("createId", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns a unique uuid in a secure context", async () => {
    const firstId = createId();
    await wait(1);
    const secondId = createId();
    expect(firstId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);

    expect(secondId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    expect(firstId).not.toBe(secondId);
  });

  it("returns a unique fallback id outside a secure context", async () => {
    vi.stubGlobal("crypto", {});
    const firstId = createId();
    await wait(1);
    const secondId = createId();
    expect(firstId).toMatch(/^[0-9]+-[0-9]{4}$/);
    expect(secondId).toMatch(/^[0-9]+-[0-9]{4}$/);
    expect(firstId).not.toBe(secondId);
  });
});
