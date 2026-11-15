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

  it("builds a uuid v4 from getRandomValues outside a secure context (http://<IP>)", () => {
    const realCrypto = globalThis.crypto;
    vi.stubGlobal("crypto", { getRandomValues: (array: Uint8Array<ArrayBuffer>) => realCrypto.getRandomValues(array) });
    const ids = Array.from({ length: 50 }, () => createId());
    ids.forEach((id) => expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/));
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("returns a unique fallback id without any crypto functions", async () => {
    vi.stubGlobal("crypto", {});
    const firstId = createId();
    await wait(1);
    const secondId = createId();
    expect(firstId).toMatch(/^[0-9]+-[0-9]{4}$/);
    expect(secondId).toMatch(/^[0-9]+-[0-9]{4}$/);
    expect(firstId).not.toBe(secondId);
  });
});
