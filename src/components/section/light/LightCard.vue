<script setup lang="ts">
import ToggleCard from "@/components/shared/card/ToggleCard.vue";
import { computed } from "vue";
import { ioBrokerService } from "@/lib/io-broker-service.ts";
import { IValueOf } from "@/store/valueClasses.ts";

const props = defineProps<{
  light: IValueOf<boolean>;
  name: string;
  valueAdditive?: boolean | undefined;
}>();

const isActive = computed(() => (props.valueAdditive !== undefined ? props.valueAdditive : props.light?.val));

function handleClickLight() {
  const id = props.light?.id;
  if (!id) {
    return;
  }
  ioBrokerService.connection?.setState(id, props.valueAdditive !== undefined ? true : !isActive.value);
}
</script>

<template>
  <ToggleCard color="yellow" :title="name.replace(/_/g, ' ')" :active="!!isActive" @click="handleClickLight" />
</template>
