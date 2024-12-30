<script setup lang="ts">

import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { useDynamicSubscribe } from "@/composables/dynamicSubscribe.ts";
import { presenceStates } from "@/subscribeIds/presence.ts";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import BoolIcon from "@/components/shared/table-cell/BoolIcon.vue";

useDynamicSubscribe([presenceStates]);

const { presence } = useIobrokerStore();
</script>

<template>
  <Card styling="light" :class="$props.class">
    <CardHeader>
      <CardTitle>
        Anwesenheit
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p class="flex-between">
        Michael
        <BoolIcon :value="presence?.Iphone_Michael?.val||false" />
      </p>
    </CardContent>
  </Card>
</template>

<style scoped lang="postcss">

</style>