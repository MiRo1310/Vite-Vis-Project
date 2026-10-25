import { afterEach, expect, it } from "vitest";
import { createId } from "../../src/lib/id";
import { wait } from "../../src/lib/time";

afterEach(() => {
  vi.unstubAllGlobals();
});

it("get uuid in secure context", async () => {
  const firstId = createId();
  await wait(1);
  const secondId = createId();
  expect(firstId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);

  expect(secondId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
  expect(firstId).not.toBe(secondId);
});

it("get id in for none secure context", async () => {
  vi.stubGlobal("crypto", {});
  const firstId = createId();
  await wait(1);
  const secondId = createId();
  expect(firstId).toMatch(/^[0-9]+-[0-9]{4}$/);
  expect(secondId).toMatch(/^[0-9]+-[0-9]{4}$/);
  expect(firstId).not.toBe(secondId);
});
