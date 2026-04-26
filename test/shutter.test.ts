import { expect, test } from "vitest";
import { getShutterImageIndexByPosition } from "@/composables/shutterImages.ts";

test("get correct shutter index", () => {
  expect(getShutterImageIndexByPosition(0)).toBe(0);
  expect(getShutterImageIndexByPosition(9)).toBe(1);
  expect(getShutterImageIndexByPosition(10)).toBe(1);
  expect(getShutterImageIndexByPosition(12)).toBe(2);
  expect(getShutterImageIndexByPosition(19)).toBe(2);
  expect(getShutterImageIndexByPosition(20)).toBe(2);
  expect(getShutterImageIndexByPosition(21)).toBe(3);
  expect(getShutterImageIndexByPosition(25)).toBe(3);
  expect(getShutterImageIndexByPosition(35)).toBe(4);
  expect(getShutterImageIndexByPosition(46)).toBe(5);
  expect(getShutterImageIndexByPosition(57)).toBe(6);
  expect(getShutterImageIndexByPosition(67)).toBe(7);
  expect(getShutterImageIndexByPosition(80)).toBe(8);
  expect(getShutterImageIndexByPosition(89)).toBe(9);
  expect(getShutterImageIndexByPosition(91)).toBe(10);
  expect(getShutterImageIndexByPosition(100)).toBe(10);
  expect(getShutterImageIndexByPosition(110)).toBe(10);
});
