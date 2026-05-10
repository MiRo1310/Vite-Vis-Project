import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Mocks müssen vor dem Import des zu testenden Moduls registriert werden.
vi.mock("@iobroker/socket-client", () => {
  const mockSubscribeStateAsync = vi.fn((_id: string, _?: any) => Promise.resolve());
  const mockUnsubscribeState = vi.fn();
  const mockStartSocket = vi.fn(() => Promise.resolve());
  const mockWaitForFirstConnection = vi.fn(() => Promise.resolve());

  // Use function implementation so it works with `new`
  const AdminConnection = vi.fn().mockImplementation(function () {
    return {
      subscribeStateAsync: mockSubscribeStateAsync,
      unsubscribeState: mockUnsubscribeState,
      startSocket: mockStartSocket,
      waitForFirstConnection: mockWaitForFirstConnection,
    };
  });

  return {
    AdminConnection,
    __mocks: {
      mockSubscribeStateAsync,
      mockUnsubscribeState,
      mockStartSocket,
      mockWaitForFirstConnection,
    },
  };
});

// Use relative path mock so tests resolve correctly from test folder
vi.mock("../../src/store/ioBrokerStore.ts", () => {
  const mockSetAdminConnection = vi.fn();
  const mockSetValues = vi.fn();
  const mockAddIdToSubscribedIds = vi.fn();
  const mockRemoveIdFromSubscribedIds = vi.fn();
  return {
    useIobrokerStore: () => ({
      setAdminConnection: mockSetAdminConnection,
      setValues: mockSetValues,
      addIdToSubscribedIds: mockAddIdToSubscribedIds,
      removeIdFromSubscribedIds: mockRemoveIdFromSubscribedIds,
      subscribedIds: [],
    }),
    __mocks: { mockSetAdminConnection, mockSetValues, mockAddIdToSubscribedIds, mockRemoveIdFromSubscribedIds },
  };
});

// Mock the real import used by src/lib/iobroker-service.ts so init() doesn't subscribe to a large list during tests
vi.mock("../../src/iobroker-states/index.iobroker.ts", () => ({
  idToSubscribeOnAppStart: [],
}));

// Use relative path for logger mock
vi.mock("../../src/lib/logger.ts", () => {
  const mockLogger = vi.fn();
  return { Logger: mockLogger, __mocks: { mockLogger } };
});

// Importiere das zu testende Modul NACH der Registrierung der Mocks
import * as connecter from "../../src/lib/iobroker-service";

// Testdaten für States
const testStates = [
  {
    value: [
      { id: "test.id.1", key: "key1", subKey: undefined, invertValue: false },
      { id: "test.id.2", key: "key2", subKey: undefined, invertValue: true },
    ],
    storeFolder: "folder1",
  },
];

describe("connecter-to-iobroker", () => {
  let socketMocks: any;
  let storeMocks: any;
  let loggerMocks: any;

  beforeEach(async () => {
    // Greife auf die im Mock-Fabrik erzeugten Mock-Funktionen zu
    const socketMod = await import("@iobroker/socket-client");
    socketMocks = (socketMod as any).__mocks;
    const storeMod = await import("../../src/store/ioBrokerStore.ts");
    storeMocks = (storeMod as any).__mocks;
    const loggerMod = await import("../../src/lib/logger.ts");
    loggerMocks = (loggerMod as any).__mocks;
    // Trigger DOMContentLoaded so the module-internal iobrokerStore is set
    document.dispatchEvent(new Event("DOMContentLoaded"));
    // Clear mocks
    socketMocks.mockSubscribeStateAsync.mockClear();
    socketMocks.mockUnsubscribeState.mockClear();
    socketMocks.mockStartSocket.mockClear();
    socketMocks.mockWaitForFirstConnection.mockClear();
    storeMocks.mockSetAdminConnection.mockClear();
    storeMocks.mockSetValues.mockClear();
    storeMocks.mockAddIdToSubscribedIds.mockClear();
    storeMocks.mockRemoveIdFromSubscribedIds.mockClear();
    loggerMocks.mockLogger.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("subscribeStates ruft subscribeStateAsync und addIdToSubscribedIds auf", async () => {
    await connecter.init();
    connecter.subscribeStates(testStates);
    expect(socketMocks.mockSubscribeStateAsync).toHaveBeenCalledTimes(2);
    expect(storeMocks.mockAddIdToSubscribedIds).toHaveBeenCalledTimes(2);
  });

  it("unSubscribeStates ruft unsubscribeState und removeIdFromSubscribedIds auf", async () => {
    await connecter.init();
    connecter.unSubscribeStates(testStates);
    expect(socketMocks.mockUnsubscribeState).toHaveBeenCalledTimes(2);
    expect(storeMocks.mockRemoveIdFromSubscribedIds).toHaveBeenCalledWith("folder1");
  });

  it("init initialisiert AdminConnection und ruft setAdminConnection auf", async () => {
    await connecter.init();
    expect(socketMocks.mockStartSocket).toHaveBeenCalled();
    expect(socketMocks.mockWaitForFirstConnection).toHaveBeenCalled();
    expect(storeMocks.mockSetAdminConnection).toHaveBeenCalledWith(true);
  });

  it("loadScript fügt ein Skript-Tag hinzu und ruft init auf (indirekt überprüft)", async () => {
    const appendChildSpy = vi.spyOn(document.body, "appendChild");
    const script = document.createElement("script");
    vi.spyOn(document, "createElement").mockReturnValue(script);
    // call loadScript -> script.onload will call init()
    connecter.loadScript("/test.js");
    expect(appendChildSpy).toHaveBeenCalledWith(script);
    // Simuliere onload and wait for async init to finish

    if (script.onload) {
      await script.onload(new Event("load"));
    }
    // init() calls useIobrokerStore().setAdminConnection(true) -> check that
    expect(storeMocks.mockSetAdminConnection).toHaveBeenCalledWith(true);
    appendChildSpy.mockRestore();
  });
});
