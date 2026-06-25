import { describe, expect, it } from "vitest";
import { createEmptyIobrokerSkeleton, iobrokerData, IobrokerSubscription } from "../../src/iobroker-states/subscribed-states.iobroker";
import { StringValue } from "../../src/store/valueClasses";

describe("createEmptyIobrokerSkeleton", () => {
  it("creates a container for every flat channel with leaf instances whose val is still undefined", () => {
    const skeleton = createEmptyIobrokerSkeleton(iobrokerData);
    expect(skeleton.pool).toBeDefined();
    expect(skeleton.pool.tempSet).toBeDefined();
    expect(skeleton.pool.tempSet.val).toBeUndefined();
  });

  it("creates a nested container for every group within a channel, leaves still without a val", () => {
    const skeleton = createEmptyIobrokerSkeleton(iobrokerData);
    expect(skeleton.batteries).toBeDefined();
    expect(skeleton.batteries["HMIP Buero"]).toBeDefined();
    expect(skeleton.batteries["HMIP Buero"].available).toBeDefined();
    expect(skeleton.batteries["HMIP Buero"].available.val).toBeUndefined();
  });

  it("handles a custom, minimal subscription list", () => {
    const data = [
      { channel: "trash", value: [{ id: "x.1", key: "json", valueClass: StringValue }] },
      { channel: "lights", value: [{ id: "x.2", group: "lamp", key: "color", valueClass: StringValue }] },
    ] as unknown as readonly IobrokerSubscription[];

    const skeleton = createEmptyIobrokerSkeleton(data);
    expect(skeleton.trash.json).toBeInstanceOf(StringValue);
    expect(skeleton.lights.lamp.color).toBeInstanceOf(StringValue);
  });
});
