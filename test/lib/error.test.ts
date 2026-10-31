import { describe, expect, it } from "vitest";
import { formatError, isChunkLoadError, isOpaqueScriptError, UNKNOWN_ERROR } from "@/lib/error";

describe("formatError", () => {
  it("returns fallback for null/undefined", () => {
    expect(formatError(null).message).toBe(UNKNOWN_ERROR);
    expect(formatError(undefined).message).toBe(UNKNOWN_ERROR);
  });

  it("uses message and stack of an Error", () => {
    const err = new Error("kaputt");
    const result = formatError(err);
    expect(result.message).toBe("kaputt");
    expect(result.details).toBe(err.stack);
  });

  it("prefixes non-generic error names", () => {
    expect(formatError(new TypeError("x is undefined")).message).toBe("TypeError: x is undefined");
  });

  it("falls back to the name when the message is empty", () => {
    expect(formatError(new TypeError("")).message).toBe("TypeError");
    expect(formatError(new Error("")).message).toBe(UNKNOWN_ERROR);
  });

  it("handles DOMException-like objects", () => {
    expect(formatError({ name: "NotAllowedError", message: "denied" }).message).toBe("NotAllowedError: denied");
  });

  it("handles strings", () => {
    expect(formatError("boom").message).toBe("boom");
    expect(formatError("   ").message).toBe(UNKNOWN_ERROR);
  });

  it("handles primitives", () => {
    expect(formatError(42).message).toBe("42");
    expect(formatError(false).message).toBe("false");
  });

  it("describes events without message", () => {
    const event = { type: "error", target: { tagName: "SCRIPT", src: "http://host/socket.io.js" } };
    // eslint-disable-next-line
    expect(formatError(event).message).toBe('Event "error" (script: http://host/socket.io.js)');
    // eslint-disable-next-line
    expect(formatError({ type: "error", target: null }).message).toBe('Event "error"');
  });

  it("stringifies plain objects", () => {
    // eslint-disable-next-line
    expect(formatError({ code: 500, reason: "server" }).message).toBe('{"code":500,"reason":"server"}');
    expect(formatError({}).message).toBe(UNKNOWN_ERROR);
  });

  it("does not throw on circular objects", () => {
    const circular: Record<string, unknown> = {};
    circular.self = circular;
    expect(formatError(circular).message).toBe(UNKNOWN_ERROR);
  });
});

describe("isOpaqueScriptError", () => {
  it("detects sanitized cross-origin script errors", () => {
    expect(isOpaqueScriptError("Script error.", null, "")).toBe(true);
    expect(isOpaqueScriptError("Script error.", undefined)).toBe(true);
  });

  it("does not match real errors", () => {
    expect(isOpaqueScriptError("Script error.", new Error("x"), "")).toBe(false);
    expect(isOpaqueScriptError("Script error.", null, "http://host/app.js")).toBe(false);
    expect(isOpaqueScriptError("x is undefined", null, "")).toBe(false);
  });
});

describe("isChunkLoadError", () => {
  it("returns true if the error contains the MIME-type message", () => {
    expect(isChunkLoadError("From: /navigation to: /system, Message: 'text/html' is not a valid JavaScript MIME type., Stacktrace: -")).toBe(true);
    expect(isChunkLoadError("'text/html' is not a valid JavaScript MIME type 123")).toBe(true);
    expect(isChunkLoadError("Failed to fetch dynamically imported module")).toBe(true);
    expect(
      isChunkLoadError(
        "From: / to: /navigation, Message: Failed to fetch dynamically imported module: http://192.168.1.10/assets/navigation-DUgH0lak.js, Stacktrace: TypeError: Failed to fetch dynamically imported module: http://192.168.1.10/assets/navigation-DUgH0lak.js",
      ),
    ).toBe(true);
  });

  it("returns false if the error does not contain the MIME-type message", () => {
    expect(isChunkLoadError()).toBe(false);
    expect(isChunkLoadError("Test 123")).toBe(false);
  });
});
