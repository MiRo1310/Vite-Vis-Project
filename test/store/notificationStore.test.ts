import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useNotificationStore } from "@/store/notification-store.ts";
import { NotificationMessage } from "@/lib/notificationMessage.ts";

function addInfoMessages(store: ReturnType<typeof useNotificationStore>, count: number) {
  for (let i = 1; i <= count; i++) {
    store.addNotification(new NotificationMessage(`info_${i}`, `Info ${i}`, "info", 1, {}));
  }
}

describe("notificationStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("getNextIndex", () => {
    it("returns 0 if message list is empty", () => {
      const store = useNotificationStore();
      expect(store.getNextIndex()).toBe(0);
    });

    it("returns 0 if message list has only one message", () => {
      const store = useNotificationStore();

      store.addNotification(new NotificationMessage("12345", "Test", "info", 1, {}));
      expect(store.getNextIndex()).toBe(0);
    });

    it("returns indexes list with 3 messages", () => {
      const store = useNotificationStore();

      store.addNotification(new NotificationMessage("12345", "Test", "info", 1, {}));
      store.addNotification(new NotificationMessage("12345_2", "Test", "info", 1, {}));
      store.addNotification(new NotificationMessage("12345_3", "Test", "info", 1, {}));
      expect(store.getNextIndex()).toBe(1);
      expect(store.getNextIndex()).toBe(2);
      expect(store.getNextIndex()).toBe(0);
    });
  });

  describe("nextTickerNotification", () => {
    it("returns undefined if message list is empty", () => {
      const store = useNotificationStore();
      expect(store.nextTickerNotification()).toBeUndefined();
    });

    it("returns the notification at the current index", () => {
      const store = useNotificationStore();
      addInfoMessages(store, 3);

      store.getNextIndex();
      expect(store.nextTickerNotification()).toMatchObject({ id: "info_2" });
    });

    it("returns a notification after the list shrinks below the current index", () => {
      const store = useNotificationStore();
      addInfoMessages(store, 3);
      store.currentIndex = 2;

      store.removeNotification("info_3");
      expect(store.nextTickerNotification()).toBeDefined();
    });

    it("uses the list of the highest type when an error is added", () => {
      const store = useNotificationStore();
      addInfoMessages(store, 2);

      store.addNotification(new NotificationMessage("error_1", "Error", "error", 1, {}));
      expect(store.nextTickerNotification()).toMatchObject({ id: "error_1" });
    });
  });

  describe("getTickerLabel", () => {
    it("shows position and total", () => {
      const store = useNotificationStore();
      addInfoMessages(store, 3);

      store.getNextIndex();
      expect(store.getTickerLabel()).toBe("2 / 3");
    });

    it("never shows a position greater than the total after the list shrinks", () => {
      const store = useNotificationStore();
      addInfoMessages(store, 3);
      store.currentIndex = 2;

      store.removeNotification("info_3");
      expect(store.getTickerLabel()).toBe("1 / 2");
    });
  });

  describe("ticker interval", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      useNotificationStore().stopTicker();
      vi.useRealTimers();
    });

    it("advances the index on every interval", () => {
      const store = useNotificationStore();
      addInfoMessages(store, 3);

      store.startTicker(5000);
      vi.advanceTimersByTime(4999);
      expect(store.currentIndex).toBe(0);
      vi.advanceTimersByTime(1);
      expect(store.currentIndex).toBe(1);
      vi.advanceTimersByTime(5000);
      expect(store.currentIndex).toBe(2);
      vi.advanceTimersByTime(5000);
      expect(store.currentIndex).toBe(0);
    });

    it("does not start a second interval when started twice", () => {
      const store = useNotificationStore();
      addInfoMessages(store, 3);

      store.startTicker(5000);
      store.startTicker(5000);
      vi.advanceTimersByTime(5000);
      expect(store.currentIndex).toBe(1);
    });

    it("stops advancing after stopTicker", () => {
      const store = useNotificationStore();
      addInfoMessages(store, 3);

      store.startTicker(5000);
      vi.advanceTimersByTime(5000);
      store.stopTicker();
      vi.advanceTimersByTime(15000);
      expect(store.currentIndex).toBe(1);
      expect(store.tickerIntervalId).toBeNull();
    });

    it("can be restarted after stopTicker", () => {
      const store = useNotificationStore();
      addInfoMessages(store, 3);

      store.startTicker(5000);
      store.stopTicker();
      store.startTicker(5000);
      vi.advanceTimersByTime(5000);
      expect(store.currentIndex).toBe(1);
    });
  });
});
