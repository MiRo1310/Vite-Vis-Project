import { it, expect, describe } from "vitest";
import "@/lib/prototype/array";

describe("mrFirst", () => {
  it("returns the first element", () => {
    expect([1, 2, 3, 4, 5].mrFirst()).toBe(1);
  });

  it("returns undefined for an empty array", () => {
    expect([].mrFirst()).toBe(undefined);
  });
});

describe("mrLast", () => {
  it("returns the last element", () => {
    expect([1, 2, 3, 4, 5, 6].mrLast()).toBe(6);
  });

  it("returns undefined for an empty array", () => {
    expect([].mrLast()).toBe(undefined);
  });
});

describe("mrNth", () => {
  it("returns the element at the given index", () => {
    expect([1, 2, 3, 4, 5, 6].mrNth(3)).toBe(4);
  });

  it("returns undefined for an empty array", () => {
    expect([].mrNth(3)).toBe(undefined);
  });
});

describe("mrRemoveDuplicates", () => {
  it("removes duplicate entries", () => {
    expect(["a", "b", "a", "c", "b"].mrRemoveDuplicates()).to.deep.equal(["a", "b", "c"]);
  });

  it("returns the same entries if there are no duplicates", () => {
    expect(["a", "b", "c"].mrRemoveDuplicates()).to.deep.equal(["a", "b", "c"]);
  });

  it("returns an empty array for an empty array", () => {
    expect([].mrRemoveDuplicates()).to.deep.equal([]);
  });

  it("handles an array with one element", () => {
    expect(["a"].mrRemoveDuplicates()).to.deep.equal(["a"]);
  });
});

describe("mrTrimItems", () => {
  it("trims whitespace from all items", () => {
    expect(["  a  ", "  b", "c  "].mrTrimItems()).to.deep.equal(["a", "b", "c"]);
  });

  it("returns an empty array for an empty array", () => {
    expect([].mrTrimItems()).to.deep.equal([]);
  });

  it("handles an array with one element", () => {
    expect(["  singleItem  "].mrTrimItems()).to.deep.equal(["singleItem"]);
  });

  it("keeps items without whitespace unchanged", () => {
    expect(["a", "b", "c"].mrTrimItems()).to.deep.equal(["a", "b", "c"]);
  });

  it("turns whitespace-only items into empty strings", () => {
    expect(["  ", "a", "  "].mrTrimItems()).to.deep.equal(["", "a", ""]);
  });

  it("keeps booleans and numbers unchanged", () => {
    expect(["  ", "a", true, 123, "  b   "].mrTrimItems()).to.deep.equal(["", "a", true, 123, "b"]);
  });
});

describe("mrSum", () => {
  it("returns the sum of all values", () => {
    expect([1, 10, 45].mrSum()).to.be.equal(56);
    expect([0, 1, 10, 45].mrSum()).to.be.equal(56);
    expect([0, 1, 10, 45, 100].mrSum()).to.be.equal(156);
    expect([0, 1, 10, 45, 0.55, 0.02].mrSum()).to.be.equal(56.57);
  });
});

describe("mrAverage", () => {
  it("returns the average of all values", () => {
    expect([].mrAverage()).to.be.equal(0);
    expect([1, 11, 45].mrAverage()).to.be.equal(19);
    expect([0, 1, 10, 45].mrAverage()).to.be.equal(14);
    expect([0, 1, 10, 44, 100].mrAverage()).to.be.equal(31);
    expect([0, 1, 10, 45, 25, 9].mrAverage()).to.be.equal(15);
  });
});

describe("mrMin", () => {
  it("returns the smallest value", () => {
    expect([1, 11, 45].mrMin()).to.be.equal(1);
    expect([0, 1, 10, 45].mrMin()).to.be.equal(0);
    expect([1, 10, 44, -15, 100].mrMin()).to.be.equal(-15);
    expect([10, 45, 25, 9].mrMin()).to.be.equal(9);
  });
});

describe("mrMax", () => {
  it("returns the largest value", () => {
    expect([-23, 1, 11, 45].mrMax()).to.be.equal(45);
    expect([0, 1, 10, 44, 100, 3].mrMax()).to.be.equal(100);
    expect([0, 1, 10, 45, 25, 9].mrMax()).to.be.equal(45);
  });
});
