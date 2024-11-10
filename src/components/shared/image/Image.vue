<script lang="ts" setup>
import fallback from "@/assets/images/fall-back-img.png";
import { ref, Ref, watchEffect } from "vue";

interface ImageProps {
  src: string;
  alt: string;
  isLoading: boolean;
  useLightbox: boolean;
  fallbackImgClass: string;
  imgClass: string;
  class: string;
}

const props = withDefaults(defineProps<ImageProps>(), {
  useLightbox: false,
  fallbackImgClass: "",
  imgClass: "",
  class: ""
});
const showDialog = ref(false);
const shouldLoadFallBack = ref(false);
const imageLoadTimeout: Ref<null | NodeJS.Timeout> = ref(null);

const clickImageHandler = () => {
  props.useLightbox ? (showDialog.value = true) : null;
};
watchEffect(() => {
  if (!props.src) {
    shouldLoadFallBack.value = true;
    return;
  }
  shouldLoadFallBack.value = false;
});

const errorHandler = () => {
  if (props.isLoading) {
    shouldLoadFallBack.value = false;
    return;
  }

  imageLoadTimeout.value = setTimeout(() => {
    shouldLoadFallBack.value = true;
  }, 100);
};

const loadImage = () => {
  if (imageLoadTimeout.value) {
    clearTimeout(imageLoadTimeout.value);
  }
  shouldLoadFallBack.value = false;
};
</script>

<template>
  <div
    :class="{ image__container: true, 'cursor-pointer': useLightbox, [props.class]: true }"
    @click="clickImageHandler"
  >
    <img
      v-if="!shouldLoadFallBack"
      :alt="alt as string"
      :src="src as string"
      :class="[imgClass, 'image__main']"
      @error="errorHandler"
      @load="loadImage"
    >
    <img v-if="shouldLoadFallBack" alt="fallback_image" :src="fallback" :class="['image-fallback', fallbackImgClass]">
  </div>
</template>
<style scoped lang="postcss">
.image__container {
  @apply w-full h-full flex justify-center items-center;
}

.image__main {
  @apply w-auto h-auto max-w-full max-h-full;
}

.image-fallback {
  @apply cursor-default w-3/4 h-auto;
}
</style>
