<script setup lang="ts">
import { Card } from "@/components/shared/card";
import Svg from "@/components/shared/image/Svg.vue";
import { StoreValue } from "@/store/iobrokerStore.ts";
import { computed, HTMLAttributes } from "vue";
import { adminConnection } from "@/lib/connecter-to-iobroker.ts";

const props = defineProps<{
  light: StoreValue<boolean>,
  name: string,
  class?: HTMLAttributes["class"],
  valueAdditive?: boolean | undefined
}>();

const isActive = computed(() => props.valueAdditive !== undefined ? props.valueAdditive : props.light?.val);

function handleClickLight() {
  const id = props.light?.id;
  if (!id) return;
  adminConnection?.setState(id, props.valueAdditive !== undefined ? true : !isActive.value);
}

</script>

<template>
  <Card
    styling="default" :class="['rounded-none p-0 w-60 flex-1 min-w-[16rem]', props.class]"
    @click="handleClickLight"
  >
    <div class="flex">
      <div class="w-1/2 flex justify-center py-2">
        <Svg :name="isActive?'lightOn':'lightOff'" :class="['light__svg', isActive?'light__on':'']" />
      </div>
      <div class="w-1/2 border-l-2 border-color__default text-color__default p-2 my-2 text-sm min-h-[55px]">
        {{ name.replace(/_/g, " ") }}
      </div>
    </div>
    <div>
      <p
        :class="{'text-center rounded-sm mx-2 mb-2 text-xs ':true, 'bg-yellow-400 text-color__default':isActive, 'bg-color__default':!isActive}"
      >
        {{ isActive ? "- eingeschaltet -" : "- ausgeschaltet -" }}
      </p>
    </div>
  </Card>
</template>

<style scoped lang="postcss">
.light__svg {
  @apply w-12 h-12
}

.light__on {
  @apply animate-pulse text-yellow-400
}
</style>