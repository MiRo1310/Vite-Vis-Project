<script setup lang="ts">
import { isDefined } from "@vueuse/core";
import { ArrowLeft, ArrowRight } from "lucide-vue-next";
import { cn } from "@/lib/utils.ts";
import { ref, watch } from "vue";
import { useElementBounding } from "@vueuse/core";
import { IEnergyFlow, IEnergyFlowUpdatePosition } from "@/components/shared/energy-flow/index.ts";

const props = defineProps<{ energyFlow: IEnergyFlow }>();

const element = ref<HTMLElement | null>(null);
const react = useElementBounding(element);
const emits = defineEmits(["update:position"]);

const args: IEnergyFlowUpdatePosition = { elementBounding: react, id: props.energyFlow.id };

watch(react, () => emits("update:position", args), { immediate: true });
</script>

<template>
  <div class="h-48 w-full flex-col items-center justify-center">
    <p class="text-center mb-1 text-muted-foreground">{{ energyFlow.title }}</p>
    <div ref="element" class="border-2 border-blue-100 rounded-full mx-auto size-24 flex items-center justify-center">
      <div>
        <p v-if="isDefined(energyFlow.out)" :class="cn('flex items-center justify-center text-sm min-w-16', energyFlow.out.class)">
          <ArrowLeft class="size-3" />{{ energyFlow.out?.value }} {{ energyFlow.out?.unit }}
        </p>
        <p v-if="isDefined(energyFlow.in)" :class="cn('flex items-center justify-center text-sm min-w-16', energyFlow.in.class)">
          <ArrowRight class="size-3" />{{ energyFlow.in.value }} {{ energyFlow.in.unit }}
        </p>
      </div>
    </div>
  </div>
</template>
