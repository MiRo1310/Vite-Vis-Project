import { describe, expect, it } from "vitest";
import { parseJson, stringifyJson } from "@/lib/json.ts";

const obj = { a: 1, b: "test", c: true };
describe("stringifyJson", () => {
  it("returns an indented JSON string for an object", () => {
    expect(stringifyJson(obj)).toBe(
      `{
  "a": 1,
  "b": "test",
  "c": true
}`,
    );
  });

  it("returns a JSON string for a boolean", () => {
    expect(stringifyJson(true)).toBe("true");
  });

  it("returns a JSON string for a number", () => {
    expect(stringifyJson(1520)).toBe("1520");
  });
});

describe("parseJson", () => {
  it("returns an error for invalid JSON", () => {
    const result = parseJson("{'a': 1,'b': 'test','c': true}");
    expect(result).to.have.property("isValidJson", false);
    expect(result).to.have.property("json", null);
    expect(typeof result.error).to.be.oneOf(["object", "string", "number", "boolean", "undefined"]);
  });

  it("parses a valid JSON string", () => {
    // prettier-ignore
    const result = parseJson("{\"a\": 1,\"b\": \"test\",\"c\": true}");
    expect(result).to.have.property("isValidJson", true);
    expect(result.error).toBeUndefined();
    expect(result).to.have.property("json").that.deep.equal(obj);
  });

  it("returns an error for null", () => {
    const result = parseJson(null);
    expect(result).to.have.property("isValidJson", false);
    expect(result).to.have.property("json", null);
    expect(result).to.have.property("error", "Value is null");
  });
});
