<script setup lang="ts">
import { ref, watch } from "vue";
import { InputShadcn } from "@/components/ui/input";
import { clamp, parseDecimal } from "@/lib/number.ts";
import { formatAmount } from "@/lib/recipe.ts";

/**
 * Zahlenfeld für Touch: Texteingabe mit Dezimal-Tastatur, Komma und Punkt erlaubt, leer = `null`.
 * Begrenzt auf `min`/`max` erst beim Verlassen, damit das Tippen nicht springt.
 */
const props = withDefaults(
  defineProps<{
    id?: string;
    placeholder?: string;
    min?: number;
    max?: number;
    /** Nur ganze Zahlen (Portionen, Minuten) */
    integer?: boolean;
    invalid?: boolean;
    ariaLabel?: string;
    class?: string;
    e2e?: string;
  }>(),
  { id: undefined, placeholder: "", min: undefined, max: undefined, integer: false, invalid: false, ariaLabel: undefined, class: "", e2e: undefined },
);

const model = defineModel<number | null>({ required: true });

const toText = (value: number | null): string => formatAmount(value);
const text = ref(toText(model.value));

watch(model, (value) => {
  if (parseDecimal(text.value) !== value) {
    text.value = toText(value);
  }
});

const onInput = (value: string | number | undefined) => {
  text.value = String(value ?? "");
  const parsed = parseDecimal(text.value);
  if (parsed !== null || !text.value.trim()) {
    model.value = parsed;
  }
};

const onBlur = () => {
  let value = parseDecimal(text.value);
  if (value !== null) {
    value = clamp(props.integer ? Math.round(value) : value, props.min, props.max);
  }
  model.value = value;
  text.value = toText(value);
};
</script>

<template>
  <div @focusout="onBlur">
    <InputShadcn
      :id
      :model-value="text"
      type="text"
      :inputmode="integer ? 'numeric' : 'decimal'"
      :placeholder
      :invalid
      :aria-label="ariaLabel"
      :e2e
      :class="props.class"
      @update:model-value="onInput"
    />
  </div>
</template>
