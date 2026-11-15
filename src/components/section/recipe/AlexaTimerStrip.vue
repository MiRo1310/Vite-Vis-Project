<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";
import { Check, Timer, X } from "@lucide/vue";
import { useToast } from "@/components/ui/toast/use-toast";
import { useAlexaTimers } from "@/composables/alexaTimers.ts";
import { type AlexaTimerView, getTimerUrgency, type TimerUrgency } from "@/lib/timer.ts";
import { Logger } from "@/lib/logger.ts";

/**
 * Laufende Alexa-Timer als waagerechte Leiste (Detailseite, Kochmodus).
 * `size="lg"`: größere Schrift für den Kochmodus. `showEmpty`: Hinweis, wenn kein Timer läuft.
 */
withDefaults(defineProps<{ size?: "md" | "lg"; showEmpty?: boolean }>(), { size: "md", showEmpty: false });

const { toast } = useToast();
const { isAlive, timers, stop } = useAlexaTimers();

const urgencyClasses: Record<TimerUrgency, { card: string; bar: string; text: string }> = {
  normal: { card: "border-border/60 bg-card", bar: "bg-recipe-lavender", text: "" },
  soon: { card: "border-recipe-mango/60 bg-recipe-mango-soft", bar: "bg-recipe-mango", text: "text-recipe-mango-fg" },
  now: { card: "border-recipe-tomato/70 bg-recipe-tomato-soft animate-pulse", bar: "bg-recipe-tomato", text: "text-recipe-tomato-fg" },
};

// Stoppen braucht einen zweiten Tipp, damit nichts aus Versehen mit nassen Händen passiert
const confirmIndex = ref<number | null>(null);
let confirmTimer: number | undefined;

const onStop = async (timer: AlexaTimerView) => {
  if (confirmIndex.value !== timer.index) {
    confirmIndex.value = timer.index;
    window.clearTimeout(confirmTimer);
    confirmTimer = window.setTimeout(() => (confirmIndex.value = null), 3000);
    return;
  }
  confirmIndex.value = null;
  try {
    const done = await stop(timer.index);
    if (!done) {
      toast({ title: "Keine Verbindung", description: "ioBroker ist gerade nicht erreichbar.", variant: "destructive" });
    }
  } catch (e) {
    Logger.error("Alexa-Timer stoppen fehlgeschlagen", e);
    toast({ title: "Timer nicht gestoppt", description: timer.name, variant: "destructive" });
  }
};

onBeforeUnmount(() => window.clearTimeout(confirmTimer));
</script>

<template>
  <div v-if="isAlive && timers.length" class="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1" role="list" aria-label="Alexa-Timer">
    <div
      v-for="timer in timers"
      :key="timer.index"
      role="listitem"
      :class="[
        'relative shrink-0 rounded-2xl border overflow-hidden flex items-center gap-3 transition-colors',
        size === 'lg' ? 'min-w-56 pl-4 pr-2 py-2.5' : 'min-w-48 pl-3 pr-1.5 py-2',
        urgencyClasses[getTimerUrgency(timer.remainingSeconds)].card,
      ]"
      v-e2e="'alexa-timer'"
    >
      <Timer :class="['shrink-0 text-recipe-lavender-fg', size === 'lg' ? 'h-6 w-6' : 'h-5 w-5', urgencyClasses[getTimerUrgency(timer.remainingSeconds)].text]" />
      <div class="min-w-0 flex-1 leading-tight">
        <p :class="['font-bold font-mono tabular-nums', size === 'lg' ? 'text-3xl' : 'text-xl', urgencyClasses[getTimerUrgency(timer.remainingSeconds)].text]">
          {{ timer.remainingText }}
        </p>
        <p class="text-xs text-muted-foreground truncate">
          {{ timer.name }}<template v-if="timer.endTime"> · bis {{ timer.endTime }}</template><template v-if="timer.device"> · {{ timer.device }}</template>
        </p>
      </div>
      <button
        type="button"
        :class="[
          'shrink-0 h-10 rounded-full flex items-center justify-center gap-1 text-xs font-medium transition-all',
          confirmIndex === timer.index ? 'px-3 bg-destructive text-white' : 'w-10 text-muted-foreground hover:bg-accent hover:text-foreground',
        ]"
        :aria-label="confirmIndex === timer.index ? `${timer.name} wirklich stoppen` : `${timer.name} stoppen`"
        @click="onStop(timer)"
      >
        <template v-if="confirmIndex === timer.index"><Check class="h-4 w-4" /> Stoppen</template>
        <X v-else class="h-4 w-4" />
      </button>

      <!-- Fortschritt -->
      <span v-if="timer.progress !== null" class="absolute left-0 bottom-0 h-1 w-full bg-muted/60" aria-hidden="true">
        <span
          :class="['block h-full transition-[width] duration-1000 ease-linear', urgencyClasses[getTimerUrgency(timer.remainingSeconds)].bar]"
          :style="{ width: `${timer.progress * 100}%` }"
        />
      </span>
    </div>
  </div>

  <p v-else-if="showEmpty && isAlive" class="text-xs text-muted-foreground flex items-center gap-1.5">
    <Timer class="h-3.5 w-3.5" /> Kein Alexa-Timer aktiv – „Alexa, stell einen Timer auf 10 Minuten“
  </p>
</template>
