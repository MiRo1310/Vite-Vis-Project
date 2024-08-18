<script setup lang='ts'>
import { ref, watch } from 'vue';
const props = defineProps({
    windowOpen: {
        type: Boolean,
        required: false
    }
})

const isWindowOpen = ref(false)
const noValue = ref(false)

watch(() => props.windowOpen, (value) => {
    if (!value && value != false) {
        noValue.value = true
        return
    }
    noValue.value = false
    isWindowOpen.value = value
}, { immediate: true })

</script>
<template>
  <p
    v-if="noValue"
    class="text text-red-500 ml-3 animate-bounce"
  >
    No Value
  </p>
  <div v-else>
    <p
      v-show="isWindowOpen"
      class="text text-red-500"
    >
      Fenster ist offen
    </p>
    <p
      v-show="!isWindowOpen"
      class="text text-green-500"
    >
      Fenster ist geschlossen
    </p>
  </div>
</template>
