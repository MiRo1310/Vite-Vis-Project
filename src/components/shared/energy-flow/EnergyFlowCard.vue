<script setup lang="ts">
import { isDefined } from "@vueuse/core";
import { ArrowLeft, ArrowRight } from "lucide-vue-next";
import { cn } from "@/lib/utils.ts";
import { ref, watch } from "vue";
import { useElementBounding } from "@vueuse/core";
import { IEnergyFlow } from "@/components/shared/energy-flow/index.ts";
import { PositionHandler, Positions } from "@/components/shared/energy-flow/utils.ts";
import EnergyFlowLine from "@/components/shared/energy-flow/EnergyFlowLine.vue";

const props = defineProps<{ energyFlow: IEnergyFlow; positions: Positions; indexForId: number }>();

const element = ref<HTMLElement | null>(null);
const react = useElementBounding(element, { immediate: true, windowResize: true, windowScroll: true });

const card = new PositionHandler(props.energyFlow.id, { padding: props.energyFlow.padding });

watch(
  () => [react.top.value, react.left.value, react.width.value, react.height.value],
  () => {
    card.updatePosition(react);
    props.positions.updateCard(card);
  },
  { immediate: true },
);
</script>

<template>
  <div class="h-48 w-full flex-col items-center justify-center">
    <p class="text-center mb-1 text-muted-foreground h-6">{{ energyFlow.title }}</p>
    <div v-if="energyFlow.id" ref="element" class="border-2 border-blue-100 rounded-full mx-auto size-24 flex items-center justify-center">
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
  <template v-for="(line, index) in energyFlow.lines" :key="index">
    <EnergyFlowLine
      :id="String(indexForId)"
      animation
      :reverse="energyFlow.out?.reverse"
      :points="line.getCoordinates(positions)"
      :dots-per-group="3"
      particle-shape="circle"
      :line-height="5"
      :line-width="10"
      :group-count="2"
      :dot-spacing="0.05"
      :stroke-width="10"
      :duration="5"
      :dot-radius="4"
      flow-color="#00ff99"
    />
  </template>
</template>
