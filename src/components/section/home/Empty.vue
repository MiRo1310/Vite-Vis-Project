<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import Holiday from "@/components/section/home/Holiday.vue";
</script>

<template>
  <Card color="primary" styling="small">
    <CardHeader>
      <CardTitle></CardTitle>
    </CardHeader>
    <CardContent class="text-xs">
      <!--      <CardSubcard class="mt-2"> </CardSubcard>-->
      <Holiday />
    </CardContent>
  </Card>
</template>
