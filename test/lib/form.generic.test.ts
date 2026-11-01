import { describe, expect, it } from "vitest";
import { z } from "zod";
import { createIsValid, getFieldError } from "../../src/lib/form";

const schema = z.object({
  name: z.string().min(3, { message: "too short" }),
  qty: z.number().min(1, { message: "min 1" }),
});

describe("getFieldError", () => {
  it("returns the message of a failing field", () => {
    const data = { name: "ab", qty: 0 };
    expect(getFieldError(schema, data, "name")).toBe("too short");
    expect(getFieldError(schema, data, "qty")).toBe("min 1");
  });

  it("returns undefined when the field is valid", () => {
    const data = { name: "abcd", qty: 2 };
    expect(getFieldError(schema, data, "name")).toBeUndefined();
    expect(getFieldError(schema, data, "qty")).toBeUndefined();
  });
});

describe("createIsValid", () => {
  it("returns a validator function for the schema", () => {
    const isValid = createIsValid(schema);
    expect(isValid({ name: "abc", qty: 1 })).toBe(true);
    expect(isValid({ name: "a", qty: 1 })).toBe(false);
  });
});
