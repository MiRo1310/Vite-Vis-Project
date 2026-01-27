// `src/components/section/heating/LineChartStep.vue`
<script setup lang="ts">
import { CurveType } from "@unovis/ts";
import { VisAxis, VisLine, VisXYContainer } from "@unovis/vue";
import { ChartConfig, ChartContainer, ChartCrosshair, ChartTooltip, ChartTooltipContent, componentToString } from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shared/card";
import { InfluxDBClient } from "@/composables/influxDB.ts";
import { computed } from "vue";
import { range } from "@/lib/time.ts";
import { isDefined } from "@vueuse/core";
import { xDomainSynchronized } from "@/composables/charts.ts";

const actualRange = range.last7d;

const measurements = ["FörderSpirale", "Heizung Schnecke"];
const intervall = 30;

const client = new InfluxDBClient(measurements, { type: "boolean", intervall, rangeSec: actualRange.rangeSec });
const result = client.get();

const chartData = computed(() => {
  const key = measurements[0];

  return (
    result.value
      .filter((item) => isDefined(item[key]))
      .map((item) => ({
        date: new Date(item.time),
        desktop: item[key] ? 1 : 0,
      })) ?? []
  );
});

const chartDataHeating = computed(() => {
  const key = measurements[1];

  return (
    result.value
      .filter((item) => isDefined(item[key]))
      .map((item) => ({
        date: new Date(item.time),
        value: item[key] ? 1 : 0,
      })) ?? []
  );
});

type Data = (typeof chartData.value)[number];
type Data2 = (typeof chartDataHeating.value)[number];

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
        <VisXYContainer :data="chartData" :margin="{ left: -24 }" :y-domain="[0, 1]" :x-domain="xDomainSynchronized([chartData, chartDataHeating])">
          <VisLine :x="(d: Data) => d.date" :y="(d: Data) => d.desktop" :color="chartConfig.desktop.color" :curve-type="CurveType.StepAfter" />
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
          <ChartCrosshair :template="componentToString(chartConfig, ChartTooltipContent, { hideLabel: true })" :color="chartConfig.desktop.color" />
        </VisXYContainer>
      </ChartContainer>
    </CardContent>

    <CardContent>
      <ChartContainer :config="chartConfig" class="h-40">
        <VisXYContainer :data="chartDataHeating" :margin="{ left: -24 }" :y-domain="[0, 1]" :x-domain="xDomainSynchronized">
          <VisLine :x="(d: Data2) => d.date" :y="(d: Data2) => d.value" :color="chartConfig.value.color" :curve-type="CurveType.StepAfter" />
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
                return date.toLocaleTimeString('de-DE', { hour: 'numeric', minute: 'numeric' });
              }
            "
          />
          <VisAxis type="y" :num-ticks="3" :tick-line="false" :domain-line="false" />
          <ChartTooltip />
          <ChartCrosshair :template="componentToString(chartConfig, ChartTooltipContent, { hideLabel: true })" :color="chartConfig.value.color" />
        </VisXYContainer>
      </ChartContainer>
    </CardContent>
  </Card>
</template>
