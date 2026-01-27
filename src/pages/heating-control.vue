<script setup lang="ts">
import Page from "@/components/shared/page/Page.vue";
import HeatingControl from "@/components/section/heating/HeatingControl.vue";
import HeatingControlHeader from "@/components/section/heating/HeatingControlHeader.vue";
</script>

<template>
  <Page title="Heizungs Steuerung">
    <template #header>
      <HeatingControlHeader />
    </template>
    <template #default>
      <HeatingControl />
    </template>
  </Page>
</template>
