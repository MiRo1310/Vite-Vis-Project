/**
 * Feste Timer-Slots von alexa-timer-vis (`timer1` … `timer6`).
 * Muss zu den Slots unter `timers` in `iobroker-states/subscribed-states.iobroker.ts` passen.
 */
export const ALEXA_TIMER_SLOTS = [1, 2, 3, 4, 5, 6] as const;

export type AlexaTimerSlot = (typeof ALEXA_TIMER_SLOTS)[number];
