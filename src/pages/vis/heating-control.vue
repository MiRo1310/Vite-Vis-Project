<script setup lang="ts">
import Page from "@/components/shared/page/Page.vue";
import HeatingControl from "@/components/section/heating/HeatingControl.vue";
import HeatingControlHeader from "@/components/section/heating/HeatingControlHeader.vue";
</script>

<template>
  <Page title="Heizungssteuerung">
    <template #header>
      <HeatingControlHeader class="max-[800px]:hidden" />
    </template>
    <template #default>
      <HeatingControlHeader class="min-[800px]:hidden mb-2" />
      <HeatingControl />
    </template>
  </Page>
</template>
