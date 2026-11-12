import { it, expect, describe } from "vitest";
import { Collection, NumberCollection } from "@/lib/array";

describe("Collection.first", () => {
  it("returns the first element", () => {
    expect(new NumberCollection([1, 2, 3, 4, 5]).first).toBe(1);
  });

  it("returns undefined for an empty array", () => {
    expect(new NumberCollection([]).first).toBe(undefined);
  });
});

describe("Collection.last", () => {
  it("returns the last element", () => {
    expect(new NumberCollection([1, 2, 3, 4, 5, 6]).last).toBe(6);
  });

  it("returns undefined for an empty array", () => {
    expect(new NumberCollection([]).last).toBe(undefined);
  });
});

describe("Collection.getPosition", () => {
  it("returns the element at the given index", () => {
    expect(new NumberCollection([1, 2, 3, 4, 5, 6]).getPosition(3)).toBe(4);
  });

  it("returns undefined for an empty array", () => {
    expect(new NumberCollection([]).getPosition(3)).toBe(undefined);
  });
});

describe("Collection.removeDuplicates", () => {
  it("removes duplicate entries", () => {
    expect(new Collection(["a", "b", "a", "c", "b"]).removeDuplicates).to.deep.equal(["a", "b", "c"]);
  });

  it("returns the same entries if there are no duplicates", () => {
    expect(new Collection(["a", "b", "c"]).removeDuplicates).to.deep.equal(["a", "b", "c"]);
  });

  it("returns an empty array for an empty array", () => {
    expect(new Collection([]).removeDuplicates).to.deep.equal([]);
  });

  it("handles an array with one element", () => {
    expect(new Collection(["a"]).removeDuplicates).to.deep.equal(["a"]);
  });
});

describe("Collection.trimAll", () => {
  it("trims whitespace from all items", () => {
    expect(new Collection(["  a  ", "  b", "c  "]).trim).to.deep.equal(["a", "b", "c"]);
  });

  it("returns an empty array for an empty array", () => {
    expect(new Collection([]).trim).to.deep.equal([]);
  });

  it("handles an array with one element", () => {
    expect(new Collection(["  singleItem  "]).trim).to.deep.equal(["singleItem"]);
  });

  it("keeps items without whitespace unchanged", () => {
    expect(new Collection(["a", "b", "c"]).trim).to.deep.equal(["a", "b", "c"]);
  });

  it("turns whitespace-only items into empty strings", () => {
    expect(new Collection(["  ", "a", "  "]).trim).to.deep.equal(["", "a", ""]);
  });

  it("keeps booleans and numbers unchanged", () => {
    expect(new Collection(["  ", "a", true, 123, "  b   "]).trim).to.deep.equal(["", "a", true, 123, "b"]);
  });
});

describe("Collection (Array subclass)", () => {
  it("exposes the items as array elements", () => {
    expect(new Collection(["a", "b", "a", "c", "b"]).length).toBe(5);
  });
});

describe("NumberCollection.sum", () => {
  it("returns the sum of all values", () => {
    expect(new NumberCollection([1, 10, 45]).sum()).to.be.equal(56);
    expect(new NumberCollection([0, 1, 10, 45]).sum()).to.be.equal(56);
    expect(new NumberCollection([0, 1, 10, 45, 100]).sum()).to.be.equal(156);
    expect(new NumberCollection([0, 1, 10, 45, 0.55, 0.02]).sum()).to.be.equal(56.57);
  });
});

describe("NumberCollection.average", () => {
  it("returns the average of all values", () => {
    expect(new NumberCollection([]).average()).to.be.equal(0);
    expect(new NumberCollection([1, 11, 45]).average()).to.be.equal(19);
    expect(new NumberCollection([0, 1, 10, 45]).average()).to.be.equal(14);
    expect(new NumberCollection([0, 1, 10, 44, 100]).average()).to.be.equal(31);
    expect(new NumberCollection([0, 1, 10, 45, 25, 9]).average()).to.be.equal(15);
  });
});

describe("NumberCollection.min", () => {
  it("returns the smallest value", () => {
    expect(new NumberCollection([1, 11, 45]).min).to.be.equal(1);
    expect(new NumberCollection([0, 1, 10, 45]).min).to.be.equal(0);
    expect(new NumberCollection([1, 10, 44, -15, 100]).min).to.be.equal(-15);
    expect(new NumberCollection([10, 45, 25, 9]).min).to.be.equal(9);
  });
});

describe("NumberCollection.max", () => {
  it("returns the largest value", () => {
    expect(new NumberCollection([-23, 1, 11, 45]).max).to.be.equal(45);
    expect(new NumberCollection([0, 1, 10, 44, 100, 3]).max).to.be.equal(100);
    expect(new NumberCollection([0, 1, 10, 45, 25, 9]).max).to.be.equal(45);
  });
});

describe("NumberCollection.map.filter", () => {
  it("returns values larger than 4", () => {
    expect(new NumberCollection([1, 3, 5]).map((i) => i + 2).filter((i) => i > 4)).toEqual([5, 7]);
  });
});

describe("NumberCollection.add", () => {
  it("returns adds a value and returns it", () => {
    const collection = new NumberCollection([1, 3, 5]);
    expect(collection.add(7)).toEqual([1, 3, 5, 7]);
    expect(collection.toArray).toEqual([1, 3, 5, 7]);
  });
});
