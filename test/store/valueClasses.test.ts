import { describe, expect, it } from "vitest";
import { BooleanValue, JsonValue, NumberValue, StringValue } from "../../src/store/valueClasses";

const baseState = { id: "test.id", ack: true, ts: 1, lc: 2, from: "test", q: 0 };

describe("valueClasses", () => {
  it("NumberValue/BooleanValue/StringValue store id/val/ack from the incoming state", () => {
    const num = new NumberValue({ ...baseState, val: 42 });
    expect(num.val).toBe(42);
    expect(num.id).toBe("test.id");
    expect(num.ack).toBe(true);

    const bool = new BooleanValue({ ...baseState, val: true });
    expect(bool.val).toBe(true);

    const str = new StringValue({ ...baseState, val: "hello" });
    expect(str.val).toBe("hello");
  });

  it("update() mutates the instance in place", () => {
    const num = new NumberValue({ ...baseState, val: 1 });
    num.update({ ...baseState, val: 2, ack: false });
    expect(num.val).toBe(2);
    expect(num.ack).toBe(false);
  });

  it("get() falls back when val is nullish", () => {
    const num = new NumberValue({ ...baseState, val: undefined as unknown as number });
    expect(num.get(99)).toBe(99);
  });

  it("JsonValue.parsed parses valid JSON", () => {
    const json = new JsonValue<{ a: number }>({ ...baseState, val: '{"a":1}' });
    expect(json.parsed).toEqual({ a: 1 });
  });

  it("JsonValue.parsed returns null for invalid JSON", () => {
    const json = new JsonValue<{ a: number }>({ ...baseState, val: "not-json" });
    expect(json.parsed).toBeNull();
  });

  it("JsonValue.parsed caches the result until val changes", () => {
    const json = new JsonValue<{ a: number }>({ ...baseState, val: '{"a":1}' });
    const first = json.parsed;
    expect(json.parsed).toBe(first);

    json.update({ ...baseState, val: '{"a":2}' });
    expect(json.parsed).toEqual({ a: 2 });
    expect(json.parsed).not.toBe(first);
  });
});
