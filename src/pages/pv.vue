<script setup lang="ts">
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shared/card";
</script>
<template>
  <Card class="ml-0 h-full" styling="blue">
    <CardHeader>
      <CardTitle> Strom</CardTitle>
    </CardHeader>
    <CardContent class="flex flex-wrap">
      <iframe
        src="http://192.168.1.4:3000/d-solo/Biuksv-4k/strom?orgId=1&panelId=2"
        width="750"
        height="300"
      />
      <iframe
        class="min-w-1/2"
        src="http://192.168.1.4:3000/d-solo/Biuksv-4k/strom?orgId=1&refresh=5s&panelId=13"
        width="750"
        height="300"
      />
    </CardContent>
  </Card>
</template>
