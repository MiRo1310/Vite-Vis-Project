<script setup lang="ts">
import Button, { ButtonIcons, ButtonVariants } from "@/components/shared/button/Button.vue";
import { StoreValue } from "@/store/iobrokerStore.ts";
import { adminConnection } from "@/lib/connecter-to-iobroker.ts";
import { computed } from "vue";

const props = defineProps<{
  label?: string;
  state: StoreValue<boolean>;
  ack?: boolean;
  icon?: keyof ButtonIcons;
}>();

const handleClick = () => {
  const id = props.state?.id;
  if (!id) {
    return;
  }
  const newValue = !props.state?.val;

  adminConnection?.setState(id, newValue, props.ack);
};

const getAction = computed<keyof ButtonVariants["action"]>(() => {
  if (props.state?.ack === false) {
    return "ackFalse";
  }
  return props.state?.val ? "on" : "off";
});
</script>

<template>
  <Button variant="outline" size="icon" :icon @click="handleClick" :action="getAction">{{ label }}</Button>
</template>
