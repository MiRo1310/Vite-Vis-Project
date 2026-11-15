export const getNameByIndex = (timers: { [key: number]: { name?: { value: string } } }, index: number): string => {
  const timerName = timers[index].name?.value;
  return timerName && timerName !== "Timer" ? timerName : `Timer ${index}`;
};

/**
 * Liest eine Dauer im Format `H:MM:SS`, `MM:SS` oder `SS` (so liefert sie alexa-timer-vis).
 *
 * @param text - z. B. `"00:04:32"`.
 * @returns Sekunden oder `null`, wenn der Text kein solches Format hat.
 * @example parseDuration("01:02:03"); // 3723
 */
export function parseDuration(text: string | null | undefined): number | null {
  const parts = (text ?? "").trim().split(":");
  if (parts.length > 3 || parts.some((part) => !/^\d+$/.test(part))) {
    return null;
  }
  return parts.reduce((total, part) => total * 60 + Number(part), 0);
}

/**
 * Formatiert Sekunden kurz: `M:SS` bzw. `H:MM:SS`.
 *
 * @param seconds - Dauer in Sekunden.
 * @returns z. B. `"4:32"` oder `"1:04:32"`.
 */
export function formatDuration(seconds: number): string {
  const total = Math.max(0, Math.round(seconds));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const secs = String(total % 60).padStart(2, "0");
  if (hours) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${secs}`;
  }
  return `${minutes}:${secs}`;
}

export interface AlexaTimerRaw {
  timeString?: string | null;
  initialTimer?: string | null;
  timeEnd?: string | null;
  name?: string | null;
  device?: string | null;
}

export interface AlexaTimerView {
  /** Slot 1–4 im Adapter (für Name-Fallback und Reset) */
  index: number;
  name: string;
  /** Restzeit zum Anzeigen, kurz formatiert oder – wenn nicht lesbar – wie geliefert */
  remainingText: string;
  remainingSeconds: number | null;
  /** Anteil der verstrichenen Zeit 0–1, `null` wenn unbekannt */
  progress: number | null;
  endTime: string;
  device: string;
}

/**
 * Bereitet einen Timer-Slot für die Anzeige auf. Leere Slots (keine Restzeit) ergeben `null`.
 *
 * @param index - Slot-Nummer (ab 1).
 * @param raw - Werte des Slots.
 * @returns Anzeige-Daten oder `null`.
 */
export function toAlexaTimerView(index: number, raw: AlexaTimerRaw): AlexaTimerView | null {
  const timeString = raw.timeString?.trim();
  if (!timeString) {
    return null;
  }
  const remainingSeconds = parseDuration(timeString);

  return {
    index,
    name: timerDisplayName(raw.name, index),
    remainingText: remainingSeconds === null ? timeString : formatDuration(remainingSeconds),
    remainingSeconds,
    progress: elapsedShare(remainingSeconds, parseDuration(raw.initialTimer)),
    endTime: raw.timeEnd?.trim() ?? "",
    device: raw.device?.trim() ?? "",
  };
}

/** Eigener Name des Timers, sonst „Timer <Slot>“ (der Adapter liefert sonst nur „Timer“). */
const timerDisplayName = (name: string | null | undefined, index: number): string => {
  const trimmed = name?.trim();
  if (!trimmed || trimmed.toLowerCase() === "timer") {
    return `Timer ${index}`;
  }
  return trimmed;
};

/** Verstrichener Anteil 0–1, `null` wenn Rest- oder Startdauer unbekannt ist. */
const elapsedShare = (remainingSeconds: number | null, initialSeconds: number | null): number | null => {
  if (remainingSeconds === null || !initialSeconds) {
    return null;
  }
  return Math.min(1, Math.max(0, 1 - remainingSeconds / initialSeconds));
};

/** Wie dringend ein Timer ist: für die Farbe in der Anzeige */
export type TimerUrgency = "normal" | "soon" | "now";

/**
 * @param remainingSeconds - Restzeit in Sekunden (`null` = unbekannt).
 * @returns `"now"` ab 10 s, `"soon"` ab 60 s Restzeit, sonst `"normal"`.
 */
export function getTimerUrgency(remainingSeconds: number | null): TimerUrgency {
  if (remainingSeconds === null) {
    return "normal";
  }
  if (remainingSeconds <= 10) {
    return "now";
  }
  if (remainingSeconds <= 60) {
    return "soon";
  }
  return "normal";
}
