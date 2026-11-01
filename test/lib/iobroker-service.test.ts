import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { IoBrokerService } from "@/lib/io-broker-service.ts";

vi.mock("@iobroker/socket-client", () => {
  const mockSubscribeStateAsync = vi.fn(() => Promise.resolve());
  const mockStartSocket = vi.fn(() => Promise.resolve());
  const mockWaitForFirstConnection = vi.fn(() => Promise.resolve());

  const AdminConnection = vi.fn().mockImplementation(function (this: any, options: any) {
    this.subscribeStateAsync = mockSubscribeStateAsync;
    this.startSocket = mockStartSocket;
    this.waitForFirstConnection = mockWaitForFirstConnection;
    this.onProgress = options?.onProgress;
  });

  return {
    AdminConnection,
    PROGRESS: { READY: 4, CONNECTED: 2 },
    __mocks: { mockSubscribeStateAsync, mockStartSocket, mockWaitForFirstConnection },
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

  beforeEach(async () => {
    vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => {
      cb(0);
      return 0;
    });

    const socketMod = await import("@iobroker/socket-client");
    socketMocks = (socketMod as any).__mocks;

    service = new IoBrokerService();

    socketMocks.mockSubscribeStateAsync.mockClear();
    socketMocks.mockStartSocket.mockClear();
    socketMocks.mockWaitForFirstConnection.mockClear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    document.querySelectorAll(".ioBroker").forEach((el) => el.remove());
  });

  async function initService() {
    const script = document.createElement("script");
    vi.spyOn(document, "createElement").mockReturnValue(script);
    vi.spyOn(document.body, "appendChild").mockImplementation(() => script);

    service.loadScript("/test.js");
    if (script.onload) {
      await (script.onload as any)(new Event("load"));
    }
  }

  describe("loadScript", () => {
    it("appends a script tag to the body", () => {
      const appendChildSpy = vi.spyOn(document.body, "appendChild");
      const script = document.createElement("script");
      vi.spyOn(document, "createElement").mockReturnValue(script);

      service.loadScript("/test.js");

      expect(appendChildSpy).toHaveBeenCalledWith(script);
      expect(script.src).toContain("/test.js");
    });

    it("starts the socket connection on load", async () => {
      await initService();

      expect(socketMocks.mockStartSocket).toHaveBeenCalled();
      expect(socketMocks.mockWaitForFirstConnection).toHaveBeenCalled();
    });
  });

  describe("connection", () => {
    it("is undefined before init", () => {
      expect(service.connection).toBeUndefined();
    });
  });

  describe("isAdminConnected", () => {
    it("is set via onProgress", async () => {
      expect(service.isAdminConnected).toBe(false);

      await initService();
      const adminConnection = service.connection as any;
      adminConnection.onProgress(4);

      expect(service.isAdminConnected).toBe(true);
    });
  });

  describe("subscribe", () => {
    it("queues the subscription while there is no admin connection", async () => {
      const cb = vi.fn();
      await service.subscribe({ id: "test.id.1", cb });

      expect(socketMocks.mockSubscribeStateAsync).not.toHaveBeenCalled();
    });

    it("calls subscribeStateAsync after init", async () => {
      await initService();

      const cb = vi.fn();
      await service.subscribe({ id: "test.id.1", cb });

      expect(socketMocks.mockSubscribeStateAsync).toHaveBeenCalledWith("test.id.1", expect.any(Function));
    });

    it("processes queued subscriptions after init", async () => {
      const cb = vi.fn();
      await service.subscribe({ id: "queued.id.1", cb });
      await service.subscribe({ id: "queued.id.2", cb });

      await initService();

      expect(socketMocks.mockSubscribeStateAsync).toHaveBeenCalledTimes(2);
    });

    it("increments subscribedIdsCount and subscribedDoneIdsCount", async () => {
      await initService();

      const cb = vi.fn();
      await service.subscribe({ id: "test.id.1", cb });

      expect(service.subscribedIdsCount.value).toBe(1);
      expect(service.subscribedDoneIdsCount.value).toBe(0);

      const [, stateHandler] = socketMocks.mockSubscribeStateAsync.mock.calls[0];
      stateHandler("test.id.1", { val: 1, ack: true });

      expect(service.subscribedDoneIdsCount.value).toBe(1);

      stateHandler("test.id.1", { val: 2, ack: true });
      expect(service.subscribedDoneIdsCount.value).toBe(1);
    });
  });

  describe("resetSubscribedIds", () => {
    it("resets both counters", async () => {
      await initService();

      const cb = vi.fn();
      await service.subscribe({ id: "test.id.1", cb });
      const [, stateHandler] = socketMocks.mockSubscribeStateAsync.mock.calls[0];
      stateHandler("test.id.1", { val: 1, ack: true });

      service.resetSubscribedIds();

      expect(service.subscribedIdsCount.value).toBe(0);
      expect(service.subscribedDoneIdsCount.value).toBe(0);
    });
  });
});
