<script setup lang="ts">
import { ChartConfig, ChartContainer, ChartCrosshair, ChartTooltip, ChartTooltipContent, componentToString } from "@/components/ui/chart";

import { VisAxis, VisLine, VisXYContainer } from "@unovis/vue";
import { defaultLocale } from "@/config/config.ts";

export interface Data {
  date: Date;
  value1: number;
  value2: number;
}

defineProps<{ chartData: Data[] }>();

const chartConfig = {
  value1: {
    label: "Förderspirale",
    color: "var(--chart-1)",
  },
  value2: {
    label: "Heizung",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const activeChart = defineModel<string>("activeChart", { default: "value2" });
</script>

<template>
  <ChartContainer :config="chartConfig" class="aspect-auto h-40 w-full" cursor>
    <VisXYContainer :data="chartData" :margin="{ left: -24 }" :y-domain="[0, undefined]">
      <VisLine
        :x="(d: Data) => d.date"
        :y="(d: Data) => d[activeChart as keyof typeof d]"
        :color="chartConfig[activeChart as keyof typeof chartConfig].color"
      />
      <VisAxis
        type="x"
        :x="(d: Data) => d.date"
        :tick-line="false"
        :domain-line="false"
        :grid-line="false"
        :tick-format="
          (d: number) => {
            const date = new Date(d);
            return date.toLocaleDateString(defaultLocale, {
              month: 'short',
              day: 'numeric',
            });
          }
        "
      />
      <VisAxis type="y" :num-ticks="3" :tick-line="false" :domain-line="false" />
      <ChartTooltip />
      <ChartCrosshair
        :template="
          componentToString(chartConfig, ChartTooltipContent, {
            labelFormatter(d: number | Date) {
              return new Date(d).toLocaleDateString(defaultLocale, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              });
            },
          })
        "
        :color="chartConfig[activeChart as keyof typeof chartConfig].color"
      />
    </VisXYContainer>
  </ChartContainer>
</template>
