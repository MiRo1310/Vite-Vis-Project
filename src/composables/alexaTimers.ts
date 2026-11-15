import { computed } from "vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { ioBrokerService } from "@/lib/io-broker-service.ts";
import { type AlexaTimerView, toAlexaTimerView } from "@/lib/timer.ts";
import { ALEXA_TIMER_SLOTS } from "@/constants/timer.ts";

/**
 * Laufende Alexa-Timer aus alexa-timer-vis (reaktiv) und Stoppen per `timerN.Reset`.
 * Feste Slots: `ALEXA_TIMER_SLOTS` (1–6).
 */
export const useAlexaTimers = () => {
  const { iobroker } = useIobrokerStore();

  /** Adapter läuft (sonst sind die Werte veraltet) */
  const isAlive = computed(() => !!iobroker.timers.timerAlive.value);

  const timers = computed((): AlexaTimerView[] =>
    ALEXA_TIMER_SLOTS.map((index) => {
      const slot = iobroker.timers[index];
      return toAlexaTimerView(index, {
        timeString: slot.timeString.value,
        initialTimer: slot.initialTimer.value,
        timeEnd: slot.timeEnd.value,
        name: slot.name.value,
        device: slot.device.value,
      });
    }).filter((timer): timer is AlexaTimerView => timer !== null),
  );

  const stop = async (index: number): Promise<boolean> => {
    const connection = ioBrokerService.connection;
    if (!connection) {
      return false;
    }
    await connection.setState(`alexa-timer-vis.0.timer${index}.Reset`, true);
    return true;
  };

  return { isAlive, timers, stop };
};
