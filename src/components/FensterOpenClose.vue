<script setup lang='ts'>
import { ref, watch } from 'vue';
const props = defineProps({
    windowOpen: {
        type: Boolean,
        required: true
    }
})

const isWindowOpen = ref(false)

watch(() => props.windowOpen, (value) => {
    if (!value) return
    isWindowOpen.value = value
})

</script>
<template>
  <p
    v-show="isWindowOpen"
    class="text-[0.6rem] mt-1 ml-3"
  >
    Fenster ist offen
  </p>
  <p
    v-show="!isWindowOpen"
    class="text-[0.6rem] mt-1 ml-3"
  >
    Fenster ist geschlossen
  </p>
</template>
