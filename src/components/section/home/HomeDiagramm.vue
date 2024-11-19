<script setup lang="ts">
import { Card } from "@/components/shared/card";

const width = "110";
const height = "70";
</script>

<template>
  <Card styling="blue" class="flex-row p-1 bg-backgroundCards max-w-[14.3rem]">
    <div class="flex flex-wrap ">
      <iframe
        src="http://192.168.1.4:3000/d-solo/Biuksv-4k/strom?orgId=1&refresh=5s&panelId=14" :width
        :height frameborder="0"
      />
      <iframe
        src="http://192.168.1.4:3000/d-solo/de48h6zf94jcwe/pv-fuer-vis?orgId=1&refresh=10s&theme=dark&panelId=4"
        :width :height frameborder="0"
      />
      <iframe
        src="http://192.168.1.4:3000/d-solo/de48h6zf94jcwe/pv-fuer-vis?orgId=1&refresh=5s&theme=dark&panelId=3"
        :width :height frameborder="0"
      />
    </div>
  </Card>
</template>
