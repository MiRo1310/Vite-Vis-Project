import { describe, expect, it, vi } from "vitest";

// Break circular dependency: valueClasses → io-broker-service → ioBrokerStore → subscribed-states → valueClasses
vi.mock("../../src/lib/io-broker-service", () => ({
  ioBrokerService: {
    subscribe: vi.fn().mockResolvedValue(undefined),
    connection: undefined,
  },
}));

import { BooleanValue, JsonValue, NumberValue, StringValue } from "../../src/store/valueClasses";
import { type IobrokerState } from "../../src/types/types";

const id = "test.id";

const state = (val: any, ack = true): IobrokerState => ({ val, ack, ts: 0, lc: 0, from: "", q: 0 });

describe("NumberValue", () => {
  it("stores id, val and ack from the options", () => {
    const num = new NumberValue(id, { val: 42 });
    expect(num.val).toBe(42);
    expect(num.id).toBe("test.id");
    expect(num.ack).toBe(false);
  });

  it("falls back to 0 when val is nullish", () => {
    const num = new NumberValue(id, { val: undefined as unknown as number });
    expect(num.value).toBe(0);
  });

  describe("update", () => {
    it("mutates the instance in place", () => {
      const num = new NumberValue(id, { val: 1 });
      num.update(state(2, false));
      expect(num.val).toBe(2);
      expect(num.ack).toBe(false);
    });
  });
});

describe("BooleanValue", () => {
  it("uses the invert option for the value", () => {
    const bool = new BooleanValue(id, { invert: true });
    expect(bool.value).toBe(true);
  });
});

describe("StringValue", () => {
  it("stores val from the options", () => {
    const str = new StringValue(id, { val: "hello" });
    expect(str.val).toBe("hello");
  });
});

describe("JsonValue", () => {
  describe("parsed", () => {
    it("parses valid JSON", () => {
      //eslint-disable-next-line
      const json = new JsonValue<{ a: number }>(id, { val: '{"a":1}' });
      expect(json.parsed({} as { a: number })).toEqual({ a: 1 });
    });

    it("returns the fallback for invalid JSON", () => {
      const json = new JsonValue<{ a: number }>(id, { val: "not-json" });
      const fallback = { a: 0 };
      expect(json.parsed(fallback)).toBe(fallback);
    });

    it("caches the result until val changes", () => {
      //eslint-disable-next-line
      const json = new JsonValue<{ a: number }>(id, { val: '{"a":1}' });
      const fallback = {} as { a: number };
      const first = json.parsed(fallback);
      expect(json.parsed(fallback)).toBe(first);
      //eslint-disable-next-line
      json.update(state('{"a":2}'));
      expect(json.parsed(fallback)).toEqual({ a: 2 });
      expect(json.parsed(fallback)).not.toBe(first);
    });
  });
});
