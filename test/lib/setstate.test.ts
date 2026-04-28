import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Wir erstellen die mocks innerhalb der vi.mock-Fabrik, um Hoisting-Probleme zu vermeiden.
let mockGetObject: ReturnType<typeof vi.fn>;
let mockSetState: ReturnType<typeof vi.fn>;
let warnSpy: ReturnType<typeof vi.spyOn>;
let errorSpy: ReturnType<typeof vi.spyOn>;

afterEach(() => {
  vi.restoreAllMocks();
});

vi.mock("../../src/lib/connecter-to-iobroker", () => {
  const getObject = vi.fn();
  const setState = vi.fn();
  return {
    adminConnection: {
      getObject,
      setState,
    },
  };
});

// Importiere erst nach dem Mock
import { setstate } from "../../src/lib/setstate";

describe("setstate / transformValueToCorrectType", () => {
  beforeEach(async () => {
    // Nachdem die Mock-Fabrik registriert ist, holen wir die tatsächlichen Mock-Funktionen
    const mocked = await import("../../src/lib/connecter-to-iobroker");
    mockGetObject = mocked.adminConnection?.getObject as ReturnType<typeof vi.fn>;
    mockSetState = mocked.adminConnection?.setState as ReturnType<typeof vi.fn>;
    mockGetObject.mockReset();
    mockSetState.mockReset();
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
    const mod = await import("../../src/lib/connecter-to-iobroker");
    (mod as any).adminConnection = undefined;
    // Auch wenn getObject im Mock definiert ist, wird es nicht verwendet, weil adminConnection fehlt
    mockGetObject.mockResolvedValue({ common: { type: "boolean" } });
    await setstate("test.id", "abc");
    expect(mockSetState).not.toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalledTimes(1);
  });
});
