// import { describe, it, expect, vi, beforeEach } from "vitest";
// // 1. Mocks deklarieren
// const mockSubscribeStateAsync = vi.fn((_id) => Promise.resolve());
// const mockUnsubscribeState = vi.fn();
// const mockStartSocket = vi.fn(() => Promise.resolve());
// const mockWaitForFirstConnection = vi.fn(() => Promise.resolve());
// const mockSetAdminConnection = vi.fn();
// const mockSetValues = vi.fn();
// const mockAddIdToSubscribedIds = vi.fn();
// const mockRemoveIdFromSubscribedIds = vi.fn();
// const mockLogger = vi.fn();
//
// // 2. Mocks registrieren
// vi.mock("@iobroker/socket-client", () => ({
//   AdminConnection: vi.fn().mockImplementation(() => ({
//     subscribeStateAsync: mockSubscribeStateAsync,
//     unsubscribeState: mockUnsubscribeState,
//     startSocket: mockStartSocket,
//     waitForFirstConnection: mockWaitForFirstConnection,
//   })),
// }));
//
// vi.mock("@/store/ioBrokerStore.ts", () => ({
//   useIobrokerStore: () => ({
//     setAdminConnection: mockSetAdminConnection,
//     setValues: mockSetValues,
//     addIdToSubscribedIds: mockAddIdToSubscribedIds,
//     removeIdFromSubscribedIds: mockRemoveIdFromSubscribedIds,
//     subscribedIds: [],
//   }),
// }));
//
// vi.mock("@/lib/logger.ts", () => ({
//   Logger: mockLogger,
// }));
//
// // 3. Zu testende Funktionen importieren (nach den Mocks!)
// import * as connecter from "../../src/lib/connecter-to-iobroker";
// import { init, subscribeStates } from "../../src/lib/connecter-to-iobroker";
//
// // Testdaten für States
// const testStates = [
//   {
//     value: [
//       { id: "test.id.1", key: "key1", subKey: undefined, invertValue: false },
//       { id: "test.id.2", key: "key2", subKey: undefined, invertValue: true },
//     ],
//     storeFolder: "folder1",
//   },
// ];
//
// describe("connecter-to-iobroker", () => {
//   beforeEach(async () => {
//     mockSubscribeStateAsync.mockClear();
//     mockUnsubscribeState.mockClear();
//     mockSetValues.mockClear();
//     mockAddIdToSubscribedIds.mockClear();
//     mockRemoveIdFromSubscribedIds.mockClear();
//     mockLogger.mockClear();
//     // Setze die globale adminConnection für die Tests (dynamischer Import der gemockten Modul-Impl)
//     // const mocked = await import("@iobroker/socket-client");
//     // const MockAdminConnection = (mocked as any).AdminConnection;
//     // connecter.adminConnection = new MockAdminConnection();
//   });
//
//   it("subscribeStates ruft subscribeStateAsync und addIdToSubscribedIds auf", async () => {
//     await init();
//     subscribeStates(testStates);
//     expect(mockSubscribeStateAsync).toHaveBeenCalledTimes(2);
//     expect(mockAddIdToSubscribedIds).toHaveBeenCalledTimes(2);
//   });
//
//   // it("unSubscribeStates ruft unsubscribeState und removeIdFromSubscribedIds auf", () => {
//   //   connecter.unSubscribeStates(testStates);
//   //   expect(mockUnsubscribeState).toHaveBeenCalledTimes(2);
//   //   expect(mockRemoveIdFromSubscribedIds).toHaveBeenCalledWith("folder1");
//   // });
//   //
//   // it("init initialisiert AdminConnection und ruft setAdminConnection auf", async () => {
//   //   await connecter.init();
//   //   expect(mockStartSocket).toHaveBeenCalled();
//   //   expect(mockWaitForFirstConnection).toHaveBeenCalled();
//   //   expect(mockSetAdminConnection).toHaveBeenCalledWith(true);
//   // });
//   //
//   // it("loadScript fügt ein Skript-Tag hinzu und ruft init auf", () => {
//   //   const appendChildSpy = vi.spyOn(document.body, "appendChild");
//   //   const script = document.createElement("script");
//   //   vi.spyOn(document, "createElement").mockReturnValue(script);
//   //   const initSpy = vi.spyOn(connecter, "init").mockImplementation(() => Promise.resolve());
//   //   connecter.loadScript("/test.js");
//   //   expect(appendChildSpy).toHaveBeenCalledWith(script);
//   //   // Simuliere onload
//   //   script.onload && script.onload(new Event("load"));
//   //   expect(initSpy).toHaveBeenCalled();
//   //   appendChildSpy.mockRestore();
//   //   initSpy.mockRestore();
//   // });
// });
