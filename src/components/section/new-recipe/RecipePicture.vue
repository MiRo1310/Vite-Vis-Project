<script setup lang="ts">
import DropBox from "@/components/shared/dropbox/DropBox.vue";
import { FileData } from "@/types/types";

const fileData = defineModel<FileData[]>("fileData", { default: [] });
const fileList = defineModel<FileList>("fileList", { default: [] });
</script>

<template>
  <div class="flex space-x-2 w-full mb-2">
    <DropBox
      v-model:file-data="fileData"
      v-model:file-list="fileList"
      label="Drag and drop your file here"
      class="inline-block w-1/2 bg-primary-brown-lightest/70"
    />
    <div>
      <img v-if="fileData[0]" :src="fileData[0].url" alt="recipePic" class="max-h-40 w-auto" />
    </div>
  </div>
</template>
<style lang="postcss">
.form input {
  background-color: white;
}

.form label span {
  font-size: 0.7rem;
}
</style>
