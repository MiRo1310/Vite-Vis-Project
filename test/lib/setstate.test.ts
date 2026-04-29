import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Wir erstellen die mocks innerhalb der vi.mock-Fabrik, um Hoisting-Probleme zu vermeiden.
// Declare the mock functions here so they are available to the mock factory (no hoisting issues)
const _mockGetObject = vi.fn();
const _mockSetState = vi.fn();
let mockGetObject: ReturnType<typeof vi.fn> = _mockGetObject;
let mockSetState: ReturnType<typeof vi.fn> = _mockSetState;
let warnSpy: ReturnType<typeof vi.spyOn>;
let errorSpy: ReturnType<typeof vi.spyOn>;

afterEach(() => {
  vi.restoreAllMocks();
});

// Mock the module that `setstate.ts` actually imports (`iobroker-service`)
vi.mock("../../src/lib/iobroker-service", () => {
  return {
    adminConnection: {
      getObject: _mockGetObject,
      setState: _mockSetState,
    },
  };
});

// We'll import the module under test dynamically in beforeEach so we can re-load with mocks
let setstate: any;

describe("setstate / transformValueToCorrectType", () => {
  beforeEach(async () => {
    // Reset the top-level mocks
    mockGetObject = _mockGetObject;
    mockSetState = _mockSetState;
    mockGetObject.mockReset();
    mockSetState.mockReset();
    // dynamically import the module under test so it uses the current mocks
    const mod = await import("../../src/lib/setstate");
    setstate = mod.setstate;
    // setze console spies
    warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("wandelt string in number um wenn Typ 'number' ist", async () => {
    mockGetObject.mockResolvedValue({ common: { type: "number" } });
    await setstate("some.id.number", "123.5", true);
    expect(mockGetObject).toHaveBeenCalledWith("some.id.number");
    expect(mockSetState).toHaveBeenCalledWith("some.id.number", 123.5, true);
  });

  it("wandelt string 'true' in boolean true wenn Typ 'boolean' ist", async () => {
    mockGetObject.mockResolvedValue({ common: { type: "boolean" } });
    await setstate("some.id.bool", "true");
    expect(mockSetState).toHaveBeenCalledWith("some.id.bool", true, false);
  });

  it("wandelt gibt boolean zurück wenn Typ 'boolean' ist", async () => {
    mockGetObject.mockResolvedValue({ common: { type: "boolean" } });
    await setstate("some.id.bool", false);
    expect(mockSetState).toHaveBeenCalledWith("some.id.bool", false, false);
  });

  it("wandelt number in string wenn Typ 'string' ist", async () => {
    mockGetObject.mockResolvedValue({ common: { type: "string" } });
    await setstate("some.id.str", 42);
    expect(mockSetState).toHaveBeenCalledWith("some.id.str", "42", false);
  });

  it("verwendet originalen Wert wenn kein Typ vorhanden ist", async () => {
    mockGetObject.mockResolvedValue(undefined);
    await setstate("some.id.unknown", "abc");
    expect(mockSetState).toHaveBeenCalledWith("some.id.unknown", "abc", false);
  });

  it("verwendet originalen Wert wenn kein erwarteter Typ vorhanden ist", async () => {
    mockGetObject.mockResolvedValue({ common: { type: "unknown" } });
    await setstate("some.id.unknown", "abc");
    expect(mockSetState).toHaveBeenCalledWith("some.id.unknown", "abc", false);
  });

  it("setstate wird nicht aufgerufen wenn die id fehlt", async () => {
    mockGetObject.mockResolvedValue({ common: { type: "boolean" } });
    await setstate(undefined, "abc");
    expect(mockSetState).not.toHaveBeenCalled();
    expect(warnSpy).toHaveBeenCalledTimes(1);
  });

  it("setstate wird nicht aufgerufen wenn die admin connection fehlt", async () => {
    // Simuliere, dass die adminConnection nicht verfügbar ist
    const mod = await import("../../src/lib/iobroker-service");
    (mod as any).adminConnection = undefined;
    // Auch wenn getObject im Mock definiert ist, wird es nicht verwendet, weil adminConnection fehlt
    mockGetObject.mockResolvedValue({ common: { type: "boolean" } });
    await setstate("test.id", "abc");
    expect(mockSetState).not.toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalledTimes(1);
  });
});
