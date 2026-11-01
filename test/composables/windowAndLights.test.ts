import { describe, expect, it } from "vitest";
import { BooleanValue } from "@/store/valueClasses.ts";
import { type IobrokerState } from "@/types/types.ts";
import { countTrue } from "@/lib/boolean.ts";

describe("countTrue", () => {
  let class1: BooleanValue, class2: BooleanValue, class3: BooleanValue, class4: BooleanValue, class5: BooleanValue;

  beforeEach(() => {
    class1 = new BooleanValue("test");
    class2 = new BooleanValue("test");
    class3 = new BooleanValue("test");
    class4 = new BooleanValue("test");
    class5 = new BooleanValue("test");
  });

  it("returns 0 for an empty object", () => {
    expect(countTrue({})).toEqual(0);
  });

  it("returns 0 for values without state", () => {
    expect(countTrue({ test1: class1, test2: class2, test3: class3, test4: class4 })).toEqual(0);
  });

  it("counts the true values", () => {
    class1.update({ val: true } as IobrokerState);
    class4.update({ val: true } as IobrokerState);
    class3.update({ val: true } as IobrokerState);
    expect(countTrue({ test1: class1, test2: class2, test3: class3, test4: class4 })).toEqual(3);
    class3.update({ val: false } as IobrokerState);
    expect(countTrue({ test1: class1, test2: class2, test3: class3, test4: class4 })).toEqual(2);
  });

  it("falls back to primary when the override is undefined", () => {
    class1.update({ val: true } as IobrokerState);
    class4.update({ val: true } as IobrokerState);
    class3.update({ val: true } as IobrokerState);
    expect(countTrue({ test1: class1, test2: class2, test3: class3, test4: class4 }, { test4: class5 })).toEqual(3);
  });

  it("uses the override when it is false", () => {
    class1.update({ val: true } as IobrokerState);
    class4.update({ val: true } as IobrokerState);
    class3.update({ val: true } as IobrokerState);
    class5.update({ val: false } as IobrokerState);
    expect(countTrue({ test1: class1, test2: class2, test3: class3, test4: class4 }, { test4: class5 })).toEqual(2);
  });

  it("does not count when primary and override are false", () => {
    class1.update({ val: true } as IobrokerState);
    class3.update({ val: true } as IobrokerState);
    class4.update({ val: false } as IobrokerState);
    class5.update({ val: false } as IobrokerState);
    expect(countTrue({ test1: class1, test2: class2, test3: class3, test4: class4 }, { test4: class5 })).toEqual(2);
  });

  it("counts once when primary and override are true", () => {
    class1.update({ val: true } as IobrokerState);
    class3.update({ val: true } as IobrokerState);
    class4.update({ val: true } as IobrokerState);
    class5.update({ val: true } as IobrokerState);
    expect(countTrue({ test1: class1, test2: class2, test3: class3, test4: class4 }, { test4: class5 })).toEqual(3);
  });

  it("uses the override when it is true", () => {
    class1.update({ val: true } as IobrokerState);
    class3.update({ val: true } as IobrokerState);
    class4.update({ val: false } as IobrokerState);
    class5.update({ val: true } as IobrokerState);
    expect(countTrue({ test1: class1, test2: class2, test3: class3, test4: class4 }, { test4: class5 })).toEqual(3);
  });
});
