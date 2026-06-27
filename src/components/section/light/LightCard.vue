<script setup lang="ts">
import ToggleCard from "@/components/shared/card/ToggleCard.vue";
import { computed } from "vue";
import { ioBrokerService } from "@/lib/io-broker-service.ts";
import { type IValueOf } from "@/store/valueClasses.ts";

const props = defineProps<{
  light: IValueOf<boolean>;
  name: string;
  valueAdditive?: boolean;
}>();

const isActive = computed(() => props.valueAdditive || props.light.value);

async function handleClickLight() {
  const id = props.light.id;
  if (!id) {
    return;
  }
  await ioBrokerService.connection?.setState(id, props.valueAdditive || !isActive.value);
}
</script>

<template>
  <ToggleCard color="yellow" :title="name.replace(/_/g, ' ')" :active="!!isActive" @click="handleClickLight" />
</template>
