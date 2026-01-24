<script setup lang="ts">
import { CurveType } from "@unovis/ts";
import { VisAxis, VisLine, VisXYContainer } from "@unovis/vue";
import { TrendingUp } from "lucide-vue-next";
import { ChartConfig, ChartContainer, ChartTooltipContent, componentToString, ChartTooltip, ChartCrosshair } from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/shared/card";
import { InfluxDBClient } from "@/composables/influxDB.ts";
import { computed } from "vue";
import { range } from "@/lib/time.ts";
import { isDefined } from "@vueuse/core";

const actualRange = range.last1h;

const measurements = ["FörderSpirale", "Heizung Schnecke"];
const intervall = 30;

const client = new InfluxDBClient(measurements, { type: "boolean", intervall, rangeSec: actualRange.rangeSec });
const result = client.get();

const chartData = computed(() => {
  const key = measurements.mrNth(1) as string;
  return result.value
    .filter((item) => isDefined(item[key]))
    .map((item) => {
      return {
        date: new Date(item.time),
        desktop: item[key] ? 1 : 0,
      };
    });
});

const chartDataSpirale = computed(() => {
  const key = measurements.mrFirst() as string;
  return result.value
    .filter((item) => isDefined(item[key]))
    .map((item) => {
      return {
        date: new Date(item.time),
        value: item[key] ? 1 : 0,
      };
    });
});

type Data = (typeof chartData.value)[number];
type Data2 = (typeof chartDataSpirale.value)[number];

const chartConfig = {
  desktop: {
    label: "Förderspirale",
    color: "var(--chart-1)",
  },
  value: {
    label: "Heizung Schnecke",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Laufzeit Zugeber und Spirale</CardTitle>
      <CardDescription>{{ actualRange.title }} / Aktualisierungsintervall {{ intervall }}s</CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer :config="chartConfig" class="h-40">
        <VisXYContainer :data="chartData" :margin="{ left: -24 }" :y-domain="[0, undefined]">
          <VisLine :x="(d: Data) => d.date" :y="(d: Data) => d.desktop" :color="chartConfig.desktop.color" :curve-type="CurveType.Step" />
          <VisAxis
            type="x"
            :x="(d: Data) => d.date"
            :tick-line="false"
            :domain-line="false"
            :grid-line="false"
            :num-ticks="6"
            :tick-format="
              (d: number) => {
                console.log(d);
                const date = new Date(d);
                return date.toLocaleDateString('de-DE', { hour: 'numeric', minute: 'numeric' });
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

    <CardContent>
      <ChartContainer :config="chartConfig" class="h-40">
        <VisXYContainer :data="chartDataSpirale" :margin="{ left: -24 }" :y-domain="[0, undefined]">
          <VisLine :x="(d: Data2) => d.date" :y="(d: Data2) => d.value" :color="chartConfig.value.color" :curve-type="CurveType.Step" />
          <VisAxis
            type="x"
            :x="(d: Data2) => d.date"
            :tick-line="false"
            :domain-line="false"
            :grid-line="false"
            :num-ticks="6"
            :tick-format="
              (d: number) => {
                const date = new Date(d);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                });
              }
            "
            :tick-values="chartData.map((d) => d.date)"
          />
          <VisAxis type="y" :num-ticks="3" :tick-line="false" :domain-line="false" />
          <ChartTooltip />
          <ChartCrosshair :template="componentToString(chartConfig, ChartTooltipContent, { hideLabel: true })" :color="chartConfig.value.color" />
        </VisXYContainer>
      </ChartContainer>
    </CardContent>
    <CardFooter class="flex-col items-start gap-2 text-sm">
      <div class="flex gap-2 font-medium leading-none">Trending up by 5.2% this month <TrendingUp class="h-4 w-4" /></div>
      <div class="leading-none text-muted-foreground">Showing total visitors for the last 6 months</div>
    </CardFooter>
  </Card>
</template>
