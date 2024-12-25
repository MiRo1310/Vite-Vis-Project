<script setup lang="ts">
import Badge from "@/components/shared/badge/Badge.vue";
import Badges from "@/components/section/home/Badges.vue";
import { ParsedLogs } from "@/store/iobrokerStore.ts";
import { Infos } from "@/subscribeIds/info.ts";

defineProps<{ info: Infos, getParsedLogs: ParsedLogs }>();
</script>
<template>
  <div class="card__shadow mb-2">
    <div class="info__row">
      <p>Updates</p>
      <p>
        <Badge :value="info.updatesNumber?.val" />
      </p>
    </div>
    <div class="info__row">
      <p> Logs</p>
      <p class="flex">
        <Badges :get-parsed-logs="getParsedLogs" />
      </p>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.info__row {
  @apply flex justify-between items-center text-accent-foreground/50 font-bold space-y-1
}

.card__shadow {
  @apply bg-white p-2 shadow-lg
}

</style>