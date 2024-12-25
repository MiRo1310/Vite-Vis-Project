<script setup lang="ts">
import { Card, CardHeader, CardTitle } from "@/components/shared/card";
import { ref } from "vue";
import lightOn from "@/public/light_on.svg";

const light = ref(true);
</script>

<template>
  <Card styling="blue">
    <CardHeader>
      <CardTitle>Licht</CardTitle>
    </CardHeader>
    <div class="m-2 flex">
      <Card styling="default" class="rounded-none p-0 w-60" @click="light = !light">
        <div class="flex">
          <div class="w-1/2 flex justify-center py-2">
            <img :src="lightOn" class="color-overlay" alt="Test">
          </div>
          <div class="w-1/2 border-l-2 border-backgroundCards text-backgroundCards p-2 my-2">
            Wohnzimmer
          </div>
        </div>
        <div>
          <p class="text-center bg-amber-400 rounded-sm mx-2 mb-2 text-xs text-backgroundCards">
            - eingeschaltet -
          </p>
        </div>
      </Card>
    </div>
  </Card>
</template>

<style scoped lang="postcss">
.light {
  @apply w-20
}

.color-overlay {
  width: 50px; /* Adjust the size as needed */
  height: 50px; /* Adjust the size as needed */
  color: yellow; /* Set the desired color */

}

svg {
  color: green;
}
</style>
