import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock externe Abhängigkeiten vor dem Import der zu testenden Datei
vi.mock("../../src/lib/iobroker-service", () => ({
  subscribeStates: vi.fn(),
  unSubscribeStates: vi.fn(),
}));

vi.mock("../../src/store/ioBrokerStore.ts", () => ({
  // simple mock: gibt immer connected zurück
  useIobrokerStore: () => ({ isAdminConnected: true }),
}));

// Import nach den Mocks
import { useDynamicSubscribe } from "../../src/composables/dynamicSubscribe";
import { subscribeStates } from "../../src/lib/iobroker-service";

describe("useDynamicSubscribe", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call subscribeStates when given a single state", () => {
    const single = { value: [{ id: "s1" }], storeFolder: "folder1" } as any;

    // Aufruf der composable (seit watchEffect beim Erstellen läuft)
    useDynamicSubscribe(single);

    expect(subscribeStates).toHaveBeenCalledTimes(1);
    // subscribeStates wird mit einem Array aufgerufen
    expect((subscribeStates as any).mock.calls[0][0]).toEqual([single]);
  });

  it("should call subscribeStates when given an array of states", () => {
    const s1 = { value: [{ id: "s1" }], storeFolder: "folder1" } as any;
    const s2 = { value: [{ id: "s2" }], storeFolder: "folder2" } as any;

    useDynamicSubscribe([s1, s2]);

    expect(subscribeStates).toHaveBeenCalledTimes(1);
    expect((subscribeStates as any).mock.calls[0][0]).toEqual([s1, s2]);
  });
});
