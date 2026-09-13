import { beforeEach, describe, expect, test } from "vitest";
import { tabToLocalStorage } from "../../src/composables/tabToLocalStorage.ts";

describe("tabToLocalStorage composable", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("uses defaultTab when nothing is stored yet", () => {
    const { activeTab } = tabToLocalStorage({ defaultTab: "daten", id: "watt-pilot" });

    expect(activeTab.value).toBe("daten");
  });

  test("clickTab updates activeTab and persists it under the given id", () => {
    const { activeTab, clickTab } = tabToLocalStorage({ defaultTab: "daten", id: "watt-pilot" });

    clickTab("einstellungen");

    expect(activeTab.value).toBe("einstellungen");
    expect(JSON.parse(localStorage.getItem("active-tab") ?? "{}")).toMatchObject({ "watt-pilot": "einstellungen" });
  });

  test("restores the persisted tab for the given id on next call", () => {
    tabToLocalStorage({ defaultTab: "daten", id: "watt-pilot" }).clickTab("einstellungen");

    const { activeTab } = tabToLocalStorage({ defaultTab: "daten", id: "watt-pilot" });

    expect(activeTab.value).toBe("einstellungen");
  });

  test("keeps separate state per id", () => {
    tabToLocalStorage({ defaultTab: "daten", id: "watt-pilot" }).clickTab("einstellungen");

    const { activeTab } = tabToLocalStorage({ defaultTab: "daten", id: "heat-pump" });

    expect(activeTab.value).toBe("daten");
  });

  test("falls back to defaultTab if localStorage contains invalid JSON", () => {
    localStorage.setItem("active-tab", "not-json");

    const { activeTab } = tabToLocalStorage({ defaultTab: "daten", id: "watt-pilot" });

    expect(activeTab.value).toBe("daten");
  });
});