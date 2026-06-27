<script setup lang="ts">
import { type HTMLAttributes } from "vue";
import CardSubcard from "@/components/shared/card/CardSubcard.vue";
import ValueWithUnit from "@/components/shared/ValueWithUnit.vue";
import { type RoutePath } from "@/router/routes.ts";
import type Listing from "@/pages/finance/listing.vue";

export interface InfoTypes {
  route?: RoutePath;
  listing: Listing[];
}

interface Listing {
  title?: string;
  value: number | string | undefined;
  unit?: string;
  valueClass?: HTMLAttributes["class"];
  class?: HTMLAttributes["class"];
}

defineProps<{ class?: HTMLAttributes["class"]; infos: InfoTypes }>();
</script>
<template>
  <CardSubcard :class="$props.class">
    <RouterLink v-if="infos.route" :to="infos.route">
      <div v-for="(info, index) in infos.listing" :key="index" :class="['flex justify-between items-center text-xs', info.class]">
        <p>{{ info.title }}</p>
        <ValueWithUnit :value="info.value" :unit="info.unit" :class="info.valueClass" />
      </div>
    </RouterLink>
    <template v-else>
      <div v-for="(info, index) in infos.listing" :key="index" :class="['flex justify-between items-center text-xs', info.class]">
        <p>{{ info.title }}</p>
        <ValueWithUnit :value="info.value" :unit="info.unit" :class="info.valueClass" />
      </div>
    </template>
  </CardSubcard>
</template>
