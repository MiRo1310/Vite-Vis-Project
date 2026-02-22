<script setup lang="ts">
import Page from "@/components/shared/page/Page.vue";
import JsonEditor from "@/components/section/JSONEditor/JsonEditor.vue";
import { ref } from "vue";
import { Mode } from "vanilla-jsoneditor";

const model = ref([1, 2, 3, true]);
</script>

<template>
  <Page title="Listen">
    <span class="text-white"> Coming soon </span>
    {{ model }}
    <JsonEditor v-model="model" :statusBar="false" :mode="Mode.text" :mainMenuBar="false" :navigationBar="false" :readOnly="false" />
  </Page>
</template>
