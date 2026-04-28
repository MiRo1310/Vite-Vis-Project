import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Logger } from "../../src/lib/logger";

describe("Logger", () => {
  let logSpy: ReturnType<typeof vi.spyOn>;
  let errorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("logs message and value when provided", () => {
    Logger("test-message", { value: 123, type: "log" });
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith("test-message", " ", 123);
  });

  it("logs error.message when provided", () => {
    const err = { message: "oops" };
    Logger("err", { e: err, type: "log" });
    // first call: initial log
    expect(logSpy).toHaveBeenNthCalledWith(1, "err", " ", undefined);
    // second call: Error message
    expect(logSpy).toHaveBeenNthCalledWith(2, `Error message: ${err.message}`);
  });

  it("logs error.stack when provided", () => {
    const err = { stack: "stacktrace" } as any;
    Logger("err2", { e: err });
    // initial log uses console.log by default
    expect(logSpy).toHaveBeenCalledWith("err2", " ", undefined);
    // stack should be logged via console.error
    expect(errorSpy).toHaveBeenCalledWith(`Error stack: ${err.stack}`);
  });

  it("logs error object when no message/stack", () => {
    const err = "some error" as any;
    Logger("err3", { e: err, type: "error" });
    // initial call uses console.error because type === 'error'
    expect(errorSpy).toHaveBeenNthCalledWith(1, "err3", " ", undefined);
    // then fallback to printing error object
    expect(errorSpy).toHaveBeenNthCalledWith(2, `Error object: ${err}`);
  });

  it("respects useDebugMode (no log when useDebugMode true and debugMode false)", () => {
    Logger("nodebug", { value: 1, useDebugMode: true });
    expect(logSpy).not.toHaveBeenCalled();
    expect(errorSpy).not.toHaveBeenCalled();
  });
});
