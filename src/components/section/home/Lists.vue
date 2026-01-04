<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { useDynamicSubscribe } from "@/composables/dynamicSubscribe.ts";
import { infoStates } from "@/subscribeIds/info.ts";
import { useRouter } from "vue-router";
import CardSubcard from "@/components/shared/card/CardSubcard.vue";

const router = useRouter();

useDynamicSubscribe(infoStates);

const ioBrokerStore = useIobrokerStore();
</script>
<template>
  <Card color="primary" styling="small">
    <CardHeader>
      <CardTitle>Listen</CardTitle>
    </CardHeader>
    <CardContent class="text-xs">
      <CardSubcard class="mt-2"> </CardSubcard>
    </CardContent>
  </Card>
</template>
