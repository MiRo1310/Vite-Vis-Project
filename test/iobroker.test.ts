import { expect, test } from "vitest";
import { invertBoolean } from "@/lib/connecter-to-iobroker.ts";

test("invertValue", () => {
  expect(invertBoolean(true)).toBe(false);
  expect(invertBoolean(false)).toBe(true);
  expect(invertBoolean(123)).toBe(123);
  expect(invertBoolean("123")).toBe("123");
});
