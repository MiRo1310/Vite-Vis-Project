<script setup lang="ts">
import ToggleCard from "@/components/shared/card/ToggleCard.vue";
import { StoreValue } from "@/store";
import { computed } from "vue";
import { adminConnection } from "@/lib/iobroker-service.js";

const props = defineProps<{
  light: StoreValue<boolean>;
  name: string;
  valueAdditive?: boolean | undefined;
}>();

const isActive = computed(() => (props.valueAdditive !== undefined ? props.valueAdditive : props.light?.val));

function handleClickLight() {
  const id = props.light?.id;
  if (!id) {
    return;
  }
  adminConnection?.setState(id, props.valueAdditive !== undefined ? true : !isActive.value);
}
</script>

<template>
  <ToggleCard color="yellow" :title="name.replace(/_/g, ' ')" :active="!!isActive" @click="handleClickLight" />
</template>
