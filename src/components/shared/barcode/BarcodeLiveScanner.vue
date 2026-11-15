<script setup lang="ts">
import { onBeforeUnmount, ref, useTemplateRef, watch } from "vue";
import { Camera, Flashlight, FlashlightOff, X } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { detectEanInVideo, loadBarcodeDetector, vibrateOnScan } from "@/composables/barcodeScanner.ts";
import { Logger } from "@/lib/logger.ts";

const open = defineModel<boolean>("open", { default: false });
const emits = defineEmits<{ detected: [ean: string]; usePhoto: [] }>();

/** Gleicher Code in zwei Bildern hintereinander, damit Fehllesungen nicht durchrutschen */
const REQUIRED_HITS = 2;
const SCAN_INTERVAL_MS = 200;

const video = useTemplateRef<HTMLVideoElement>("video");
const error = ref<string | null>(null);
const starting = ref(false);
const torchAvailable = ref(false);
const torchOn = ref(false);

let stream: MediaStream | null = null;
let timer: number | undefined;
let lastCode: string | null = null;
let hits = 0;

/** Als Funktion, damit nach einem `await` neu geprüft wird – `stop()` kann zwischendurch laufen */
const isRunning = (): boolean => stream !== null;

const stop = () => {
  window.clearTimeout(timer);
  timer = undefined;
  stream?.getTracks().forEach((track) => track.stop());
  stream = null;
  torchOn.value = false;
  torchAvailable.value = false;
  lastCode = null;
  hits = 0;
};

const scanLoop = async () => {
  if (!video.value || !stream) {
    return;
  }
  try {
    const ean = await detectEanInVideo(video.value);
    hits = ean && ean === lastCode ? hits + 1 : Number(!!ean);
    lastCode = ean;
    if (ean && hits >= REQUIRED_HITS) {
      vibrateOnScan();
      emits("detected", ean);
      open.value = false;
      return;
    }
  } catch (e) {
    Logger.error("Barcode: Erkennung im Video fehlgeschlagen", e);
  }
  if (isRunning()) {
    timer = window.setTimeout(() => void scanLoop(), SCAN_INTERVAL_MS);
  }
};

const start = async () => {
  error.value = null;
  starting.value = true;
  try {
    const [, mediaStream] = await Promise.all([
      loadBarcodeDetector(),
      navigator.mediaDevices.getUserMedia({ audio: false, video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 }, height: { ideal: 720 } } }),
    ]);
    if (!open.value) {
      mediaStream.getTracks().forEach((track) => track.stop());
      return;
    }
    stream = mediaStream;
    const [track] = stream.getVideoTracks();
    // getCapabilities fehlt in manchen Browsern (z. B. Firefox)
    const capabilities = ("getCapabilities" in track ? track.getCapabilities() : {}) as MediaTrackCapabilities & { torch?: boolean };
    torchAvailable.value = !!capabilities.torch;

    if (video.value) {
      video.value.srcObject = stream;
      await video.value.play();
    }
    void scanLoop();
  } catch (e) {
    Logger.error("Barcode: Kamera konnte nicht gestartet werden", e);
    const name = e instanceof DOMException ? e.name : "";
    error.value =
      name === "NotAllowedError" ? "Der Kamerazugriff wurde nicht erlaubt." : "Die Kamera konnte nicht gestartet werden. Probier es mit einem Foto.";
    stop();
  } finally {
    starting.value = false;
  }
};

const toggleTorch = async () => {
  const track = stream?.getVideoTracks()[0];
  if (!track) {
    return;
  }
  try {
    await track.applyConstraints({ advanced: [{ torch: !torchOn.value } as MediaTrackConstraintSet] });
    torchOn.value = !torchOn.value;
  } catch (e) {
    Logger.error("Barcode: Taschenlampe nicht schaltbar", e);
  }
};

const usePhoto = () => {
  open.value = false;
  emits("usePhoto");
};

watch(open, (isOpen) => {
  if (isOpen) {
    // Video-Element existiert erst nach dem Rendern des Dialogs
    window.setTimeout(() => void start(), 0);
    return;
  }
  stop();
});

onBeforeUnmount(stop);
</script>

<template>
  <Dialog v-model:open="open">
    <DialogContent class="p-0 gap-0 overflow-hidden bg-black text-white border-0 sm:max-w-lg max-sm:inset-0 max-sm:translate-x-0 max-sm:translate-y-0 max-sm:max-w-none max-sm:rounded-none [&>button]:hidden">
      <DialogTitle class="sr-only">Barcode scannen</DialogTitle>
      <DialogDescription class="sr-only">Halte den Barcode in den Rahmen.</DialogDescription>

      <div class="relative w-full h-dvh sm:h-auto sm:aspect-3/4 bg-black">
        <video ref="video" class="absolute inset-0 h-full w-full object-cover" playsinline muted autoplay />

        <!-- Zielrahmen -->
        <div v-if="!error" class="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div class="w-[78%] max-w-sm aspect-[2/1] rounded-2xl border-2 border-white/90 shadow-[0_0_0_9999px_rgb(0_0_0/0.45)] relative overflow-hidden">
            <span class="absolute inset-x-3 top-1/2 h-0.5 bg-recipe-tomato/90 animate-pulse" />
          </div>
        </div>

        <!-- Kopf -->
        <div class="absolute top-0 inset-x-0 flex items-center justify-between p-3 pt-[calc(0.75rem+env(safe-area-inset-top))]">
          <Button variant="ghost" size="icon-lg" class="rounded-full bg-black/40 text-white hover:bg-black/60 hover:text-white" aria-label="Schließen" @click="open = false">
            <X class="h-5 w-5" />
          </Button>
          <Button
            v-if="torchAvailable"
            variant="ghost"
            size="icon-lg"
            class="rounded-full bg-black/40 text-white hover:bg-black/60 hover:text-white"
            :aria-label="torchOn ? 'Licht aus' : 'Licht an'"
            @click="toggleTorch"
          >
            <FlashlightOff v-if="torchOn" class="h-5 w-5" />
            <Flashlight v-else class="h-5 w-5" />
          </Button>
        </div>

        <!-- Fuß -->
        <div class="absolute bottom-0 inset-x-0 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] flex flex-col items-center gap-3 text-center">
          <p v-if="error" class="text-sm bg-black/60 rounded-xl px-3 py-2">{{ error }}</p>
          <p v-else class="text-sm text-white/80">{{ starting ? "Kamera startet …" : "Barcode in den Rahmen halten" }}</p>
          <Button variant="outline" class="rounded-full bg-black/40 border-white/40 text-white hover:bg-black/60 hover:text-white" @click="usePhoto">
            <Camera class="h-4 w-4" /> Stattdessen Foto aufnehmen
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
