import { describe, expect, it } from "vitest";
import { createEmptyIobrokerSkeleton, iobrokerData, IobrokerSubscription } from "../../src/iobroker-states/subscribed-states.iobroker";

describe("createEmptyIobrokerSkeleton", () => {
  it("creates a container for every flat channel without setting leaf values", () => {
    const skeleton = createEmptyIobrokerSkeleton(iobrokerData);
    expect(skeleton.pool).toBeDefined();
    expect(skeleton.pool.tempSet).toBeUndefined();
  });

  it("creates a nested container for every group within a channel", () => {
    const skeleton = createEmptyIobrokerSkeleton(iobrokerData);
    expect(skeleton.batteries).toBeDefined();
    expect(skeleton.batteries["HMIP Buero"]).toBeDefined();
    expect(skeleton.batteries["HMIP Buero"].available).toBeUndefined();
  });

  it("handles a custom, minimal subscription list", () => {
    const data = [
      { channel: "trash", value: [{ id: "x.1", key: "json" }] },
      { channel: "lights", value: [{ id: "x.2", group: "lamp", key: "color" }] },
    ] as unknown as readonly IobrokerSubscription[];

    const skeleton = createEmptyIobrokerSkeleton(data);
    expect(skeleton.trash).toEqual({});
    expect(skeleton.lights.lamp).toEqual({});
  });
});
