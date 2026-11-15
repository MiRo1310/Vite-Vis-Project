import { describe, expect, it } from "vitest";
import { getIdByName, getNameById } from "@/lib/name-id.ts";

const items = [
  { id: "1", name: "Gramm" },
  null,
  { id: "2", name: "Liter" },
];

describe("getNameById", () => {
  it("returns the name of the matching id", () => {
    expect(getNameById("2", items)).toBe("Liter");
  });

  it("returns an empty string when nothing matches", () => {
    expect(getNameById("x", items)).toBe("");
    expect(getNameById("1", null)).toBe("");
    expect(getNameById(undefined, items)).toBe("");
  });
});

describe("getIdByName", () => {
  it("returns the id of the matching name", () => {
    expect(getIdByName("Gramm", items)).toBe("1");
  });

  it("returns an empty string when nothing matches", () => {
    expect(getIdByName("gramm", items)).toBe("");
    expect(getIdByName("Gramm", undefined)).toBe("");
  });
});
