// `src/components/section/heating/LineChartStep.vue`
<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shared/card";
import { InfluxDBClient } from "@/composables/influxDB.ts";
import { computed } from "vue";
import { range } from "@/lib/time.ts";
import { isDefined } from "@vueuse/core";
import { aggregatePerDay } from "@/composables/charts.ts";
import ChartStepAfter from "@/components/shared/chart/ChartStepAfter.vue";
import LineChartInteractive from "@/components/shared/chart/LineChartInteractive.vue";
import AreaChartInteractive from "@/components/shared/chart/AreaChartInteractive.vue";

const actualRange = range.last7d;

const measurements = ["FörderSpirale", "Heizung Schnecke"];
const intervall = 60;

const client = new InfluxDBClient(measurements, { type: "boolean", intervall, rangeSec: actualRange.rangeSec });
const result = client.get();

const chartData = computed(() => {
  const key = measurements[0];

  return (
    result.value
      .filter((item) => isDefined(item[key]))
      .map((item) => ({
        date: new Date(item.time),
        value: item[key] ? 1 : 0,
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
</script>

<template>
  {{ aggregatePerDay(chartData, "value") }}
  {{ aggregatePerDay(chartDataHeating, "value") }}
  <Card>
    <CardHeader>
      <CardTitle>Laufzeit Zugeber und Spirale</CardTitle>
      <CardDescription>{{ actualRange.title }} / Aktualisierungsintervall {{ intervall }}s</CardDescription>
    </CardHeader>
    <CardContent>
      <AreaChartInteractive />
    </CardContent>
    <CardContent>
      <ChartStepAfter :chart-data="chartData" label="Förderspirale" :synchronize="[chartDataHeating]" />
    </CardContent>

    <CardContent>
      <ChartStepAfter :chart-data="chartDataHeating" label="Heizung Schnecke" :synchronize="[chartData]" />
    </CardContent>
  </Card>
</template>
