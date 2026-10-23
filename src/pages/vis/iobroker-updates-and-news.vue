<script setup lang="ts">
import IobrokerUpdates from "@/components/section/iobroker/IobrokerUpdates.vue";
import IobrokerNews from "@/components/section/iobroker/IobrokerNews.vue";
import Page from "@/components/shared/page/Page.vue";
</script>

<template>
  <Page title="IoBroker">
    <div class="flex flex-wrap gap-2">
      <IobrokerUpdates />
      <IobrokerNews />
    </div>
  </Page>
</template>
