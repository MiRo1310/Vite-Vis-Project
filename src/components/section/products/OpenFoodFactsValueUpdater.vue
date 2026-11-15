<script setup lang="ts">
import { computed, watch } from "vue";
import { ArrowDownToLine } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import { type TForm } from "@/components/section/products/index.ts";

const props = defineProps<{ name: string; label: string; value?: string | number | boolean | null; unit?: string; form: TForm }>();

const addAll = defineModel<boolean>("addAll", { default: false });

const setValue = () => {
  if (props.value) {
    props.form.setFieldValue(props.name, props.value);
  }
};

watch(addAll, (newValue) => {
  if (newValue) {
    setValue();
    addAll.value = false;
  }
});

const disabled = computed(() => {
  return !props.value || props.value === "" || props.value === props.form.values[props.name];
});
</script>

<template>
  <div class="flex flex-col gap-2">
    <!-- Überschrift gilt für Eingabe + Übernehmen-Button gemeinsam, damit alle Eingaben gleich breit sind -->
    <div class="flex items-baseline justify-between gap-2 min-h-5">
      <span class="text-sm font-medium leading-none">{{ label }}</span>
      <span v-if="value" class="text-xs text-recipe-teal-fg whitespace-nowrap truncate" title="Wert von OpenFoodFacts">{{ value }} {{ unit }}</span>
    </div>
    <div class="flex items-start gap-1.5">
      <div class="flex-1 min-w-0">
        <slot />
      </div>
      <Button
        type="button"
        variant="outline"
        size="icon"
        class="shrink-0"
        :disabled
        :title="value ? `${value} ${unit ?? ''} übernehmen` : 'Kein Wert von OpenFoodFacts'"
        aria-label="Wert übernehmen"
        @click.prevent="setValue"
      >
        <ArrowDownToLine class="h-4 w-4" />
      </Button>
    </div>
  </div>
</template>
