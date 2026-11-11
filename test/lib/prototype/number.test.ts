import { describe, it, expect } from "vitest";
import "@/lib/prototype/number";

describe("mrPad", () => {
  it("pads with leading zeros to the default length of 2", () => {
    expect((5).mrPad()).to.equal("05");
  });

  it("pads with leading zeros to the given length", () => {
    expect((5).mrPad(4)).to.equal("0005");
  });

  it("does not pad a number that already has the given length", () => {
    expect((123).mrPad(2)).to.equal("123");
  });

  it("pads zero", () => {
    expect((0).mrPad(3)).to.equal("000");
  });

  it("counts the minus sign toward the length", () => {
    expect((-5).mrPad(3)).to.equal("-05");
  });

  it("returns the number as a string for a length of 0", () => {
    expect((5).mrPad(0)).to.equal("5");
  });
});
