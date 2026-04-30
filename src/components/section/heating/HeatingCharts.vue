<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shared/card";
import { InfluxDBClient } from "@/composables/influxDB.ts";
import { computed, ref } from "vue";
import { isDefined } from "@vueuse/core";
import { AggregatedPerDay, aggregatePerDay } from "@/composables/charts.ts";
import ChartStepAfter from "@/components/shared/chart/ChartStepAfter.vue";
import { localDateStringToDate } from "@/lib/date.ts";
import HeatingLineChart from "@/components/section/heating/HeatingLineChart.vue";
import { range } from "@/constants/constants.ts";

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
        key,
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
        key,
      })) ?? []
  );
});

const combineValues = computed(() => (list: AggregatedPerDay[][]) => {
  const combined: { date: Date; value1: number; value2: number }[] = [];
  list.forEach((item, index) => {
    item.forEach((agg) => {
      const date = localDateStringToDate(agg.localeDateString);
      if (index === 0 && date instanceof Date) {
        combined.push({ date, value1: agg.count, value2: 0 });
      } else {
        const existing = combined.find((c) => c.date.toLocaleString() === date.toLocaleString());
        if (existing) {
          existing.value2 = agg.count;
        }
      }
    });
  });
  return combined;
});
const activeChart = ref("value2");
const chartConfig = {
  value1: "Förderspirale",
  value2: "Heizung",
};
</script>

<template>
  <Card>
    <CardHeader class="flex flex-col items-stretch border-y p-0! px-6 -mx-6 sm:flex-row">
      <div class="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
        <CardTitle>Laufzeit Zugeber und Spirale</CardTitle>
        <CardDescription>{{ actualRange.title }} / Aktualisierungsintervall {{ intervall }}s</CardDescription>
      </div>
      <div class="flex">
        <button
          v-for="chart in ['value1', 'value2']"
          :key="chart"
          :data-active="activeChart === chart"
          class="data-[active=true]:bg-muted/50 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
          @click="activeChart = chart"
        >
          <span class="text-muted-foreground text-xs">
            {{ chartConfig[chart as keyof typeof chartConfig] }}
          </span>
        </button>
      </div>
    </CardHeader>
    <CardContent>
      <HeatingLineChart
        :chart-data="combineValues([aggregatePerDay(chartData, 'value'), aggregatePerDay(chartDataHeating, 'value')])"
        v-model:active-chart="activeChart"
      />
    </CardContent>
    <CardContent v-if="activeChart === 'value2'">
      <ChartStepAfter :chart-data="chartDataHeating" label="Heizung Schnecke" :synchronize="[chartData]" />
    </CardContent>
    <CardContent v-else>
      <ChartStepAfter :chart-data="chartData" label="Förderspirale" :synchronize="[chartDataHeating]" />
    </CardContent>
  </Card>
</template>
