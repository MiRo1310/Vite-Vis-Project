<script setup lang="ts">
import OnlineOffline from "@/components/shared/OnlineOffline.vue";
import InputWithUnit from "@/components/shared/InputWithUnit.vue";
import { StoreValue } from "@/store/iobrokerStore.ts";
import { adminConnection } from "@/lib/connecter-to-iobroker.ts";

const props = defineProps<{
  online: boolean;
  powerWh: number;
  title: string;
  tempSet: StoreValue<number>;
  tempIs: number;
}>();

const setState = (val?: string | number) => {
  const id = props.tempSet?.id;
  if (!val || !id) {
    return;
  }
  adminConnection?.setState(id, val, false);
};
</script>

<template>
  <div class="air-conditioner">
    <p class="air-conditioner__description">
      <span>{{ title }}</span>

      <OnlineOffline :status="online" />
    </p>
    <div class="air-conditioner__content">
      <div class="flex justify-between items-center w-full">
        <p>{{ online ? powerWh : "0.00" }} Wh</p>
        <p>Ist: {{ tempIs }} °C</p>
      </div>
      <div class="line w-24 text-right">
        <InputWithUnit
          class="w-16 text-accent-foreground/50 text-xs font-bold border-0 shadow-none rounded-none bg-white"
          type="number"
          :model-value="tempSet?.val?.toString()"
          unit="°C"
          :ack="tempSet?.ack"
          @update:model-value="setState"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.air-conditioner {
  @apply border border-accent;

  &__description {
    @apply text-xs text-muted-foreground min-w-40 bg-white p-1 flex justify-between items-center;
  }

  &__content {
    @apply p-1 text-xs text-muted-foreground bg-white flex flex-col items-end w-full;
  }
}
</style>
