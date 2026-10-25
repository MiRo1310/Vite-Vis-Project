import { describe, expect, it, vi } from "vitest";
import { NotificationMessage, type OptionalMessageParameter } from "@/lib/notificationMessage";
import { type TNotificationType } from "@/types/notification";

function createMessage(optional: OptionalMessageParameter = {}, type: TNotificationType = "info") {
  return new NotificationMessage("id-1", "Message", type, 10, optional);
}

describe("NotificationMessage", () => {
  it("exposes the constructor values", () => {
    const message = new NotificationMessage("id-1", "Hello", "warning", 42, {});

    expect(message.id).toBe("id-1");
    expect(message.message).toBe("Hello");
    expect(message.type).toBe("warning");
    expect(message.priority).toBe(42);
  });

  describe("hasDuration / durationMS", () => {
    it("has no duration when durationMS is undefined", () => {
      const message = createMessage();

      expect(message.hasDuration).toBe(false);
      expect(message.durationMS).toBeUndefined();
    });

    it("has no duration when durationMS is 0", () => {
      expect(createMessage({ durationMS: 0 }).hasDuration).toBe(false);
    });

    it("has no duration when durationMS is negative", () => {
      expect(createMessage({ durationMS: -100 }).hasDuration).toBe(false);
    });

    it("has a duration when durationMS is positive", () => {
      const message = createMessage({ durationMS: 5000 });

      expect(message.hasDuration).toBe(true);
      expect(message.durationMS).toBe(5000);
    });
  });

  describe("date", () => {
    it("uses the given date", () => {
      const date = new Date("2026-01-01T12:00:00Z");

      expect(createMessage({ date }).date).toBe(date);
    });

    it("sets the date once at creation when none is given", () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2026-01-01T12:00:00Z"));
      const message = createMessage();

      vi.setSystemTime(new Date("2026-01-01T13:00:00Z"));

      expect(message.date).toEqual(new Date("2026-01-01T12:00:00Z"));
      vi.useRealTimers();
    });
  });

  describe("status", () => {
    it("has no status when statusBoolean is undefined", () => {
      const message = createMessage();

      expect(message.hasStatus).toBe(false);
      expect(message.status).toBe(false);
    });

    it("has a status when statusBoolean is false", () => {
      const message = createMessage({ statusBoolean: false });

      expect(message.hasStatus).toBe(true);
      expect(message.status).toBe(false);
    });

    it("has a status when statusBoolean is true", () => {
      const message = createMessage({ statusBoolean: true });

      expect(message.hasStatus).toBe(true);
      expect(message.status).toBe(true);
    });
  });

  it("returns undefined route when none is given", () => {
    expect(createMessage().route).toBeUndefined();
  });

  describe("getNotificationClass", () => {
    it.each<[TNotificationType, string]>([
      ["success", "success"],
      ["error", "border border-destructive animate-pulse"],
      ["info", "info"],
      ["warning", "border border-yellow-400 animate-pulse"],
    ])("returns the class for %s", (type, expected) => {
      expect(createMessage({}, type).getNotificationClass).toBe(expected);
    });
  });
});
