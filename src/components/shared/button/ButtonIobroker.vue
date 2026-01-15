<script setup lang="ts">
import Button, { ButtonVariants } from "@/components/shared/button/Button.vue";
import { StoreValue } from "@/store/ioBrokerStore.ts";
import { adminConnection } from "@/lib/connecter-to-iobroker.ts";
import { computed } from "vue";
import { ButtonVariantProps } from "@/components/shared/button/index.ts";

const props = defineProps<
  {
    label?: string;
    state: StoreValue<boolean>;
    ack?: boolean;
    icon?: keyof ButtonVariants["icons"];
  } & ButtonVariantProps
>();

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
  <Button :variant :size :icon @click="handleClick" :action="getAction">
    <span class="text-sm text-muted-foreground">{{ label }} <slot /></span>
  </Button>
</template>
