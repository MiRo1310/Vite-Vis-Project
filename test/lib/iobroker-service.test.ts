import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { IoBrokerService } from "../../src/lib/io-broker-service";

vi.mock("@iobroker/socket-client", () => {
  const mockSubscribeStateAsync = vi.fn(() => Promise.resolve());
  const mockStartSocket = vi.fn(() => Promise.resolve());
  const mockWaitForFirstConnection = vi.fn(() => Promise.resolve());

  const AdminConnection = vi.fn().mockImplementation(function (this: any) {
    this.subscribeStateAsync = mockSubscribeStateAsync;
    this.startSocket = mockStartSocket;
    this.waitForFirstConnection = mockWaitForFirstConnection;
  });

  return {
    AdminConnection,
    PROGRESS: { READY: 4, CONNECTED: 2 },
    __mocks: { mockSubscribeStateAsync, mockStartSocket, mockWaitForFirstConnection },
  };
});

vi.mock("../../src/store/ioBrokerStore.ts", () => {
  const mockSetAdminConnection = vi.fn();
  const mockAddIdToSubscribedIds = vi.fn();
  return {
    useIobrokerStore: () => ({
      setAdminConnection: mockSetAdminConnection,
      addIdToSubscribedIds: mockAddIdToSubscribedIds,
      subscribedIds: [],
    }),
    __mocks: { mockSetAdminConnection, mockAddIdToSubscribedIds },
  };
});

vi.mock("../../src/lib/logger.ts", () => ({
  Logger: vi.fn(),
}));

vi.mock("../../src/config/config.ts", () => ({
  IOBROKER_HOST: "localhost",
  IOBROKER_WS_PORT: 8081,
}));

describe("IoBrokerService", () => {
  let service: IoBrokerService;
  let socketMocks: any;
  let storeMocks: any;

  beforeEach(async () => {
    const socketMod = await import("@iobroker/socket-client");
    socketMocks = (socketMod as any).__mocks;
    const storeMod = await import("../../src/store/ioBrokerStore.ts");
    storeMocks = (storeMod as any).__mocks;

    service = new IoBrokerService();

    socketMocks.mockSubscribeStateAsync.mockClear();
    socketMocks.mockStartSocket.mockClear();
    socketMocks.mockWaitForFirstConnection.mockClear();
    storeMocks.mockSetAdminConnection.mockClear();
    storeMocks.mockAddIdToSubscribedIds.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.querySelectorAll(".ioBroker").forEach((el) => el.remove());
  });

  it("loadScript fügt ein Script-Tag zum Body hinzu", () => {
    const appendChildSpy = vi.spyOn(document.body, "appendChild");
    const script = document.createElement("script");
    vi.spyOn(document, "createElement").mockReturnValue(script);

    service.loadScript("/test.js");

    expect(appendChildSpy).toHaveBeenCalledWith(script);
    expect(script.src).toContain("/test.js");
  });

  it("startet socket connection nach loadScript onload", async () => {
    const script = document.createElement("script");
    vi.spyOn(document, "createElement").mockReturnValue(script);
    vi.spyOn(document.body, "appendChild").mockImplementation(() => script);

    service.loadScript("/test.js");

    if (script.onload) {
      await (script.onload as any)(new Event("load"));
    }

    expect(socketMocks.mockStartSocket).toHaveBeenCalled();
    expect(socketMocks.mockWaitForFirstConnection).toHaveBeenCalled();
  });

  it("subscribe queued wenn adminConnection noch nicht vorhanden", async () => {
    const cb = vi.fn();
    await service.subscribe({ id: "test.id.1", cb });

    expect(socketMocks.mockSubscribeStateAsync).not.toHaveBeenCalled();
    expect(storeMocks.mockAddIdToSubscribedIds).not.toHaveBeenCalled();
  });

  it("subscribe ruft subscribeStateAsync und addIdToSubscribedIds nach init auf", async () => {
    const script = document.createElement("script");
    vi.spyOn(document, "createElement").mockReturnValue(script);
    vi.spyOn(document.body, "appendChild").mockImplementation(() => script);

    service.loadScript("/test.js");
    if (script.onload) {
      await (script.onload as any)(new Event("load"));
    }

    const cb = vi.fn();
    await service.subscribe({ id: "test.id.1", cb });

    expect(socketMocks.mockSubscribeStateAsync).toHaveBeenCalledWith("test.id.1", expect.any(Function));
    expect(storeMocks.mockAddIdToSubscribedIds).toHaveBeenCalledWith("test.id.1");
  });

  it("gequeuete subscriptions werden nach init verarbeitet", async () => {
    const cb = vi.fn();
    service.subscribe({ id: "queued.id.1", cb });
    service.subscribe({ id: "queued.id.2", cb });

    const script = document.createElement("script");
    vi.spyOn(document, "createElement").mockReturnValue(script);
    vi.spyOn(document.body, "appendChild").mockImplementation(() => script);

    service.loadScript("/test.js");
    if (script.onload) {
      await (script.onload as any)(new Event("load"));
    }

    expect(socketMocks.mockSubscribeStateAsync).toHaveBeenCalledTimes(2);
    expect(storeMocks.mockAddIdToSubscribedIds).toHaveBeenCalledTimes(2);
  });

  it("connection ist undefined vor init", () => {
    expect(service.connection).toBeUndefined();
  });
});
