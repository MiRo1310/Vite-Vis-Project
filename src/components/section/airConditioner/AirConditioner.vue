<script setup lang="ts">
import OnlineOffline from "@/components/shared/OnlineOffline.vue";
import { StoreValue } from "@/store/iobrokerStore.ts";
import InputIobroker from "@/components/shared/input/InputIobroker.vue";
import ButtonIobroker from "@/components/shared/button/ButtonIobroker.vue";

defineProps<{
  online: boolean;
  powerWh: number;
  title: string;
  tempSet: StoreValue<number>;
  tempIs: number;
  power: StoreValue<boolean>;
}>();
</script>

<template>
  <div class="air-conditioner">
    <p class="air-conditioner__description">
      <span>{{ title }}</span>

      <OnlineOffline :status="online" />
    </p>
    <div class="air-conditioner__content">
      <div class="air-conditioner__row">
        <p>{{ online ? powerWh : "0.00" }} W</p>
        <p>Ist: {{ tempIs }} °C</p>
      </div>
      <div class="air-conditioner__row">
        <ButtonIobroker variant="outline" size="icon" :state="power" icon="power" />
        <InputIobroker :state="tempSet" unit="°C" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.air-conditioner {
  @apply border border-accent;

  &__description {
    @apply text-xs text-muted-foreground min-w-40 bg-cardCustom-info p-1 flex justify-between items-center;
  }

  &__row {
    @apply flex justify-between items-center w-full;
  }

  &__content {
    @apply p-1 text-xs text-muted-foreground bg-cardCustom-info flex flex-col items-end w-full;
  }
}
</style>
