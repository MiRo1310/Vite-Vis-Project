<script setup lang="ts">
import { h, onErrorCaptured, ref } from "vue";
import { useToast } from "@/components/ui/toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DialogShared from "@/components/shared/dialog/DialogShared.vue";
import ErrorToast from "@/components/layout/error/ErrorToast.vue";
import ErrorDetails from "@/components/layout/error/ErrorDetails.vue";

const { toast } = useToast();
const error = ref<unknown>(null);
const detailsOpen = ref(false);
const showErrorPage = ref(false);

function reportError(err: unknown, openPageDirectly: boolean) {
  error.value = err;
  // eslint-disable-next-line no-console
  console.error("[ErrorBoundary]", err);

  if (openPageDirectly) {
    showErrorPage.value = true;
    return;
  }

  toast({
    title: "Fehler",
    description: h(ErrorToast, { error: err, onDetails: () => (detailsOpen.value = true) }),
    variant: "destructive",
    duration: 20000,
  });
}

// Vue-Komponentenbaum gilt als potentiell kaputt -> sofort die volle Error-Seite zeigen
onErrorCaptured((err) => {
  reportError(err, true);
  return false;
});

// Globale JS-Fehler / unhandled Rejections betreffen nicht zwingend den Vue-Baum
// -> nur ein Toast, Details per Klick
window.addEventListener("error", (event) => {
  reportError(event.error ?? new Error(event.message), false);
});

window.addEventListener("unhandledrejection", (event) => {
  reportError(event.reason, false);
});
</script>
<template>
  <div v-if="showErrorPage" class="flex h-screen w-screen items-center justify-center p-4">
    <Card class="w-full max-w-lg py-0 gap-0">
      <CardHeader class="px-4 pt-3 pb-0">
        <CardTitle class="text-sm text-destructive">Ein Fehler ist aufgetreten</CardTitle>
      </CardHeader>
      <CardContent class="px-4 pt-2 pb-4">
        <ErrorDetails :error="error" />
      </CardContent>
    </Card>
  </div>
  <slot v-else />

  <DialogShared v-model:dialogOpen="detailsOpen" title="Fehlerdetails">
    <ErrorDetails :error="error" />
  </DialogShared>
</template>
