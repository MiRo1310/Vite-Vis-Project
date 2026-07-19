<script setup lang="ts">
import { computed, onErrorCaptured, ref } from "vue";
import { useToast } from "@/components/ui/toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const { toast } = useToast();
const error = ref();

// Fehler aus dem Vue-Komponentenbaum: Baum gilt als potentiell kaputt,
// deshalb Fallback-UI statt nur Toast (siehe #error-Slot unten)
onErrorCaptured((err) => {
  error.value = err;
  return false;
});

function reload() {
  window.location.reload();
}

// Globale JS-Fehler / unhandled Rejections betreffen nicht zwingend den Vue-Baum,
// daher genügt hier ein Toast statt die App auszublenden
window.addEventListener("error", (event) => {
  toast({ title: "JS-Error", description: event.error?.message ?? event.message, variant: "destructive" });
});

window.addEventListener("unhandledrejection", (event) => {
  toast({ title: "Unhandled Rejection", description: String(event.reason), variant: "destructive" });
});

const slotProps = computed(() => {
  if (!error.value) {
    return {};
  }
  return { error: error.value };
});

const slotName = computed(() => (error.value ? "error" : "default"));
</script>
<template>
  <slot :name="slotName" v-bind="slotProps">
    <div class="flex h-screen w-screen items-center justify-center p-4">
      <Card class="max-w-md py-0 gap-0">
        <CardHeader class="px-4 pt-3 pb-0">
          <CardTitle class="text-sm text-destructive">Ein Fehler ist aufgetreten</CardTitle>
        </CardHeader>
        <CardContent class="px-4 pt-2 pb-4 space-y-3">
          <p class="text-xs text-muted-foreground wrap-break-word">{{ error?.message }}</p>
          <pre><code>{{error}}</code></pre>
          <Button size="sm" @click="reload">Seite neu laden</Button>
        </CardContent>
      </Card>
    </div>
  </slot>
</template>
