import { afterEach, describe, expect, it, vi } from "vitest";
import { reloadWhenHidden } from "../../src/lib/pwaUpdate";

function setDocumentHidden(hidden: boolean) {
  Object.defineProperty(document, "hidden", { value: hidden, configurable: true });
}

describe("reloadWhenHidden", () => {
  afterEach(() => {
    setDocumentHidden(false);
  });

  it("reloads immediately when the document is already hidden", () => {
    setDocumentHidden(true);
    const reload = vi.fn();

    reloadWhenHidden(reload);

    expect(reload).toHaveBeenCalledOnce();
  });

  it("does not reload immediately when the document is visible, and waits for visibilitychange", () => {
    setDocumentHidden(false);
    const reload = vi.fn();

    reloadWhenHidden(reload);

    expect(reload).not.toHaveBeenCalled();

    document.dispatchEvent(new Event("visibilitychange"));
    expect(reload).not.toHaveBeenCalled();

    setDocumentHidden(true);
    document.dispatchEvent(new Event("visibilitychange"));

    expect(reload).toHaveBeenCalledOnce();
  });

  it("only reloads once even if visibilitychange fires multiple times while hidden", () => {
    setDocumentHidden(false);
    const reload = vi.fn();

    reloadWhenHidden(reload);

    setDocumentHidden(true);
    document.dispatchEvent(new Event("visibilitychange"));
    document.dispatchEvent(new Event("visibilitychange"));

    expect(reload).toHaveBeenCalledOnce();
  });
});
