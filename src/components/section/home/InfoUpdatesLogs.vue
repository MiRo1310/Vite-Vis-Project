<script setup lang="ts">
import Badge from "@/components/shared/badge/Badge.vue";
import Badges from "@/components/section/home/Badges.vue";
import { ParsedLogs } from "@/store/iobrokerStore.ts";
import { Infos } from "@/subscribeIds/info.ts";
import { useRouter } from "vue-router";

defineProps<{ info: Infos; getParsedLogs: ParsedLogs }>();

const router = useRouter();
</script>
<template>
  <div class="card__shadow">
    <div class="info__row" @click="router.push({ path: '/iobroker-info' })">
      <p>Updates</p>
      <p>
        <Badge :value="info.updatesNumber?.val" />
      </p>
    </div>
    <div class="info__row" @click="router.push({ path: '/logs' })">
      <p>Logs</p>
      <p class="flex">
        <Badges :get-parsed-logs="getParsedLogs" />
      </p>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.info__row {
  @apply flex justify-between items-center text-accent-foreground/50 font-bold space-y-1 cursor-pointer;
}

.card__shadow {
  @apply bg-cardCustom-info p-2 shadow-lg;
}
</style>
