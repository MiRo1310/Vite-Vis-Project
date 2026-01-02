<script setup lang="ts">
import Badge from "@/components/shared/badge/Badge.vue";
import { ParsedLogs } from "@/store/iobrokerStore.ts";
import { Infos } from "@/subscribeIds/info.ts";
import { useRouter } from "vue-router";
import CardSubcard from "@/components/shared/card/CardSubcard.vue";

defineProps<{ info: Infos; getParsedLogs: ParsedLogs }>();

const router = useRouter();
</script>
<template>
  <CardSubcard>
    <div class="flex justify-between items-center cursor-pointer" @click="router.push({ path: '/iobroker-info' })">
      <p>Updates</p>
      <p>
        <Badge :value="info.updatesNumber?.val" />
      </p>
    </div>
    <div class="flex justify-between items-center cursor-pointer" @click="router.push({ path: '/logs' })">
      <p>Logs</p>
      <div class="flex gap-1">
        <Badge v-if="getParsedLogs.info?.length" :value="getParsedLogs.info?.length" color="blue" />
        <Badge v-if="getParsedLogs.warn?.length" :value="getParsedLogs.warn?.length" color="orange" />
        <Badge v-if="getParsedLogs.error?.length" :value="getParsedLogs.error?.length" color="red" />
      </div>
    </div>
  </CardSubcard>
</template>
