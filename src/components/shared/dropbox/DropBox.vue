<script setup lang="ts">
import { HTMLAttributes, ref } from "vue";
import { Card } from "@/components/ui/card";
import { FileData } from "@/types/types";

const props = defineProps<{ label?: string; class?: HTMLAttributes["class"] }>();

const fileInput = ref<HTMLInputElement | null>(null);

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleDrop = (event: DragEvent): void => {
  const files = event.dataTransfer?.files;
  processFiles(files);
};

const handleFileChange = (event: Event): void => {
  const files = (event.target as HTMLInputElement).files;
  processFiles(files);
};

const processFiles = (files?: FileList | null) => {
  if (files && files.length > 0) {
    saveFileData(files);
    saveFiles(files);
  }
};

const saveFiles = (files: FileList) => (fileList.value = files);

const saveFileData = (files: FileList) => {
  Array.from(files).forEach((file) => {
    fileData.value.push({ name: file.name, url: URL.createObjectURL(file) });
  });
};

const fileData = defineModel<FileData[]>("fileData", { default: [] });
const fileList = defineModel<FileList>("fileList", { default: [] });
</script>

<template>
  <Card :class="[props.class, 'drop-zone__card']">
    <div :class="['drop-zone']" @drop.prevent="handleDrop" @dragover.prevent @click="triggerFileInput">
      <p>{{ label }}</p>
      <input ref="fileInput" type="file" hidden accept=".jpg, .png" @change="handleFileChange" />
    </div>
  </Card>
</template>

<style scoped lang="postcss">
.drop-zone__card {
  @apply h-40 inline-block;
}
.drop-zone {
  @apply flex items-center justify-center w-full h-full rounded-lg cursor-pointer;
}
</style>
