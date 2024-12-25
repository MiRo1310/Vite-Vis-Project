<script setup lang="ts">
import { Card } from "@/components/shared/card";

const width = "110";
const height = "100";

const diagramms = [
  { id: "2", refresh: "5" },
  { id: "4", refresh: "5" },
  { id: "3", refresh: "5" },
  { id: "5", refresh: "5" },
  { id: "6", refresh: "5" }
];
</script>

<template>
  <keep-alive>
    <Card styling="blue" class="flex-row p-1 bg-color__default max-w-[14.3rem]">
      <div class="flex flex-wrap ">
        <iframe
          v-for="(diagramm, index) in diagramms" :key="index"
          :src="`http://192.168.1.4:3000/d-solo/de48h6zf94jcwe/pv-fuer-vis?orgId=1&refresh=${diagramm.refresh}s&panelId=${diagramm.id}`"
          :width="width"
          :height="height"
        />
      </div>
    </Card>
  </keep-alive>
</template>
