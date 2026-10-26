export const UNKNOWN_ERROR = "Unbekannter Fehler";

export interface FormattedError {
  message: string;
  details?: string;
}

type ErrorLike = { name?: unknown; message?: unknown; stack?: unknown; type?: unknown; target?: unknown };

function describeTarget(target: unknown): string {
  if (!target || typeof target !== "object") {
    return "";
  }
  const el = target as { tagName?: string; src?: string; href?: string };
  if (!el.tagName) {
    return "";
  }
  const tag = el.tagName.toLowerCase();
  const source = el.src ?? el.href;
  if (source) {
    return ` (${tag}: ${source})`;
  }
  return ` (${tag})`;
}

function stringify(value: object): string {
  if (value instanceof Error) {
    return "";
  }
  try {
    const json = JSON.stringify(value);
    if (json && json !== "{}") {
      return json;
    }
  } catch {
    // zirkuläre Strukturen o.ä. -> keine Meldung ableitbar
  }
  return "";
}

function messageFromErrorLike(obj: ErrorLike): string {
  if (typeof obj.message !== "string") {
    return "";
  }
  const name = typeof obj.name === "string" && obj.name !== "Error" ? obj.name : "";
  const message = obj.message.trim();
  if (name && message) {
    return `${name}: ${message}`;
  }
  return message || name;
}

function messageFromEvent(obj: ErrorLike): string {
  if (typeof obj.type !== "string" || !("target" in obj)) {
    return "";
  }
  // Event-Objekte (z.B. fehlgeschlagenes Laden eines Scripts/Bildes) haben keine message
  return `Event "${obj.type}"${describeTarget(obj.target)}`;
}

/**
 * Wandelt einen beliebigen geworfenen Wert (Error, DOMException, String, Event, Objekt, …)
 * in eine immer nicht-leere, lesbare Meldung um.
 */
export function formatError(err: unknown): FormattedError {
  if (err === null || err === undefined) {
    return { message: UNKNOWN_ERROR };
  }
  if (typeof err === "string") {
    return { message: err.trim() || UNKNOWN_ERROR };
  }
  if (typeof err !== "object") {
    return { message: String(err) };
  }

  const obj = err as ErrorLike;
  const details = typeof obj.stack === "string" ? obj.stack : undefined;
  const message = messageFromErrorLike(obj) || messageFromEvent(obj) || stringify(err) || UNKNOWN_ERROR;
  return { message, details };
}

/**
 * Erkennt vom Browser "geschwärzte" Fehler: Stammt ein Fehler aus einem Cross-Origin-Script
 * (z.B. socket.io.js vom ioBroker) oder aus Safari-internem Code (z.B. beim Öffnen des Teilen-Menüs),
 * liefert der Browser nur "Script error." ohne Fehlerobjekt, Datei und Zeile. Diese Fehler sind
 * nicht auswertbar und für die App nicht relevant.
 */
export function isOpaqueScriptError(message: string, error: unknown, filename?: string): boolean {
  return !error && !filename && message.trim() === "Script error.";
}

export function isChunkLoadError(error?: string): boolean {
  return ["'text/html' is not a valid JavaScript MIME type"].some((e) => error?.includes(e));
}
