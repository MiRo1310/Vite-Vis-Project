<script setup lang="ts">
import Page from "@/components/shared/page/Page.vue";
import JsonEditor from "@/components/section/JSONEditor/JsonEditor.vue";
import { ref } from "vue";

const model = ref({
  name: "John Doe",
  age: 30,
  email: "Test",
});
</script>

<template>
  <Page title="Listen">
    <span class="text-white"> Coming soon </span>
    {{ model }}
    <JsonEditor v-model="model" />
  </Page>
</template>
