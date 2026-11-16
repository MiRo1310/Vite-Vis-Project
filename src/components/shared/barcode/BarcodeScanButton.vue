<script setup lang="ts">
import { ref, useTemplateRef } from "vue";
import { LoaderCircle, ScanBarcode } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast/use-toast";
import BarcodeLiveScanner from "@/components/shared/barcode/BarcodeLiveScanner.vue";
import { canLiveScan, detectEanInImage, vibrateOnScan } from "@/composables/barcodeScanner.ts";
import { Logger } from "@/lib/logger.ts";

/**
 * Barcode scannen: über HTTPS live mit der Kamera, sonst (z. B. `http://<IP>`) per Foto.
 * Liefert nur gültige EAN/UPC (Prüfziffer geprüft).
 */
/** `iconOnlyOnMobile`: Text erst ab sm zeigen (spart auf dem Handy Platz) */
withDefaults(defineProps<{ label?: string; class?: string; iconOnly?: boolean; iconOnlyOnMobile?: boolean }>(), {
  label: "Scannen",
  class: "",
  iconOnly: false,
  iconOnlyOnMobile: false,
});
const emits = defineEmits<{ detected: [ean: string] }>();

const { toast } = useToast();
const fileInput = useTemplateRef<HTMLInputElement>("fileInput");
const liveOpen = ref(false);
const decoding = ref(false);

const openPhoto = () => {
  fileInput.value?.click();
};

const scan = () => {
  if (canLiveScan()) {
    liveOpen.value = true;
    return;
  }
  openPhoto();
};

const onFile = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.item(0);
  input.value = "";
  if (!file) {
    return;
  }
  decoding.value = true;
  try {
    const ean = await detectEanInImage(file);
    if (!ean) {
      toast({ title: "Kein Barcode erkannt", description: "Halte die Kamera näher heran und achte auf ein scharfes Bild." });
      return;
    }
    vibrateOnScan();
    emits("detected", ean);
  } catch (e) {
    Logger.error("Barcode: Foto konnte nicht ausgewertet werden", e);
    toast({ title: "Scannen fehlgeschlagen", description: "Das Foto konnte nicht ausgewertet werden.", variant: "destructive" });
  } finally {
    decoding.value = false;
  }
};
</script>

<template>
  <Button
    type="button"
    variant="outline"
    :size="iconOnly ? 'icon' : 'default'"
    :class="['shrink-0', $props.class]"
    :disabled="decoding"
    :aria-label="label"
    :title="label"
    v-e2e="'barcode-scan'"
    @click.prevent="scan"
  >
    <LoaderCircle v-if="decoding" class="h-4 w-4 animate-spin" />
    <ScanBarcode v-else class="h-4 w-4" />
    <span v-if="!iconOnly" :class="iconOnlyOnMobile ? 'hidden sm:inline' : ''">{{ decoding ? "Lese Barcode …" : label }}</span>
  </Button>

  <!-- Foto: öffnet auf dem Handy direkt die Rückkamera, funktioniert auch ohne HTTPS -->
  <input ref="fileInput" type="file" accept="image/*" capture="environment" class="hidden" @change="onFile" />

  <BarcodeLiveScanner v-model:open="liveOpen" @detected="emits('detected', $event)" @use-photo="openPhoto" />
</template>
