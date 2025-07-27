<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import ButtonIobroker from "@/components/shared/button/ButtonIobroker.vue";
import { useDynamicSubscribe } from "@/composables/dynamicSubscribe.ts";
import { heatingControl } from "@/subscribeIds/heating.ts";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import HeatingControl from "@/components/section/heating/HeatingControl.vue";
import { ThermometerSun } from "lucide-vue-next";

useDynamicSubscribe(heatingControl);

const { heatingControl: control } = useIobrokerStore();
</script>

<template>
  <Card styling="light" class="settings">
    <CardHeader>
      <CardTitle>Einstellungen</CardTitle>
    </CardHeader>
    <CardContent class="settings__content">
      <HeatingControl :size="'square'" text="multiline">
        <ThermometerSun />
      </HeatingControl>

      <ButtonIobroker :state="control.periodActive" variant="outline"> Thermostate aktivieren</ButtonIobroker>
    </CardContent>
  </Card>
</template>

<style scoped lang="scss">
.settings {
  &__content {
    @apply flex gap-2 flex-wrap;
  }
}
</style>
