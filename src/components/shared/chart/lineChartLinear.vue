<script setup lang="ts">
import { CurveType } from "@unovis/ts";

import { VisAxis, VisLine, VisXYContainer } from "@unovis/vue";
import { ChartConfig, ChartContainer, ChartCrosshair, ChartTooltip, ChartTooltipContent, componentToString } from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shared/card";
import { InfluxDBClient } from "@/composables/influxDB.ts";
import { computed } from "vue";

const client = new InfluxDBClient(["FörderSpirale"], { type: "boolean", intervall: 30, rangeSec: 120000 });
const result = client.get();

const chartData = computed(() => {
  return result.value.map((item) => {
    return {
      date: new Date(item.time),
      heater: item.value ? 1 : 0,
    };
  });
});

type Data = (typeof chartData.value)[number];

const chartConfig = {
  heater: {
    label: "Test",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Line Chart - Linear</CardTitle>
      <CardDescription>January - June 2024</CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer :config="chartConfig" class="h-20">
        <VisXYContainer :data="chartData" :margin="{ left: -24 }" :y-domain="[0, undefined]">
          <VisLine :x="(d: Data) => d.date" :y="(d: Data) => d.desktop" :color="chartConfig.desktop.color" :curve-type="CurveType.Linear" />
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
                return date.toLocaleDateString('de-DE', {
                  month: 'short',
                  year: '2-digit',
                });
              }
            "
            :tick-values="chartData.map((d) => d.date)"
          />
          <VisAxis type="y" :num-ticks="3" :tick-line="false" :domain-line="false" />
          <ChartTooltip />
          <ChartCrosshair :template="componentToString(chartConfig, ChartTooltipContent, { hideLabel: true })" :color="chartConfig.desktop.color" />
        </VisXYContainer>
      </ChartContainer>
    </CardContent>
    <!--    <CardFooter class="flex-col items-start gap-2 text-sm">-->
    <!--      <div class="flex gap-2 font-medium leading-none">Trending up by 5.2% this month <TrendingUp class="h-4 w-4" /></div>-->
    <!--      <div class="leading-none text-muted-foreground">Showing total visitors for the last 6 months</div>-->
    <!--    </CardFooter>-->
  </Card>
</template>
