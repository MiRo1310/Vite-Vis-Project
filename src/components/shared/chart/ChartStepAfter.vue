<script setup lang="ts">
import { xDomainSynchronized } from "@/composables/charts.ts";
import { CurveType } from "@unovis/ts";
import { ChartConfig, ChartContainer, ChartCrosshair, ChartTooltip, componentToString } from "@/components/ui/chart";
import ChartTooltipContent from "@/components/shared/chart/ChartTooltipContent.vue";
import { VisAxis, VisLine, VisXYContainer } from "@unovis/vue";
import { Ref } from "vue";

interface ChartDataPoint {
  date: Date;
  value: number;
}

const props = defineProps<{ label: string; chartData: ChartDataPoint[]; synchronize: ChartDataPoint[][] }>();

const chartConfig = {
  value: {
    label: props.label,
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

type Data = ChartDataPoint;
</script>

<template>
  <ChartContainer :config="chartConfig" class="h-40">
    <VisXYContainer :data="chartData" :margin="{ left: -24 }" :y-domain="[0, 1]" :x-domain="xDomainSynchronized([chartData, ...props.synchronize])">
      <VisLine :x="(d: Data) => d.date" :y="(d: Data) => d.value" :color="chartConfig.value.color" :curve-type="CurveType.StepAfter" />
      <VisAxis
        type="x"
        :x="(d: Data) => d.date"
        :tick-line="false"
        :domain-line="false"
        :grid-line="false"
        :num-ticks="6"
        :tick-format="
          (d: number) => {
            const date = new Date(d);
            return date.toLocaleTimeString('de-DE', { hour: 'numeric', minute: 'numeric' });
          }
        "
      />
      <VisAxis type="y" :num-ticks="3" :tick-line="false" :domain-line="false" />
      <ChartTooltip />
      <ChartCrosshair :template="componentToString(chartConfig, ChartTooltipContent, { hideLabel: true })" :color="chartConfig.value.color" />
    </VisXYContainer>
  </ChartContainer>
</template>
