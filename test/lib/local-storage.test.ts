import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { typedStorage } from "@/lib/local-storage.ts";

describe("typedStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("getItem", () => {
    it("returns the default values when nothing is stored", () => {
      expect(typedStorage.getItem("autoUpdate")).toBe(true);
      expect(typedStorage.getItem("deviceId")).toBeNull();
      expect(typedStorage.getItem("routerReload")).toEqual({ to: null, attempt: 0, triedNavigateToHome: false });
    });

    it("returns the default value and logs an error for invalid JSON", () => {
      const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      localStorage.setItem("routerReload", "{kaputt");

      expect(typedStorage.getItem("routerReload")).toEqual({ to: null, attempt: 0, triedNavigateToHome: false });
      expect(errorSpy).toHaveBeenCalledOnce();
    });

    it("returns a stored false instead of the default true", () => {
      localStorage.setItem("autoUpdate", "false");

      expect(typedStorage.getItem("autoUpdate")).toBe(false);
    });

    it("returns the default boolean value when null is stored", () => {
      localStorage.setItem("autoUpdate", "null");

      expect(typedStorage.getItem("autoUpdate")).toBe(true);
    });

    it("returns the default object value when null is stored", () => {
      localStorage.setItem("active-tab", "null");

      expect(typedStorage.getItem("active-tab")).toStrictEqual({});
    });
  });

  describe("setItem", () => {
    it("stores the value as JSON and returns it", () => {
      const value = { to: "/home", attempt: 2, triedNavigateToHome: true };

      expect(typedStorage.setItem("routerReload", value)).toEqual(value);
      expect(localStorage.getItem("routerReload")).toBe(JSON.stringify(value));
    });

    it("round-trips values through getItem", () => {
      typedStorage.setItem("deviceId", "abc-123");
      typedStorage.setItem("autoUpdate", false);

      expect(typedStorage.getItem("deviceId")).toBe("abc-123");
      expect(typedStorage.getItem("autoUpdate")).toBe(false);
    });

    it("does not share returned defaults between calls", () => {
      const first = typedStorage.getItem("routerReload");
      expect(first.attempt).toBe(0);

      first.attempt = 5;
      expect(typedStorage.getItem("routerReload").attempt).toBe(0);
    });
  });
});
