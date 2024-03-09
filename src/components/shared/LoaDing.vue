<script setup lang="ts">
import { ref } from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
    isLoading: {
        type: Boolean,
        default: true
    },
    color: {
        type: String,
        default: 'blue'
    }

})

const isLoading = ref(props.isLoading);

</script>
<template>
  <div
    v-show="isLoading"
    class="spinner"
  />
</template>



<style scoped>
.spinner {
    border: 3px solid #f3f3f3;
    border-top: 3px solid #3498db;
    border-left: 3px solid #3498db;
    border-radius: 50%;
    animation: spin 1.2s linear infinite;
    @apply absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-16 w-16
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>