import { describe, expect, it } from "vitest";
import { formatDuration, getNameByIndex, getTimerUrgency, parseDuration, toAlexaTimerView } from "@/lib/timer.ts";

describe("getNameByIndex", () => {
  it("returns the custom timer name", () => {
    expect(getNameByIndex({ 1: { name: { value: "Pizza" } } }, 1)).toBe("Pizza");
  });

  it("returns 'Timer <index>' when the name is the default 'Timer'", () => {
    expect(getNameByIndex({ 2: { name: { value: "Timer" } } }, 2)).toBe("Timer 2");
  });

  it("returns 'Timer <index>' when the name is empty", () => {
    expect(getNameByIndex({ 3: { name: { value: "" } } }, 3)).toBe("Timer 3");
  });

  it("returns 'Timer <index>' when no name is set", () => {
    expect(getNameByIndex({ 4: {} }, 4)).toBe("Timer 4");
  });
});

describe("parseDuration", () => {
  it("reads H:MM:SS, MM:SS and SS", () => {
    expect(parseDuration("01:02:03")).toBe(3723);
    expect(parseDuration("04:32")).toBe(272);
    expect(parseDuration("45")).toBe(45);
    expect(parseDuration(" 00:00:09 ")).toBe(9);
  });

  it("returns null for other formats", () => {
    expect(parseDuration("")).toBeNull();
    expect(parseDuration(null)).toBeNull();
    expect(parseDuration("4 Minuten")).toBeNull();
    expect(parseDuration("1:2:3:4")).toBeNull();
  });
});

describe("formatDuration", () => {
  it("formats minutes and hours short", () => {
    expect(formatDuration(272)).toBe("4:32");
    expect(formatDuration(3723)).toBe("1:02:03");
    expect(formatDuration(5)).toBe("0:05");
  });

  it("never goes below zero", () => {
    expect(formatDuration(-3)).toBe("0:00");
  });
});

describe("toAlexaTimerView", () => {
  it("returns null for an empty slot", () => {
    expect(toAlexaTimerView(1, { timeString: "" })).toBeNull();
    expect(toAlexaTimerView(1, {})).toBeNull();
  });

  it("prepares name, remaining time and progress", () => {
    const view = toAlexaTimerView(2, { timeString: "00:02:30", initialTimer: "00:10:00", name: "Nudeln", device: "Küche", timeEnd: "18:42:10" });
    expect(view).toEqual({
      index: 2,
      name: "Nudeln",
      remainingText: "2:30",
      remainingSeconds: 150,
      progress: 0.75,
      endTime: "18:42:10",
      device: "Küche",
    });
  });

  it("falls back to 'Timer <index>' and the raw text", () => {
    const view = toAlexaTimerView(3, { timeString: "läuft", name: "Timer" });
    expect(view?.name).toBe("Timer 3");
    expect(view?.remainingText).toBe("läuft");
    expect(view?.progress).toBeNull();
  });

  it("clamps the progress", () => {
    expect(toAlexaTimerView(1, { timeString: "00:20:00", initialTimer: "00:10:00" })?.progress).toBe(0);
  });
});

describe("getTimerUrgency", () => {
  it("rates the remaining time", () => {
    expect(getTimerUrgency(null)).toBe("normal");
    expect(getTimerUrgency(300)).toBe("normal");
    expect(getTimerUrgency(60)).toBe("soon");
    expect(getTimerUrgency(10)).toBe("now");
  });
});
