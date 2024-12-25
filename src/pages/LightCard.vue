<script setup lang="ts">
import { ref } from "vue";
import { Card } from "@/components/shared/card";
import Svg from "@/components/shared/Svg.vue";

const light = ref(true);

</script>
<template>
  <Card styling="default" class="rounded-none p-0 w-60" @click="light = !light">
    <div class="flex">
      <div class="w-1/2 flex justify-center py-2">
        <Svg :name="light?'lightOn':'lightOff'" :class="['light__svg', light?'light__on':'']" />
      </div>
      <div class="w-1/2 border-l-2 border-backgroundCards text-backgroundCards p-2 my-2">
        Wohnzimmer
      </div>
    </div>
    <div>
      <p
        :class="{'text-center rounded-sm mx-2 mb-2 text-xs':true, 'bg-yellow-400 text-backgroundCards':light, 'bg-backgroundCards':!light}"
      >
        {{ light ? "- eingeschaltet -" : "- ausgeschaltet -" }}
      </p>
    </div>
  </Card>
</template>

<style scoped lang="postcss">
.light__svg {
  @apply w-16 h-16
}

</style>